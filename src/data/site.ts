// Contact details used across the site. Change them here and every page updates.
export const SITE = {
  name: 'Saldr',
  full: 'Saldr Studio',
  tagline: 'Drop to scale',
  founder: 'Alizhan Saldyrbayev',
  city: 'Turin, Italy',
  telegram: 'wcinreak',
  channel: 'saldrdroptoscale',
  instagram: 'saldyrbayev',
  github: 'ALLIBayev',
  /** WhatsApp number in international format, digits only. */
  whatsapp: '393520881131',
  phone: '+39 352 088 1131',
  /** Forwarded to Gmail by Cloudflare Email Routing. */
  email: 'hello@saldrstudio.com',
  /** Cloudflare Web Analytics beacon token (cookie-free). Empty = analytics off. */
  cfBeacon: '',
};
export const tg = (user: string, text?: string) =>
  `https://t.me/${user}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const wa = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const ig = `https://www.instagram.com/${SITE.instagram}/`;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Prefix an internal path with the deploy base. */
export const u = (p = '') => `${BASE}/${p.replace(/^\//, '')}`;
