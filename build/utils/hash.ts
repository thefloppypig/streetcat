
import fsp from "fs/promises";
import { Hash, createHash } from "crypto";
import path from 'path';

export async function computeHash(folder: string, inputHash: Hash | null | undefined = null) {
    const hash = inputHash ? inputHash : createHash("md5");
    const info = await fsp.readdir(folder, { withFileTypes: true });
    for (let item of info) {
        const fullPath = path.join(folder, item.name);
        if (item.isFile()) {
            if (item.name.startsWith(".")) continue;
            const contents = await fsp.readFile(fullPath);
            hash.update(contents);
        } else if (item.isDirectory()) {
            // recursively walk sub-folders
            await computeHash(fullPath, hash);
        }
    }
    // if not being called recursively, get the digest and return it as the hash result
    if (!inputHash) {
        return hash.digest("hex");
    }
}