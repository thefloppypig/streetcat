import { startProcessRecursive } from "./processDataPlugin"

console.log("finding pngs")
await startProcessRecursive("./public", {processWebp: true});
console.log("done");
