import { readFile } from "fs/promises";
import { feederRootPublic } from "../Const";
import { FeederData, FolderMetaData, CatData, FeederList, CatDataMap, MeowApiCatHouseSaved } from "../Types";

const cache: Record<string, any> = {};

function checkCatMapCached(feeder: string) {
    const url = `${feederRootPublic}/${feeder}/catList.json`;
    if (cache[url]) return cache[url] as CatDataMap;
}

export async function getCachedJson<T>(url: string): Promise<T> {
    if (cache[url]) {
        return cache[url];
    }
    else {
        try {
            const txt = await readFile(url, {
                encoding: "utf8",
            });
            return cache[url] = await JSON.parse(txt);
        } catch (error) {
            console.error("get error", url, error);
            throw error;
        }
    }
}

export async function getCachedTxt(url: string): Promise<string | undefined> {
    if (cache[url]) {
        return cache[url];
    }
    else {
        try {
            const txt = await readFile(url, {
                encoding: "utf8",
            });;
            if (txt.startsWith("<!")) {//throw `File not found: ${url}`
                return cache[url] = undefined;
            }
            return cache[url] = txt;
        } catch (error) {
            return cache[url] = undefined;
        }
    }
}

export async function getFeederData(feeder: string) {
    const json = await getCachedJson<FeederData>(`${feederRootPublic}/${feeder}/index.json`);
    json.__feeder = feeder;
    return json;
}

export async function getFeederList() {
    const json = await getCachedJson<FeederList>(`${feederRootPublic}/feederList.json`);
    return json;
}

export async function getCatList(feeder: string) {
    const json = await getMeta(`${feederRootPublic}/${feeder}`);
    return json.dir;
}

export async function getFeederCatMap(feeder: string) {
    const json = await getCachedJson<CatDataMap>(`${feederRootPublic}/${feeder}/catList.json`);
    for (const key in json) {
        const catData = json[key]
        if (catData) {
            catData.__feeder = feeder;
            catData.__cat = key;
        }
    }
    return json;
}

export async function getFeederCatList(feeder: string) {
    const json = await getFeederCatMap(feeder);
    const catDataList = [] as CatData[]
    for (const key in json) {
        catDataList.push(json[key]);
    }
    return catDataList;
}

export async function getCatData(feeder: string, cat: string) {
    const catMap = checkCatMapCached(feeder);
    if (catMap) {
        return catMap[cat];
    }
    const json = await getCachedJson<CatData>(`${feederRootPublic}/${feeder}/${cat}/index.json`);
    json.__cat = cat;
    json.__feeder = feeder;
    return json;
}

export async function getExtGalleryList(feeder: string, cat: string): Promise<string[]> {
    const text = await getCachedTxt(`${feederRootPublic}/${feeder}/${cat}/gallery.txt`);
    if (text) {
        return text.split("\n");
    }
    else return [];
}

export async function getMeta(path: string) {
    const json = await getCachedJson<FolderMetaData>(`${path}/meta.json`);
    return json;
}

export async function getFeederSavedApiData(feeder: string): Promise<MeowApiCatHouseSaved> {
    const data = await getCachedJson<MeowApiCatHouseSaved>(`${feederRootPublic}/${feeder}/apiData.json`);
    return data;
}