import { FeederData, FolderMetaData, CatData } from "./Types";

const cache: Record<string, any> = {};

export async function fetchCachedJson<T>(url: string): Promise<T> {
    if (cache[url]) {
        return cache[url];
    }
    else {
        const response = await fetch(url);
        return cache[url] = await response.json();
    }
}

export async function getFeederData(feeder: string) {
    const json = await fetchCachedJson<FeederData>(`${feeder}/index.json`);
    json.__feeder = feeder;
    return json;
}

export async function getCatList(feeder: string) {
    const json = await fetchCachedJson<FolderMetaData>(`${feeder}/meta.json`);
    return json.dir;
}

export async function getCatData(feeder: string, cat: string) {
    const json = await fetchCachedJson<CatData>(`${feeder}/${cat}/index.json`);
    json.__cat = cat;
    json.__feeder = feeder;
    return json;
}

export async function getMeta(path: string) {
    const json = await fetchCachedJson<FolderMetaData>(`${path}/meta.json`);
    return json;
}

export function getCatUrl(catData: CatData, img: string) {
    return `${catData.__feeder}/${catData.__cat}/${img}`
}