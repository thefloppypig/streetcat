import { FeederData, FolderMetaData, CatData } from "./Types";

const cache: Record<string, any> = {};

export async function fetchCachedJson<T>(url: string): Promise<T> {
    if (cache[url]) {
        return cache[url];
    }
    else {
        try {
            const response = await fetch(url);
            return cache[url] = await response.json();
        } catch (error) {
            console.error("fetch error", url, error);
            throw error;
        }
    }
}

export async function fetchFeederData(feeder: string) {
    const json = await fetchCachedJson<FeederData>(`${feeder}/index.json`);
    json.__feeder = feeder;
    return json;
}

export async function fetchCatList(feeder: string) {
    const json = await fetchMeta(feeder);
    return json.dir;
}

export async function fetchCatData(feeder: string, cat: string) {
    const json = await fetchCachedJson<CatData>(`${feeder}/${cat}/index.json`);
    json.__cat = cat;
    json.__feeder = feeder;
    return json;
}

export async function fetchMeta(path: string) {
    const json = await fetchCachedJson<FolderMetaData>(`${path}/meta.json`);
    return json;
}

export function getCatUrl(catData: CatData, img: string) {
    return `${catData.__feeder}/${catData.__cat}/${img}`
}