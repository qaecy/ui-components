import { ZipInfo, unzip } from "unzipit";
import { GeometryDefinition } from "./models";
import { filterOutUnwantedElements } from "./tools";

export async function gdefDownloader(url: string, elementUUIDs: string[] = [], geometryIds: number[] = []): Promise<GeometryDefinition>{
    const res = await fetch(url);
    const blob = await res.blob();
    const zip: ZipInfo = await unzip(blob);
    const geometryDefinition = await zip.entries[
        'geometryDefinition.json'
    ].json();
    if (elementUUIDs?.length) {
        console.time('Filtered geometry definition');
        await filterOutUnwantedElements(geometryDefinition, elementUUIDs, geometryIds);
        console.timeEnd('Filtered geometry definition');
    }
    return geometryDefinition;
}