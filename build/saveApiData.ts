import { writeFile } from "fs/promises";
import { fetchFeederMeowCameraApi } from "../src/utils/fetchUtils"
import { getFeederData } from "../src/utils/readFiles";
import { feederRootPublic } from "../src/Const";
import { MeowApiCatHouseSaved } from "../src/Types";
import { pathToFilename } from "../src/utils/dataUtils";
import { existsSync, mkdirSync } from "fs";

const feeder = process.argv[2]
const { id } = await getFeederData(feeder);

if (id) {
    const data = await fetchFeederMeowCameraApi(id);
    const outputPath = `${feederRootPublic}/${feeder}/.about`
    const { name: chineseName, translatedName, images, hasSnacks } = data;
    
    if (!existsSync(outputPath)) {
        mkdirSync(outputPath, {recursive: true});
    }

    const filenames: string[] = []
    for (const url of images) {
        const response = await fetch(url);
        const buffer = Buffer.from(await response.arrayBuffer());
        const filename = pathToFilename(url);
        await writeFile(`${outputPath}/${filename}`, buffer);
        filenames.push(filename);
    }
    const saveApi: MeowApiCatHouseSaved = { chineseName, translatedName, hasSnacks, images: filenames };
    writeFile(`${outputPath}/apiData.json`, JSON.stringify(saveApi, undefined, "    "));
}
else {
    console.log("No feeder given")
}