import { PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from "fs";

function processRecursive(dirPath: string) {
  const data = processDirectoryData(dirPath);
  for (const dir of data.dir) {
    processRecursive(`${dirPath}/${dir}`)
  }
}

function processDirectoryData(dirPath: string) {
  const listDir = fs.readdirSync(dirPath, { withFileTypes: true });
  const jsonData = {
    dir: listDir.filter((d) => d.isDirectory()).map((d) => d.name),
    files: listDir.filter((d) => !d.isDirectory()).map((d) => d.name),
  }
  fs.writeFileSync(`${dirPath}/meta.json`, JSON.stringify(jsonData));
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
  base: "./",
  plugins: [react(), streetcatLoader],
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  }
})
