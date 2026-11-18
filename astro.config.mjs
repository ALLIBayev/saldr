// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Custom domain on GitHub Pages: https://saldrstudio.com
export default defineConfig({
  site: 'https://saldrstudio.com',
  trailingSlash: 'ignore',
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it', ru: 'ru', kk: 'kk' } }, filter: (page) => !page.includes('/404') })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'always', format: 'directory' },
  image: { responsiveStyles: false },
  vite: { build: { cssMinify: 'lightningcss' } },
});
