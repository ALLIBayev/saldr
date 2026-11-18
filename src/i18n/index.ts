import en, { type Dict } from './en';
import it from './it';
import ru from './ru';
import kk from './kk';
import legalEn from './legal/en';
import legalIt from './legal/it';
import legalRu from './legal/ru';
import legalKk from './legal/kk';
import { u } from '../data/site';

export const LOCALES = ['en', 'it', 'ru', 'kk'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT: Lang = 'en';

/** Short codes shown in the language switcher. Kazakhstan uses "KZ" more than ISO "KK". */
export const CODES: Record<Lang, string> = { en: 'EN', it: 'IT', ru: 'RU', kk: 'KZ' };
/** og:locale values */
export const OG: Record<Lang, string> = { en: 'en_US', it: 'it_IT', ru: 'ru_RU', kk: 'kk_KZ' };

const DICTS: Record<Lang, Dict> = { en, it, ru, kk };
const LEGAL = { en: legalEn, it: legalIt, ru: legalRu, kk: legalKk };

export const t = (lang: Lang) => DICTS[lang];
export const legal = (lang: Lang) => LEGAL[lang];

/** Localised link: L('it', 'services') → /it/services */
export const L = (lang: Lang, p = '') => {
  const clean = p.replace(/^\/|\/$/g, '');
  const path = lang === DEFAULT ? clean : clean ? `${lang}/${clean}` : lang;
  return u(path ? `${path}/` : ''); // trailing slash = the URL GitHub Pages serves, no redirect
};

/** getStaticPaths helper for src/pages/[...lang]/… — English lives at the root. */
export const langPaths = () =>
  LOCALES.map((lang) => ({ params: { lang: lang === DEFAULT ? undefined : lang }, props: { lang } }));
