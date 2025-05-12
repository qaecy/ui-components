export interface StreamedGeometries {
    [id: number]: {
        boundingBox: Float32Array;
        hasHoles: boolean;
        geometryFile?: string;
    };
}

export interface StreamedAsset {
    id: number;
    geometries: {
        geometryID: number;
        transformation: number[];
        color: number[];
    }[];
}

export class GeometryDefinition{
    assets: StreamedAsset[] = [];
    geometries: StreamedGeometries = {};
    idMap: IDMap = {};
    modelUUID = "";
    globalDataFileId = "";
    typeMap?: TypeMap;
    skipSpaces?: boolean;
    skipOpenings?: boolean;
}

export interface IDMap {
    [expressID: number]: string;
  }
  
  export interface TypeMap {
    [expressID: number]: number;
  }