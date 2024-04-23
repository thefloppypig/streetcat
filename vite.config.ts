import { PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from "fs/promises";

async function processRecursive(dirPath: string) {
  const data = await processDirectoryData(dirPath);
  for (const dir of data.dir) {
    processRecursive(`${dirPath}/${dir}`)
  }
}

async function processDirectoryData(dirPath: string) {
  const listDir = await fs.readdir(dirPath, { withFileTypes: true });
  const jsonData = {
    dir: listDir.filter((d) => d.isDirectory()).map((d) => d.name),
    files: listDir.filter((d) => !d.isDirectory()).map((d) => d.name),
  }
  fs.writeFile(`${dirPath}/.meta.json`, JSON.stringify(jsonData));
  return jsonData;
}

const streetcatLoader: PluginOption = {
  name: "streetcatLoader",
  async buildStart(options) {
    processRecursive("./public");
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), streetcatLoader],
})
