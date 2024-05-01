import * as fs from "fs";
import { PluginOption } from 'vite'
import { cmdRun, isPng } from "./processUtils";


async function processPngToWebp(dirPath: string, listDir: fs.Dirent[]) {
    try {
        const process = cmdRun("magick", ["mogrify", "-format webp", "-resize 50%", "*.png"], { cwd: dirPath, shell: true })
        await process;
        for (const dirent of listDir) {
            if (isPng(dirent)) {
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
    for (const dir of data.dir) {
        await processRecursive(`${dirPath}/${dir}`, options)
    }
}

async function processDirectoryData(dirPath: string, options: ProcessOptions) {
    let listDir = fs.readdirSync(dirPath, { withFileTypes: true });

    if (options.processWebp && listDir.some(dirent => isPng(dirent))) {
        await processPngToWebp(dirPath, listDir);
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
    async buildStart(options) {
        await startProcessRecursive("./public", {});
    },
}