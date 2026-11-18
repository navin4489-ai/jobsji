import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Keep defaults in sync with src/config/site.ts (workflow sets these explicitly).
const SITE_URL = process.env.SITE_URL || 'https://jobsji.in';
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
});
