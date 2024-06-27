import { execSync } from "child_process";

export function gitFetch() {
    try {
        const cmd = `git fetch --unshallow`;
        execSync(cmd, { encoding: 'utf8' });
    } catch (error) {
        console.log("No unshallow fetch needed")
    }
}