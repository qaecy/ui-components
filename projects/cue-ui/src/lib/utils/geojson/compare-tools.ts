import { FeaturePairMatch, FeaturePairingResult, GeoJSONFeature, GeoJSONFeatureCollection, Geometry } from './models';

// Finds the closest matches between two feature collections with points
// If the feature collections describe a bbox this is taken into account by omitting points outside the intersecting bbox
// A threshold value in meters can be described. Perdefault, points more than 1 meter apart are not considered as matches
export async function findClosestFeaturePair(
  collectionA: GeoJSONFeatureCollection,
  collectionB: GeoJSONFeatureCollection,
  threshold = 1
): Promise<FeaturePairingResult> {
  return new Promise((resolve) => {
    const successful: FeaturePairMatch[] = [];
    const unsuccesful: GeoJSONFeature[] = [];

    let intersection = null;
    if (collectionA.bbox !== undefined && collectionB.bbox !== undefined) {
      intersection = bboxIntersection([collectionA.bbox, collectionB.bbox]);
    }

    const featuresA = getPointsInFeatureCollection(
      collectionA,
      intersection,
      threshold
    );
    const featuresB = getPointsInFeatureCollection(
      collectionB,
      intersection,
      threshold
    );

    for (const featureA of featuresA) {
      let closestPoint = null;
      let minDistance = Infinity;
      const pointA: any = featureA.geometry.coordinates;

      for (const featureB of featuresB) {
        const pointB: any = featureB.geometry.coordinates;
        const distance = distanceBetweenPoints(pointA, pointB);
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = featureB;
        }
      }

      if(minDistance <= threshold && closestPoint){

        // Build a feature for the connection
        const connection: GeoJSONFeature = {
          type: 'Feature',
          geometry: {
            type: "LineString",
            coordinates: [pointA, closestPoint.geometry.coordinates]
          },
          properties: {
            distance: minDistance,
            connectingPoint: featureA.properties,
            connectedPoint: closestPoint.properties
          }
        }

        successful.push({
          featureA,
          featureB: closestPoint,
          distance: minDistance,
          connection
        });
      }else{
        unsuccesful.push(featureA);
      }
    }

    resolve({successful, unsuccesful, threshold});
  });
}

export function bboxIntersection(bboxes: number[][]): number[] | null {
  // Check for empty list
  if (!bboxes.length) return null;

  // Initialize minimum and maximum longitude and latitude
  let minX = -Infinity,
    minY = -Infinity,
    maxX = Infinity,
    maxY = Infinity;

  // Iterate through each bounding box and update min/max values
  for (const bbox of bboxes) {
    minX = Math.max(minX, bbox[0]); // Minimum longitude
    minY = Math.max(minY, bbox[1]); // Minimum latitude
    maxX = Math.min(maxX, bbox[2]); // Maximum longitude
    maxY = Math.min(maxY, bbox[3]); // Maximum latitude
  }

  // Check if there is no intersection
  if (minX > maxX || minY > maxY) {
    return null;
  }

  return [minX, minY, maxX, maxY];
}

// Returns true if the point is within the box
// Accepts a threshold which is provided in meters
export function isPointInBbox(
  coordinates: number[],
  bbox: number[],
  threshold = 1
): boolean {
  // Destructure point and bbox coordinates
  const [longitude, latitude] = coordinates;
  const [xmin, ymin, xmax, ymax] = bbox;

  // Calculate buffer extents with threshold
  const bufferXmin =
    xmin - threshold / (111132 * Math.cos(Math.PI * (ymin / 180))); // Consider earth curvature for longitude
  const bufferYmin = ymin - threshold / 111132;
  const bufferXmax =
    xmax + threshold / (111132 * Math.cos(Math.PI * (ymin / 180)));
  const bufferYmax = ymax + threshold / 111132;

  // Check if point coordinates are within bbox or buffer extents
  return (
    longitude >= bufferXmin &&
    longitude <= bufferXmax &&
    latitude >= bufferYmin &&
    latitude <= bufferYmax
  );
}

// Takes a list of lonLat coordinates and returns the smallest box that contains all
export async function bboxFromCoordinates(
  coordinates: number[][]
): Promise<number[]> {
  return new Promise((resolve) => {
    // Initialize minimum and maximum longitude and latitude
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    // Iterate through each coordinate and update min/max values
    for (const coord of coordinates) {
      minX = Math.min(minX, coord[0]);
      minY = Math.min(minY, coord[1]);
      maxX = Math.max(maxX, coord[0]);
      maxY = Math.max(maxY, coord[1]);
    }

    resolve([minX, minY, maxX, maxY]);
  });
}

// Calculates the distance between two WGS84 coordinates in meters
export function distanceBetweenPoints(coordA: number[], coordB: number[]): number {
  const [lonA, latA] = coordA;
  const [lonB, latB] = coordB;
  const R = 6371e3; // Earth's radius in meters

  const latRadA = degreesToRadians(latA);
  const latRadB = degreesToRadians(latB);
  const dLat = degreesToRadians(latB - latA);
  const dLon = degreesToRadians(lonB - lonA);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(latRadA) * Math.cos(latRadB) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Extracts all points in a feature collection
// Optionally can omit points outside a bbox by taking a threshold in meters into account
export function getPointsInFeatureCollection(
  collection: GeoJSONFeatureCollection,
  bboxLimit: number[] | null = null,
  threshold = 0
): GeoJSONFeature<Geometry>[] {
  const points = collection.features
    .filter((f) => f.geometry.type.toLowerCase() === 'point')
    .filter((f) => f.geometry.coordinates !== undefined)
    .filter((f) =>
      bboxLimit ? isPointInBbox(f.geometry.coordinates as number[], bboxLimit, threshold) : true
    );
  if (points === undefined) return [];
  return points;
}

// Filter features to BBOX
// Removes features from the feature collection that are outside the provided BBOX
// Currently only supports points
export function filterFeatureCollectionFromBBOX(
  collection: GeoJSONFeatureCollection,
  bboxLimit: number[] | null = null,
  threshold = 0
): GeoJSONFeatureCollection {
  collection.features =
    collection.features
      .filter((f) => f.geometry.type.toLowerCase() === 'point')
      .filter((f) => f.geometry.coordinates !== undefined)
      .filter((f) =>
        bboxLimit
          ? isPointInBbox(
              f.geometry.coordinates as number[],
              bboxLimit,
              threshold
            )
          : true
      ) ?? [];
  return collection;
}

function degreesToRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}