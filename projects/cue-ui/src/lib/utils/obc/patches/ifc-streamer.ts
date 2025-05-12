import { IfcStreamer, StreamedInstance, StreamedInstances, StreamPropertiesSettings } from '@thatopen/components-front';
import { FragmentsManager, IfcRelationsIndexer } from '@thatopen/components';
import { IFCOPENINGELEMENT, IFCSPACE } from 'web-ifc';
import { Fragment } from '@thatopen/fragments';
import { BufferAttribute, BufferGeometry } from 'three';
import { GeometryDefinition } from '../models';

// Modifies the fetch function so it automatically appends a GCP token to the URL
export async function monkeyPatchIfcStreamer(
  streamer: IfcStreamer,
  urlAuthenticator = async (unauthenticatedURL: string): Promise<string> => unauthenticatedURL
) {

  // MHRA: Change fetch to use urlAuthenticator
  streamer.fetch = async(
    url: string,
    
  ) => {
      url = url.split("to-be-removed")[1];
      url = await urlAuthenticator(url);
      return fetch(url);
  }

  // MHRA: Change streamer to be able to skip spaces and openings
  streamer.load = async function(
    this: IfcStreamer,
    settings: GeometryDefinition,
    coordinate: boolean,
    properties?: StreamPropertiesSettings
  ){
    // MHRA: Added ability to skip spaces and openings
    const { geometries, globalDataFileId, skipSpaces, skipOpenings, typeMap } = settings;
    let { assets } = settings;

    if(skipSpaces || skipOpenings){
      assets = assets.filter((a) => {
        if (typeMap !== undefined){
          const type = typeMap[a.id];
          if(skipSpaces && type === IFCSPACE){
            a.geometries.forEach(g => delete geometries[g.geometryID]);
            return false;
          }
          if(skipOpenings && type === IFCOPENINGELEMENT){
            a.geometries.forEach(g => delete geometries[g.geometryID]);
            return false;
          }
        }
        return true;
      });
    }

    const groupUrl = this.url + globalDataFileId;
    const groupData = await this.fetch(groupUrl);
    const groupArrayBuffer = await groupData.arrayBuffer();
    const groupBuffer = new Uint8Array(groupArrayBuffer);
    const fragments = this.components.get(FragmentsManager);
    const group = fragments.load(groupBuffer, { coordinate, isStreamed: true });

    group.name = globalDataFileId.replace('-processed-global', '');

    this.world.scene.three.add(group);

    const { opaque, transparent } = group.geometryIDs;
    for (const [geometryID, key] of opaque) {
      const fragID = group.keyFragments.get(key);
      if (fragID === undefined) {
        throw new Error('Malformed fragments group!');
      }
      // @ts-expect-error accessing private method
      this.fragIDData.set(fragID, [group, geometryID, new Set()]);
    }
    for (const [geometryID, key] of transparent) {
      const fragID = group.keyFragments.get(key);
      if (fragID === undefined) {
        throw new Error('Malformed fragments group!');
      }
      // @ts-expect-error accessing private method
      this.fragIDData.set(fragID, [group, Math.abs(geometryID), new Set()]);
    }

    this.culler.add(group.uuid, assets, geometries);
    this.models[group.uuid] = { assets, geometries };
    const instances: StreamedInstances = new Map();

    for (const asset of assets) {
      const id = asset.id;
      if(skipSpaces && typeMap !== undefined && typeMap[id] === IFCSPACE) continue;
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
    this._geometryInstances[group.uuid] = instances;

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

      group.streamSettings = {
        baseUrl: this.url,
        baseFileName: propertiesFileID,
        ids,
        types,
      };

      const { indexesFile } = properties;
      const indexURL = this.url + indexesFile;
      const fetched = await this.fetch(indexURL);
      const rels = await fetched.text();
      const indexer = this.components.get(IfcRelationsIndexer);
      indexer.setRelationMap(group, indexer.getRelationsMapFromJSON(rels));
    }

    this.culler.updateTransformations(group.uuid);
    this.culler.needsUpdate = true;

    return group;
  };

  // MHRA: Change loadFoundGeometries to be able to skip subset of geometry
  // @ts-expect-error accessing private method
  streamer.loadFoundGeometries = async function(
    this: IfcStreamer,
    seen: {
      [modelID: string]: Map<number, Set<number>>;
    },
    visible = true,
  ){
    for (const modelID in seen) {
      // @ts-expect-error accessing private method
      if (this._isDisposing) return;

      const fragments = this.components.get(FragmentsManager);
      const group = fragments.groups.get(modelID);
      if (!group) {
        // throw new Error("Fragment group not found!");
        // Might happen when disposing
        return;
      }

      const { geometries } = this.models[modelID];

      const files = new Map<string, number>();

      const allIDs = new Set<number>();

      for (const [priority, ids] of seen[modelID]) {
        for (const id of ids) {
          allIDs.add(id);
          const geometry = geometries[id];
          if (!geometry) {
            // MHRA Simply throw a warning
            console.warn("Geometry not found");
            allIDs.delete(id);
            continue;
            // throw new Error("Geometry not found");
          }
          if (geometry.geometryFile) {
            const file = geometry.geometryFile;
            const value = files.get(file) || 0;
            files.set(file, value + priority);
          }
        }
      }

      const sortedFiles = Array.from(files).sort((a, b) => b[1] - a[1]);

      for (const [file] of sortedFiles) {
        const url = this.url + file;

        // If this file is still in the ram, get it

        // @ts-expect-error accessing private method
        if (!this._ramCache.has(url)) {
          let bytes = new Uint8Array();

          // If this file is in the local cache, get it
          if (this.useCache) {
            // Add or update this file to clean it up from indexedDB automatically later
            this.dbCleaner.update(url);

            // @ts-expect-error accessing private method
            const found = await this._fileCache.files.get(url);

            if (found) {
              bytes = found.file;
            } else {
              const fetched = await this.fetch(url);
              const buffer = await fetched.arrayBuffer();
              bytes = new Uint8Array(buffer);
              // await this._fileCache.files.delete(url);
              // @ts-expect-error accessing private method
              this._fileCache.files.add({ file: bytes, id: url });
            }
          } else {
            const fetched = await this.fetch(url);
            const buffer = await fetched.arrayBuffer();
            bytes = new Uint8Array(buffer);
          }

          const data = this.serializer.import(bytes);
          // @ts-expect-error accessing private method
          this._ramCache.set(url, { data, time: performance.now() });
        }

        // @ts-expect-error accessing private method
        const result = this._ramCache.get(url);
        if (!result) {
          continue;
        }

        result.time = performance.now();

        const loaded: Fragment[] = [];

        if (result) {
          for (const [geometryID, { position, index, normal }] of result.data) {
            // @ts-expect-error accessing private method
            if (this._isDisposing) return;

            if (!allIDs.has(geometryID)) continue;

            if (
              // @ts-expect-error accessing private method
              !this._geometryInstances[modelID] ||
              // @ts-expect-error accessing private method
              !this._geometryInstances[modelID].has(geometryID)
            ) {
              continue;
            }

            // @ts-expect-error accessing private method
            const geoms = this._geometryInstances[modelID];
            const instances = geoms.get(geometryID);

            if (!instances) {
              throw new Error("Instances not found!");
            }

            const geom = new BufferGeometry();

            const posAttr = new BufferAttribute(position, 3);
            const norAttr = new BufferAttribute(normal, 3);

            geom.setAttribute("position", posAttr);
            geom.setAttribute("normal", norAttr);

            geom.setIndex(Array.from(index));

            // Separating opaque and transparent items is neccesary for Three.js

            const transp: StreamedInstance[] = [];
            const opaque: StreamedInstance[] = [];
            for (const instance of instances) {
              if (instance.color[3] === 1) {
                opaque.push(instance);
              } else {
                transp.push(instance);
              }
            }

            // @ts-expect-error accessing private method
            this.newFragment(
              group,
              geometryID,
              geom,
              transp,
              true,
              loaded,
              visible,
            );

            // @ts-expect-error accessing private method
            this.newFragment(
              group,
              geometryID,
              geom,
              opaque,
              false,
              loaded,
              visible,
            );
          }
        }

        // @ts-expect-error accessing private method
        if (loaded.length && !this._isDisposing) {
          this.onFragmentsLoaded.trigger(loaded);
        }
      }

      const expiredIDs = new Set<string>();
      const now = performance.now();
      // @ts-expect-error accessing private method
      for (const [id, { time }] of this._ramCache) {
        if (now - time > this.maxRamTime) {
          expiredIDs.add(id);
        }
      }

      for (const id of expiredIDs) {
        // @ts-expect-error accessing private method
        this._ramCache.delete(id);
      }

      // this._storageCache.close();
    }
  }
}
