import { feederRootPublic } from "../src/Const.ts"
import { existsSync, mkdirSync, writeFileSync } from "fs"
import { saveApiData } from "./saveApiDataFunction.ts";

const feeder = process.argv[2]
const id = process.argv[3]

if (id && !isNaN(parseInt(id))) {
    if (feeder && /^[a-z\-]+$/.test(feeder)) {
        const feederPath = `${feederRootPublic}/${feeder}`;
        if (!existsSync(feederPath)) {
            mkdirSync(feederPath);
        }
        writeFileSync(`${feederPath}/index.json`, JSON.stringify({name: "", id, wiki: ""}, undefined, "    "));
        await saveApiData(feeder, id); 
    }
    else {
        console.log("invalid feeder name")
    }
}
else {
    console.log("invalid id")
}