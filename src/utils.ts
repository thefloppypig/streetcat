import { FeederData, FolderMetaData, CatData } from "./Types";

export async function fetchCached(url: string) {
    return await fetch(url, { cache: "force-cache" });
}

export async function getFeederData(feeder: string) {
    const response = await fetchCached(`${feeder}/index.json`);
    const json = await response.json() as FeederData;
    json.__feeder = feeder;
    return json;
}

export async function getCatList(feeder: string) {
    const response = await fetchCached(`${feeder}/meta.json`);
    const json = await response.json() as FolderMetaData;
    return json.dir;
}

export async function getCatData(feeder: string, cat: string) {
    const response = await fetchCached(`${feeder}/${cat}/index.json`);
    const json = await response.json() as CatData;
    json.__cat = cat;
    json.__feeder = feeder;
    return json;
}

export async function getMeta(path: string) {
    const response = await fetchCached(`${path}/meta.json`);
    const json = await response.json() as FolderMetaData;
    return json;
}

export function getCatUrl(catData: CatData, img: string) {
    return `${catData.__feeder}/${catData.__cat}/${img}`
}