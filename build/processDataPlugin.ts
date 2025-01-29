import * as fs from "fs";
import { PluginOption } from 'vite'
import { cmdRun, isImage } from "./processUtils";


async function processImageToWebp(dirPath: string, listDir: fs.Dirent[]) {
    try {
        const process = cmdRun("magick", ["mogrify", "-format webp", "*.png"], { cwd: dirPath, shell: true })
        await process;
        const process2 = cmdRun("magick", ["mogrify", "-format webp", "*.jpg"], { cwd: dirPath, shell: true })
        await process2;
        for (const dirent of listDir) {
            if (isImage(dirent)) {
                fs.rmSync(`${dirPath}/${dirent.name}`);
                console.log(`Removing ${dirPath}/${dirent.name}`);
            };
        }
    } catch (error) {
        console.log(error);
    }
}

async function processRecursive(dirPath: string, options: ProcessOptions) {
    const data = await processDirectoryData(dirPath, options);
    if (data) {
        for (const dir of data.dir) {
            await processRecursive(`${dirPath}/${dir}`, options)
        }
    }
}

async function processDirectoryData(dirPath: string, options: ProcessOptions) {
    let listDir = fs.readdirSync(dirPath, { withFileTypes: true });
    if (listDir.length === 0) {
        fs.rmdirSync(dirPath);
        return;
    }
    if (listDir.length === 1 && listDir[0].name === "meta.json") {
        fs.rmSync(`${dirPath}/meta.json`);
        fs.rmdirSync(dirPath);
        return;
    }

    if (options.processWebp && listDir.some(dirent => isImage(dirent))) {
        await processImageToWebp(dirPath, listDir);
        listDir = fs.readdirSync(dirPath, { withFileTypes: true });
    }

    const jsonData = {
        dir: listDir.filter((d) => d.isDirectory()).map((d) => d.name),
        files: listDir.filter((d) => !d.isDirectory()).map((d) => d.name),
    }
    fs.writeFileSync(`${dirPath}/meta.json`, JSON.stringify(jsonData));
    return jsonData;
}

export async function startProcessRecursive(dirPath: string, options: Partial<ProcessOptions>) {
    const allOptions = { ...defaultProcessOptions, ...options };
    return await processRecursive(dirPath, allOptions);
}

export const defaultProcessOptions = {
    processWebp: false
}
export type ProcessOptions = typeof defaultProcessOptions;

export const streetcatLoader: PluginOption = {
    name: "streetcatLoader",
    async buildStart(_) {
        await startProcessRecursive("./public", {});
    },
}