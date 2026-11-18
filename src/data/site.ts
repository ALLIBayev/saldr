export const SITE = {
  name: 'Saldr',
  full: 'Saldr Studio',
  tagline: 'Drop to scale',
  founder: 'Alizhan “Don” Saldyrbayev',
  city: 'Turin, Italy',
  telegram: 'wcinreak',
  channel: 'saldrdroptoscale',
  github: 'ALLIBayev',
};
export const tg = (user: string, text?: string) =>
  `https://t.me/${user}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Prefix an internal path with the deploy base ("/saldr"). */
export const u = (p = '') => `${BASE}/${p.replace(/^\//, '')}`;
