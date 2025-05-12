import { GeoJSONFeature } from "../../../utils/geojson/models";
import { GeometryDefinition } from "../../../utils/obc/models";

// <bim-viewer>
export interface BIMViewerData {
    geometryDefinitions: GeometryDefinition[];
}

// <map>
export interface MapData {
    features: GeoJSONFeature[],
    mapboxToken: string
}

// <table-simple>
export interface TableSimpleData {
  rows: { [key: string]: unknown }[];
  columns: {
    key: string;
    label: string;
  }[];
}