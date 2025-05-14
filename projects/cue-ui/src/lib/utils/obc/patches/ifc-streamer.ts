import {
  IfcStreamer,
  StreamedInstances,
  StreamLoaderSettings,
  StreamPropertiesSettings,
} from '@thatopen/components-front';
import * as OBC from '@thatopen/components';
import { FragmentsGroup } from '@thatopen/fragments';
import { IFCOPENINGELEMENT, IFCSPACE } from 'web-ifc';
import { GeometryDefinition } from '../models';

// Modifies the fetch function so it automatically appends a GCP token to the URL
export async function monkeyPatchIfcStreamer(
  streamer: IfcStreamer,
  urlAuthenticator = async (unauthenticatedURL: string): Promise<string> =>
    unauthenticatedURL
) {
  // MHRA: Change fetch to use urlAuthenticator
  streamer.fetch = async (fileName: string) => {
    const url = await urlAuthenticator(fileName);
    return fetch(url);
  };

  // MHRA: Change streamer to be able to skip spaces and openings
  streamer.load = async (
    settings: GeometryDefinition,
    coordinate: boolean,
    properties?: StreamPropertiesSettings
  ) => {
    // MHRA: Added ability to skip spaces and openings
    const { geometries, globalDataFileId, skipSpaces, skipOpenings, typeMap } =
      settings;
    let { assets } = settings;

    if (skipSpaces || skipOpenings) {
      assets = assets.filter((a) => {
        if (typeMap !== undefined) {
          const type = typeMap[a.id];
          if (skipSpaces && type === IFCSPACE) {
            a.geometries.forEach((g) => delete geometries[g.geometryID]);
            return false;
          }
          if (skipOpenings && type === IFCOPENINGELEMENT) {
            a.geometries.forEach((g) => delete geometries[g.geometryID]);
            return false;
          }
        }
        return true;
      });
    }

    const groupData = await streamer.fetch(globalDataFileId);
    const groupArrayBuffer = await groupData.arrayBuffer();
    const groupBuffer = new Uint8Array(groupArrayBuffer);
    const fragments = streamer.components.get(OBC.FragmentsManager);
    const group = fragments.load(groupBuffer, { coordinate, isStreamed: true });

    group.name = globalDataFileId.replace('-processed-global', '');

    streamer.world.scene.three.add(group);

    const { opaque, transparent } = group.geometryIDs;
    for (const [geometryID, key] of opaque) {
      const fragID = group.keyFragments.get(key);
      if (fragID === undefined) {
        throw new Error('Malformed fragments group!');
      }
      // @ts-expect-error accessing private method
      streamer.fragIDData.set(fragID, [group, geometryID, new Set()]);
    }
    for (const [geometryID, key] of transparent) {
      const fragID = group.keyFragments.get(key);
      if (fragID === undefined) {
        throw new Error('Malformed fragments group!');
      }
      // @ts-expect-error accessing private method
      streamer.fragIDData.set(fragID, [group, Math.abs(geometryID), new Set()]);
    }

    streamer.culler.add(group.uuid, assets, geometries);

    const assetsMap = new Map<number, OBC.StreamedAsset>();
    for (const asset of assets) {
      assetsMap.set(asset.id, asset);
    }

    const object = { assetsMap, geometries };
    Object.defineProperty(object, 'assets', {
      get: () => {
        return Array.from(object.assetsMap.values());
      },
    });

    streamer.models[group.uuid] = object as {
      assetsMap: Map<number, OBC.StreamedAsset>;
      geometries: OBC.StreamedGeometries;
      assets: OBC.StreamedAsset[];
    };

    const instances: StreamedInstances = new Map();

    for (const asset of assets) {
      const id = asset.id;
      for (const { transformation, geometryID, color } of asset.geometries) {
        if (!instances.has(geometryID)) {
          instances.set(geometryID, []);
        }
        const current = instances.get(geometryID);
        if (!current) {
          throw new Error('Malformed instances');
        }
        current.push({ id, transformation, color });
      }
    }

    // @ts-expect-error accessing private method
    streamer._geometryInstances[group.uuid] = instances;

    if (properties) {
      const ids = new Map<number, number>();
      const types = new Map<number, number[]>();

      for (const id in properties.ids) {
        const value = properties.ids[id];
        const idNum = parseInt(id, 10);
        ids.set(idNum, value);
      }

      for (const type in properties.types) {
        const value = properties.types[type];
        const idNum = parseInt(type, 10);
        types.set(idNum, value);
      }

      // TODO: Make this better when backend is ready
      const propertiesFileID = globalDataFileId.replace(
        '-global',
        '-properties'
      );

      FragmentsGroup.url = streamer.url;

      group.streamSettings = {
        baseFileName: propertiesFileID,
        ids,
        types,
      };

      const { indexesFile } = properties;
      const fetched = await streamer.fetch(indexesFile);
      const rels = await fetched.text();
      const indexer = streamer.components.get(OBC.IfcRelationsIndexer);
      indexer.setRelationMap(group, indexer.getRelationsMapFromJSON(rels));
    }

    streamer.culler.updateTransformations(group.uuid);
    streamer.culler.needsUpdate = true;

    return group;
  };

  // MHRA: Change loadFoundGeometries to be able to skip subset of geometry
  // @ts-expect-error accessing private method
  streamer.loadFoundGeometries = async (
    seen: {
      [modelID: string]: Map<number, Set<number>>;
    },
    visible = true
  ) => {
    streamer.cancel = false;

    const cancelled: { [modelID: string]: Set<number> } = {};
    for (const modelID in seen) {
      const idsOfModel = new Set<number>();
      for (const [, ids] of seen[modelID]) {
        for (const id of ids) {
          idsOfModel.add(id);
        }
      }
      cancelled[modelID] = idsOfModel;
    }

    for (const modelID in seen) {
      // @ts-expect-error accessing private method
      if (streamer._isDisposing) {
        return;
      }

      if (streamer.cancel) {
        // @ts-expect-error accessing private method
        streamer.cancelLoading(cancelled);
        return;
      }

      const fragments = streamer.components.get(OBC.FragmentsManager);
      const group = fragments.groups.get(modelID);
      if (!group) {
        // throw new Error("Fragment group not found!");
        // Might happen when disposing
        return;
      }

      const { geometries } = streamer.models[modelID];

      const files = new Map<string, number>();

      const allIDs = new Set<number>();

      for (const [priority, ids] of seen[modelID]) {
        for (const id of ids) {
          if (streamer.cancel) {
            // @ts-expect-error accessing private method
            streamer.cancelLoading(cancelled);
            return;
          }

          allIDs.add(id);
          const geometry = geometries[id];
          if (!geometry) {
            // MHRA Simply throw a warning
            console.warn("Geometry not found");
            // throw new Error('Geometry not found');
          }
          if (geometry.geometryFile) {
            const file = geometry.geometryFile;
            const value = files.get(file) || 0;
            // This adds up the pixels of all fragments in a file to determine its priority
            files.set(file, value + priority);
          }
        }
      }

      // Give more priority to the files that are already cached
      if (streamer.useCache) {
        const cachedPriority = 99999;
        const entries = files.entries();
        for (const [name, value] of entries) {
          if (streamer.fileDB.isCached(name)) {
            files.set(name, value + cachedPriority);
          }
        }
      }

      const sortedFiles = Array.from(files).sort((a, b) => b[1] - a[1]);
      const loadProcesses: Promise<void>[] = [];
      for (const [fileName] of sortedFiles) {
        // @ts-expect-error accessing private method
        const loadProcess = streamer.loadFragmentFile(
          modelID,
          group,
          visible,
          fileName,
          allIDs,
          cancelled
        );
        loadProcesses.push(loadProcess);
      }
      await Promise.all(loadProcesses);

      const expiredIDs = new Set<string>();
      const now = performance.now();
      // @ts-expect-error accessing private method
      for (const [id, { time }] of streamer._ramCache) {
        if (now - time > streamer.maxRamTime) {
          expiredIDs.add(id);
        }
      }

      for (const id of expiredIDs) {
        // @ts-expect-error accessing private method
        streamer._ramCache.delete(id);
      }

      // streamer._storageCache.close();
    }
  };
}
