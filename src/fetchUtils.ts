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

export async function fetchCachedTxt(url: string): Promise<string | undefined> {
    if (cache[url]) {
        return cache[url];
    }
    else {
        try {
            const response = await fetch(url);
            const txt = await response.text();
            if (txt.startsWith("<!")) {//throw `File not found: ${url}`
                return cache[url] = undefined;
            }
            return cache[url] = txt;
        } catch (error) {
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

export async function fetchExtGalleryList(feeder: string, cat: string): Promise<string[]> {
    const text = await fetchCachedTxt(`${feeder}/${cat}/gallery.txt`);
    if (text) {
        return text.split("\n");
    }
    else return [];
}

export async function fetchMeta(path: string) {
    const json = await fetchCachedJson<FolderMetaData>(`${path}/meta.json`);
    return json;
}

export function getCatUrl(catData: CatData, img: string) {
    return `${catData.__feeder}/${catData.__cat}/${img}`
}