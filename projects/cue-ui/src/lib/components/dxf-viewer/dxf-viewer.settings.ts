import { Color } from "three";

export class DXFViewerSettings {
    fileURL?: string;
    fonts = ['fonts/HanaMinA.ttf', 'fonts/NanumGothic-Regular.ttf', 'fonts/NotoSansDisplay-SemiCondensedLightItalic.ttf', 'fonts/Roboto-LightItalic.ttf'];
    viewerOptions = new ViewerOptions();
    visibility = new VisibilitySettings();
}

export class VisibilitySettings{
    ui = new UIVisibilitySettings();
}

export class UIVisibilitySettings{
    enabled = true;
    toolbar = new UIToolbarVisibilitySettings();
    showLayerPanel = false;
}

export class UIToolbarVisibilitySettings{
    enabled = true;
    showVisibilitySection = true;
}

export class ViewerOptions {
    canvasWidth = 400;
    canvasHeight = 300;
    /** Automatically resize canvas when the container is resized. This options utilizes
     *  ResizeObserver API which is still not fully standardized. The specified canvas size is
     *  ignored if the option is enabled.
     */
    autoResize = false;
    /** Frame buffer clear color. */
    clearColor = new Color("black");
    /** Frame buffer clear color alpha value. */
    clearAlpha = 0; // 0 = transparent background
    /** Use alpha channel in a framebuffer. */
    canvasAlpha = false;
    /** Assume premultiplied alpha in a framebuffer. */
    canvasPremultipliedAlpha = true;
    /** Use antialiasing. May degrade performance on poor hardware. */
    antialias = true;
    /** Correct entities colors to ensure that they are always visible with the current background
     * color.
     */
    colorCorrection = false;
    /** Simpler version of colorCorrection - just invert pure white or black entities if they are
     * invisible on current background color.
     */
    blackWhiteInversion = true;
    /** Size in pixels for rasterized points (dot mark). */
    pointSize = 2;
    /** Scene generation options. */
    sceneOptions = new SceneOptions();
    /** Retain the simple object representing the parsed DXF - will consume a lot of additional
     * memory.
     */
    retainParsedDxf = false;
    /** Whether to preserve the buffers until manually cleared or overwritten. */
    preserveDrawingBuffer = false;
    /** Encoding to use for decoding DXF file text content. DXF files newer than DXF R2004 (AC1018)
     * use UTF-8 encoding. Older files use some code page which is specified in $DWGCODEPAGE header
     * variable. Currently parser is implemented in such a way that encoding must be specified
     * before the content is parsed so there is no chance to use this variable dynamically. This may
     * be a subject for future changes. The specified value should be suitable for passing as
     * `TextDecoder` constructor `label` parameter.
     */
    fileEncoding = "utf-8"
}

export class SceneOptions{
    /** Target angle for each segment of tessellated arc. */
    arcTessellationAngle = 10 / 180 * Math.PI;
    /** Divide arc to at least the specified number of segments. */
    minArcTessellationSubdivisions = 8;
    /** Render meshes (3DFACE group; POLYLINE polyface mesh) as wireframe instead of solid. */
    wireframeMesh = false;
    /** Suppress paper-space entities when true (only model-space is rendered). */
    suppressPaperSpace = false;
    /** Text rendering options. */
    textOptions = new TextRendererOptions();
}

export class TextRendererOptions{
    /** Number of segments for each curve in a glyph. Currently Three.js does not have more
     * adequate angle-based or length-based tessellation option.
     */
    curveSubdivision = 2;
    /** Character to use when the specified fonts does not contain necessary glyph. Several ones can
     * be specified, the first one available is used.
     */
    fallbackChar = "\uFFFD?";
}