import { bboxFromCoordinates } from './compare-tools';
import { GeoJSONFeature, GeoJSONFeatureCollection } from './models';

export function buildPointFeature(
  lngLat: number[],
  properties?: { [key: string]: any }
): GeoJSONFeature {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: lngLat,
    },
    properties,
  };
}

export async function buildFeatureCollection(
  features: GeoJSONFeature[],
  buildBBOX = true
): Promise<GeoJSONFeatureCollection> {
  const fc: GeoJSONFeatureCollection = {
    type: 'FeatureCollection',
    features: features,
  };
  if (buildBBOX) {
    const coordinates: any[] = [];
    features.forEach((f) => {
      if (f.geometry.coordinates !== undefined)
        coordinates.push(f.geometry.coordinates);
    });
    fc.bbox = await bboxFromCoordinates(coordinates);
  }
  return fc;
}

export function calculateBBOX(geojson: GeoJSONFeatureCollection) {
  // Initialize bounding box limits
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const features = geojson.features;

  // Iterate through each feature (point) in the collection
  for (const feature of features) {
    if (feature.geometry.type === 'Point') {
      const coordinatesRaw = feature.geometry.coordinates;
      if (coordinatesRaw === undefined) continue;
      const coordinates: any[] = Array.isArray(coordinatesRaw[0])
        ? coordinatesRaw : [coordinatesRaw];

      for (const c of coordinates) {
        // Update the bounding box limits
        minX = Math.min(minX, c[0]);
        minY = Math.min(minY, c[1]);
        maxX = Math.max(maxX, c[0]);
        maxY = Math.max(maxY, c[1]);
      }
    }
  }

  // Check if we found any valid points
  if (minX === Infinity) {
    return null; // No points found, return null
  }

  // Return the bounding box as an array [minX, minY, maxX, maxY]
  return [minX, minY, maxX, maxY];
}
