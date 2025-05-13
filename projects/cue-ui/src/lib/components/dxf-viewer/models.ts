export interface Layer{
    name: string;
    displayName: string;
    color: string;
    checked: boolean;
    toggleCheck: () => void;
}

export interface DrawingClickEvent{
    canvasCoord: Coordinate;        // Coordinate on the canvas
    position: Coordinate;           // Coordinate on the DXF
    absolutePosition: Coordinate;   // Coordinate on the DXF taking origin into account
    origin: Coordinate;             // Origin of the DXF
    domEvent: PointerEvent;
}

export interface Coordinate{
    x: number;
    y: number;
}

export class AnnotationMarkerDef{
    coordinate = {x: 0, y: 0};
}

export interface ToolbarSection{
    label: string;
    items: ToolbarGroupItem[];
}

export class ToolbarGroupItem{
    subItems?: ToolbarGroupItem[];
    active = false;
    io = false; // Of type on/off?
    constructor(
        public text: string,
        public icon: string,
        public callback: () => void
    ){}
}