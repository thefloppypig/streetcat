import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { streetcatLoader } from './build/processDataPlugin'
import { processList } from './build/processFeederList'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), streetcatLoader, processList],
  publicDir: "public",
})
