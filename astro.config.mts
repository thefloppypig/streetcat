import { defineConfig } from 'astro/config';
import { streetcatLoader } from './build/processDataPlugin'
import { processFeederPlugin } from './build/processFeederList'
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [react(), processFeederPlugin, streetcatLoader],
  }
});