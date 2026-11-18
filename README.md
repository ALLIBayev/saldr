# Saldr Studio — website

Agency site for Saldr Studio (Alizhan “Don” Saldyrbayev, Turin). Live: https://allibayev.github.io/saldr/

## Stack
- **Astro 7**: static HTML, zero client framework, CSS inlined per page, prefetch on hover
- **Images**: `astro:assets` builds responsive AVIF + WebP from `src/assets/work/*.jpg`
- **Motion**: GSAP 3.15 (ScrollTrigger, SplitText, CustomEase) + Lenis smooth scroll, bundled into one module
- **Page transitions**: native cross-document View Transitions (CSS only)
- **Font**: Onest Variable, self-hosted (@fontsource), latin preloaded
- **SEO**: sitemap, robots.txt, Open Graph image, JSON-LD, canonical URLs, 404 page
- Respects `prefers-reduced-motion`. Lighthouse (local): performance 95–99, SEO 100, best practices 100

## Edit
- Text for case studies: `src/data/cases.ts`
- Contacts, name: `src/data/site.ts`
- Pages: `src/pages/*.astro` · Layout (header, footer, form drawer): `src/layouts/Base.astro`
- Styles: `src/styles/global.css` (tokens at the top) · Motion: `src/scripts/main.ts`
- Logo: `src/assets/eagle.svg` (one path, `fill="currentColor"`)

## Run
```
npm install
npm run dev      # http://localhost:4321/saldr/
npm run build    # outputs dist/
```

## Deploy
Every push to `main` builds and deploys through `.github/workflows/deploy.yml`
(Settings → Pages → Source: GitHub Actions).
For a custom domain later: set `site` and remove `base` in `astro.config.mjs`, add `public/CNAME`.
