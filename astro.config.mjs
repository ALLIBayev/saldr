// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Custom domain on GitHub Pages: https://saldrstudio.com
export default defineConfig({
  site: 'https://saldrstudio.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'always', format: 'directory' },
  image: { responsiveStyles: false },
  vite: { build: { cssMinify: 'lightningcss' } },
});
