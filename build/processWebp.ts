import { startProcessRecursive } from "./processDataPlugin"

console.log("finding pngs")
await startProcessRecursive("./public/feeders", { processWebp: true });
console.log("done");
