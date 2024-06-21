import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { CatData, CatDataMap, FeederData } from "../src/Types"
import { PluginOption } from "vite";
import { feederRootPublic } from "../src/Const"
import { computeHash } from "./utils/hash";
import { getHashData } from "../src/utils/readFiles.js";
import moment from "moment";

async function processFeederList() {
    const listDir = readdirSync(feederRootPublic, { withFileTypes: true });

    const feederIndexMap: FeederData[] = [];

    for (const feeder of listDir) {
        const feederPath = `${feederRootPublic}/${feeder.name}`
        if (feeder.name.startsWith(".")) continue;
        if (feeder.isDirectory()) {
            try {
                const index = readFileSync(`${feederPath}/index.json`, "utf8");
                const json = JSON.parse(index) as FeederData;
                json.__feeder = feeder.name;
                feederIndexMap.push(json);
                processCatList(feeder.name);

                const hash = await computeHash(feederPath);
                let oldHash = undefined;
                try {
                    oldHash = (await getHashData(feeder.name)).hash;
                } catch (error) {
                }
                if (hash !== oldHash) {
                    const dateNow = moment().format("MMMM Do, YYYY");
                    writeFileSync(`${feederPath}/.hash.json`, JSON.stringify({hash: hash, date: dateNow}));
                }
            } catch (error) {
                console.log(`${feeder.name} has no index.json`)
            }
        }
    }

    writeFileSync(`${feederRootPublic}/feederList.json`, JSON.stringify(feederIndexMap, undefined, "    "));
}

function processCatList(feeder: string) {
    const feederPath = `${feederRootPublic}/${feeder}`;
    const listFeeder = readdirSync(feederPath, { withFileTypes: true });
    const catList = {} as CatDataMap;

    for (const catDir of listFeeder) {
        if (catDir.name.startsWith(".")) continue;
        if (catDir.isDirectory()) {
            const catPath = `${feederPath}/${catDir.name}`
            try {
                const index = readFileSync(`${catPath}/index.json`, "utf8");
                const json = JSON.parse(index) as CatData;
                catList[catDir.name] = json;
            } catch (error) {
                console.log(`${catPath} ${error}`);
            }
        }
    }

    writeFileSync(`${feederPath}/catList.json`, JSON.stringify(catList, undefined, "    "));
}

export const processFeederPlugin: PluginOption = {
    name: "processFeederList",
    async buildStart(_) {
        processFeederList();
    },
}