import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { CatData, FeederData } from "../src/shared/Types"
import { PluginOption } from "vite";
import { feederRootPublic } from "../src/shared/Const"

function processFeederList() {
    const listDir = readdirSync(feederRootPublic, { withFileTypes: true });

    const feederIndexMap: FeederData[] = [];

    for (const feeder of listDir) {
        if (feeder.isDirectory()) {
            try {

                const index = readFileSync(`${feederRootPublic}/${feeder}/index.json`, "utf8");
                const json = JSON.parse(index) as FeederData;
                json.__feeder = feeder.name;
                feederIndexMap.push(json);
                processCatList(feeder.name);
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
    const catList = [] as CatData[];

    for (const catDir of listFeeder) {
        if (catDir.isDirectory()) {
            try {
                const catPath = `${feederRootPublic}/${catDir.name}`
                const index = readFileSync(`${catPath}/index.json`, "utf8");
                const json = JSON.parse(index) as CatData;
                json.__feeder = feeder;
                json.__cat = catDir.name;
                catList.push(json);
            } catch (error) {
                console.log(`${catDir.name} has no index.json`);
            }
        }
    }

    writeFileSync(`${feederPath}/catList.json`, JSON.stringify(catList, undefined, "    "));
}

export const processFeederPlugin: PluginOption = {
    name: "processFeederList",
    async buildStart(options) {
        processFeederList();
    },
}