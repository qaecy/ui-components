import { StreamedAsset, StreamedGeometries } from '@thatopen/components';
import { GeometryDefinition } from './models';

// Takes a geometry definition and filters out those elements that are not needed
export async function filterOutUnwantedElements(
  geometryDefinition: GeometryDefinition,
  elementUUIDs: string[],
  geometryIds: number[]
): Promise<void> {
  return new Promise((resolve) => {
    const filteredAssets: StreamedAsset[] = [];
    const filteredGeometries: StreamedGeometries = {};
    Object.keys(geometryDefinition.idMap).forEach((expressID) => {
      const elementUUID = geometryDefinition.idMap[parseInt(expressID)];
      if (!elementUUIDs.includes(elementUUID)) {
        delete geometryDefinition.idMap[parseInt(expressID)];
        if (geometryDefinition.typeMap !== undefined)
          delete geometryDefinition.typeMap[parseInt(expressID)];
      } else {
        const asset = geometryDefinition.assets.find(
          (asset) => asset.id === parseInt(expressID)
        );
        if (asset !== undefined) {
          filteredAssets.push(asset);
          asset.geometries.forEach((g) => {
            if (!geometryIds.length) {
              filteredGeometries[g.geometryID] =
                geometryDefinition.geometries[g.geometryID];
            } else {
              if (geometryIds.includes(g.geometryID)) {
                filteredGeometries[g.geometryID] =
                  geometryDefinition.geometries[g.geometryID];
              }
            }
          });
        }
      }
    });
    geometryDefinition.geometries = filteredGeometries;
    geometryDefinition.assets = filteredAssets;
    resolve();
  });
}
