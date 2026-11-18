// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: https://allibayev.github.io/saldr/
export default defineConfig({
  site: 'https://allibayev.github.io',
  base: '/saldr',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'always', format: 'directory' },
  image: { responsiveStyles: false },
  vite: { build: { cssMinify: 'lightningcss' } },
});
