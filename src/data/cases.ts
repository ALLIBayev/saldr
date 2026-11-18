import type { ImageMetadata } from 'astro';
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.jpg', { eager: true });
/** Image by name: 'layl-1' → assets/work/layl-1.jpg, 'me/avatar' → assets/me/avatar.jpg */
export const img = (n: string) => (files[`../assets/work/${n}.jpg`] ?? files[`../assets/${n}.jpg`]).default;

/** Structure of each case. Texts live in src/i18n/<lang>.ts under `cases`. */
export type Case = { slug: string; name: string; cat: string; year: string; href: string; imgs: string[]; mob: string };

const PROPOSAL = 'https://allibayev.github.io/convoglio-restyling/';

export const CASES: Case[] = [
  { slug: 'layl', name: 'LAYL', cat: 'ecommerce brand', year: '2026', href: 'https://layl-clo.github.io/layl-store/', imgs: ['layl-1', 'layl-2', 'layl-3'], mob: 'layl-m' },
  { slug: 'convoglio', name: 'ConVoglio ONLUS', cat: 'nonprofit', year: '2026', href: PROPOSAL, imgs: ['cv-1', 'cv-2'], mob: 'cv-m' },
  { slug: 'cirillico', name: 'USPR Cirillico', cat: 'sport nonprofit', year: '2026', href: PROPOSAL, imgs: ['ci-1'], mob: 'ci-m' },
  { slug: 'san-paolo', name: 'San Paolo Torino', cat: 'sport', year: '2026', href: PROPOSAL, imgs: ['sp-1'], mob: 'sp-m' },
];
