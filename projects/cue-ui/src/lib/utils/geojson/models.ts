export interface GeoJSONFeature<G extends Geometry = Geometry> {
  type: 'Feature';
  geometry: G;
  properties?: { [key: string]: any };
  bbox?: number[]; // Optional bounding box
  id?: string | number; // Optional identifier
}

export class GeoJSONFeatureCollection{
    type = 'FeatureCollection';
    id?: string | number; // Optional identifier
    bbox?: number[]; // Optional bounding box
    properties?: { [key: string]: any };
    features: GeoJSONFeature[] = [];
}

export interface Geometry {
  type: string; // Type of geometry (Point, LineString, Polygon, etc.)
  coordinates?: number[]|number[][];
}

export interface FeaturePairMatch{
  featureA: GeoJSONFeature;
  featureB: GeoJSONFeature;
  distance: number;
  connection: GeoJSONFeature;
}

export interface FeaturePairingResult{
  successful: FeaturePairMatch[];
  unsuccesful: GeoJSONFeature[];
  threshold: number;
}