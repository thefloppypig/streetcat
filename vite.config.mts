import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { streetcatLoader } from './build/processDataPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), streetcatLoader],
  publicDir: "public",
})
