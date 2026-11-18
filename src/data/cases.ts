import type { ImageMetadata } from 'astro';
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/work/*.jpg', { eager: true });
export const img = (n: string) => files[`../assets/work/${n}.jpg`].default;

export type Case = {
  slug: string; name: string; cat: string; short: string; title: string; year: string;
  client: string; scope: string; status: string; link: { href: string; label: string };
  tags: string[]; imgs: string[]; mob: string; brief: string; did: string; didList: string[];
  facts: [string, string][];
};

const PROPOSAL = { href: 'https://allibayev.github.io/convoglio-restyling/', label: 'See it live' };

export const CASES: Case[] = [
  {
    slug: 'layl', name: 'LAYL', cat: 'ecommerce brand', year: '2026',
    short: 'Online store for a streetwear label',
    title: 'An online store that feels like the clothes: black, calligraphic, unhurried.',
    client: 'LAYL (my own label)', scope: 'Brand, store design, development', status: 'Live',
    link: { href: 'https://layl-clo.github.io/layl-store/', label: 'Visit the store' },
    tags: ['E-commerce', 'Brand', 'Web'], imgs: ['layl-1', 'layl-2', 'layl-3'], mob: 'layl-m',
    brief: 'LAYL means “night” in Arabic. The label sells hoodies, pants and tees with hand-drawn calligraphy, to customers in Kazakhstan and beyond. It needed a store that matched the clothes and could take orders without a payment provider in the middle.',
    did: 'I designed the brand system and built the store as a fast static site. Customers browse the collection, add items to a bag and send the order straight to the team on WhatsApp or Telegram, where it gets confirmed within the hour.',
    didList: ['Collection with filters by category', 'Bag and checkout through WhatsApp or Telegram', 'Nine interface languages', 'Prices in local currency, including tenge', 'Light and dark theme', 'Static hosting, no monthly platform fee'],
    facts: [['9', 'interface languages, switchable on every page'], ['2', 'messengers that receive orders directly'], ['0', 'platform subscriptions — it runs on free static hosting']],
  },
  {
    slug: 'convoglio', name: 'ConVoglio ONLUS', cat: 'nonprofit', year: '2026',
    short: 'Website redesign for a volunteer association',
    title: 'A Turin volunteer association, finally easy to support.',
    client: 'ConVoglio ONLUS, Turin', scope: 'Structure, UX writing, design, development', status: 'Redesign proposal',
    link: PROPOSAL, tags: ['Nonprofit', 'Web'], imgs: ['cv-1', 'cv-2'], mob: 'cv-m',
    brief: 'ConVoglio organises shows, tournaments and charity events, and passes the money to people and causes that need it. Its site lived on Google Sites: menus repeated twice, a Gmail address as the only contact and no descriptions for search engines.',
    did: 'I rebuilt the structure around what visitors come to do — understand the association, see its projects and give. The 5×1000 tax code copies in one tap, events have their own archive, and the whole site reads well on a phone.',
    didList: ['New navigation: About, Projects, Events, Support, Contact', 'One-tap copy of the 5×1000 tax code', 'Newsletter sign-up', 'Project pages with partner links', 'Mobile-first layout', 'Search-engine descriptions on every page'],
    facts: [['11', 'projects brought together on one page'], ['1 tap', 'to copy the 5×1000 code for a tax return'], ['5', 'clear sections instead of a duplicated menu']],
  },
  {
    slug: 'cirillico', name: 'USPR Cirillico', cat: 'sport nonprofit', year: '2026',
    short: 'Trilingual page for a football club',
    title: 'A football club for Russian speakers in Turin, in three languages.',
    client: 'USPR Cirillico, Turin', scope: 'Design, copy structure, development', status: 'Redesign proposal',
    link: PROPOSAL, tags: ['Sport', 'Web', 'Multilingual'], imgs: ['ci-1'], mob: 'ci-m',
    brief: 'Cirillico has played in Turin since 2018, with a men’s and a women’s team. Its players speak Italian, Russian and English, and the club wanted a page that welcomes all of them — and brings in new players.',
    did: 'A dark, sporty page with the club’s yellow, an Italian / Russian / English switch at the top and one clear action: join the team. The story section explains why the club exists, in a few honest lines.',
    didList: ['IT / RU / EN language switch', '“Join the team” as the main action', 'Men’s and women’s team sections', 'Club story', 'Works as part of the ConVoglio site', 'Fast on mobile data'],
    facts: [['3', 'languages on one page'], ['2018', 'the club’s founding year, front and centre'], ['1', 'main action: join the team']],
  },
  {
    slug: 'san-paolo', name: 'San Paolo Torino', cat: 'sport', year: '2026',
    short: 'Rebuild of a football club website',
    title: 'A neighbourhood football club, rebuilt so search engines can actually see it.',
    client: 'ASD San Paolo Torino', scope: 'Audit, design, development', status: 'Redesign proposal',
    link: PROPOSAL, tags: ['Sport', 'Web', 'SEO'], imgs: ['sp-1'], mob: 'sp-m',
    brief: 'The club’s site was made with a site builder that shipped about 1.3 MB of Angular code. Search engines saw an empty page, and parents looking for a football school in the San Paolo area couldn’t find it.',
    did: 'I rebuilt it as a light static site in the club’s blue stripes. Address, training times and phone number sit right under the hero. Parents book a free trial with a short form that sends straight to the club’s WhatsApp.',
    didList: ['Static rebuild, readable by search engines', 'Free trial booking that opens in WhatsApp', 'Address, training times and phone at a glance', 'Football school and team pages', 'Club identity with blue stripes', 'News section'],
    facts: [['≈1.3 MB', 'of site-builder code replaced with plain HTML'], ['1 form', 'to book a free trial, sent to WhatsApp'], ['5+', 'the age kids can join the football school']],
  },
];
