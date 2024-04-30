import { SpawnOptionsWithoutStdio, spawn } from "child_process";
import * as fs from "fs";
import { PluginOption, defineConfig } from 'vite'

function cmdRun(cmd: string, args?: string[], options?: SpawnOptionsWithoutStdio) {
    return new Promise<void>((res, rej) => {
        const child = spawn(cmd, args, options)
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child.stderr.setEncoding('utf8');
        child.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        child.on("exit", () => res());
        child.on("error", (err) => rej(err));
    })
}

function isPng(dirent: fs.Dirent) {
    return dirent.name.endsWith(".png");
}

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