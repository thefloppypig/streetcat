import { defineConfig } from 'astro/config';
import { streetcatLoader } from './build/processDataPlugin';
import { processFeederPlugin } from './build/processFeederList';
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";
import { deployedLink } from './src/Const';

// https://astro.build/config
export default defineConfig({
  site: deployedLink,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [react(), processFeederPlugin, streetcatLoader]
  }
});