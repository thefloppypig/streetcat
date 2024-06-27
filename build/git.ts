import { execSync } from "child_process";

export function gitFetch() {
    const cmd = `git fetch --unshallow`;
    execSync(cmd, { encoding: 'utf8' });
}