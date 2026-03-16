export const SITE_NAME = 'DOGE Impact Counter';
export const DEFAULT_SITE_URL = 'https://death-count.vercel.app';
export const DEFAULT_THEME_COLOR = '#050505';
export const ROBOTS_CONTENT =
  'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

export const PAGE_METADATA = {
  '/': {
    title: "DOGE Impact Counter | Estimated Death Toll From Elon Musk's DOGE",
    description:
      "Track the estimated human cost of Elon Musk's Department of Government Efficiency with methodology, sources, and ongoing accountability updates.",
    imagePath: '/og/overview.png',
    imageAlt: 'DOGE Impact Counter social share card with a dark red accountability theme.',
    keywords: [
      'DOGE impact counter',
      'DOGE death count',
      'Elon Musk DOGE',
      'USAID deaths',
      'PEPFAR deaths',
      'global health cuts',
      'DOGE accountability',
    ],
    schemaType: 'WebPage',
    changefreq: 'daily',
    priority: '1.0',
  },
  '/methodology': {
    title: 'Methodology | How the DOGE Impact Counter Calculates the Death Toll',
    description:
      "See how the DOGE Impact Counter uses Brooke Nichols' peer-reviewed model, Lancet projections, and public-health reporting to estimate deaths linked to DOGE-driven cuts.",
    imagePath: '/og/methodology.png',
    imageAlt: 'Methodology share card for the DOGE Impact Counter.',
    keywords: [
      'DOGE methodology',
      'Brooke Nichols impact counter',
      'USAID excess deaths model',
      'Lancet aid cuts',
      'peer reviewed death toll',
    ],
    schemaType: 'AboutPage',
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/sources': {
    title: 'Sources | Research Behind the DOGE Impact Counter',
    description:
      'Browse the studies, public-health models, and reporting behind the DOGE Impact Counter, including Boston University, The Lancet, CGD, Harvard, CIDRAP, and ProPublica.',
    imagePath: '/og/sources.png',
    imageAlt: 'Sources and research share card for the DOGE Impact Counter.',
    keywords: [
      'DOGE sources',
      'USAID cuts research',
      'Boston University impact counter',
      'Lancet USAID',
      'Center for Global Development',
      'DOGE reporting',
    ],
    schemaType: 'CollectionPage',
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/support-us': {
    title: 'Support Us | Fund DOGE Accountability and Site Improvements',
    description:
      'Donate crypto to keep the DOGE Impact Counter online, expand features, maintain sourcing, and fund ongoing accountability work.',
    imagePath: '/og/support-us.png',
    imageAlt: 'Support Us share card for the DOGE Impact Counter donation page.',
    keywords: [
      'support DOGE Impact',
      'donate crypto accountability project',
      'DOGE accountability donations',
      'Elon Musk accountability project',
      'fund site improvements',
    ],
    schemaType: 'WebPage',
    changefreq: 'weekly',
    priority: '0.8',
  },
};

export function normalizePathname(pathname = '/') {
  const cleanPath = pathname.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  return PAGE_METADATA[cleanPath] ? cleanPath : '/';
}

export function resolveSiteUrl(env = {}) {
  const rawUrl =
    env.VITE_SITE_URL ||
    env.SITE_URL ||
    env.VERCEL_PROJECT_PRODUCTION_URL ||
    env.VERCEL_URL ||
    DEFAULT_SITE_URL;
  const normalized = /^https?:\/\//.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  return normalized.replace(/\/+$/, '');
}

export function getPageSeo(pathname = '/', siteUrl = DEFAULT_SITE_URL) {
  const normalizedPath = normalizePathname(pathname);
  const page = PAGE_METADATA[normalizedPath];
  const canonical = normalizedPath === '/' ? `${siteUrl}/` : `${siteUrl}${normalizedPath}`;
  const homepageUrl = `${siteUrl}/`;
  const imageUrl = `${siteUrl}${page.imagePath}`;

  return {
    ...page,
    canonical,
    imageUrl,
    ogType: 'website',
    keywords: page.keywords.join(', '),
    robots: ROBOTS_CONTENT,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': page.schemaType,
      name: page.title,
      headline: page.title,
      description: page.description,
      url: canonical,
      inLanguage: 'en-US',
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: homepageUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: homepageUrl,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: 1200,
        height: 630,
      },
      keywords: page.keywords,
    },
  };
}
