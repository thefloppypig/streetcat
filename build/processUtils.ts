import { SpawnOptionsWithoutStdio, spawn } from "child_process";
import * as fs from "fs";

export function cmdRun(cmd: string, args?: string[], options?: SpawnOptionsWithoutStdio) {
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

export function isPng(dirent: fs.Dirent) {
    return dirent.name.endsWith(".png");
}