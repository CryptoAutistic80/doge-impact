import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_SITE_URL, getPageSeo } from '../seo/pageMetadata';

function upsertMetaTag(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLinkTag(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertStructuredData(payload) {
  let element = document.head.querySelector('script[data-seo="structured-data"]');

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.setAttribute('data-seo', 'structured-data');
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(payload);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const siteUrl = window.location.origin?.startsWith('http')
      ? window.location.origin
      : DEFAULT_SITE_URL;
    const seo = getPageSeo(pathname, siteUrl);

    document.title = seo.title;

    upsertMetaTag('meta[data-seo="description"]', {
      'data-seo': 'description',
      name: 'description',
      content: seo.description,
    });
    upsertMetaTag('meta[data-seo="robots"]', {
      'data-seo': 'robots',
      name: 'robots',
      content: seo.robots,
    });
    upsertMetaTag('meta[data-seo="googlebot"]', {
      'data-seo': 'googlebot',
      name: 'googlebot',
      content: seo.robots,
    });
    upsertMetaTag('meta[data-seo="keywords"]', {
      'data-seo': 'keywords',
      name: 'keywords',
      content: seo.keywords,
    });
    upsertLinkTag('link[data-seo="canonical"]', {
      'data-seo': 'canonical',
      rel: 'canonical',
      href: seo.canonical,
    });
    upsertMetaTag('meta[data-seo="og:type"]', {
      'data-seo': 'og:type',
      property: 'og:type',
      content: seo.ogType,
    });
    upsertMetaTag('meta[data-seo="og:title"]', {
      'data-seo': 'og:title',
      property: 'og:title',
      content: seo.title,
    });
    upsertMetaTag('meta[data-seo="og:description"]', {
      'data-seo': 'og:description',
      property: 'og:description',
      content: seo.description,
    });
    upsertMetaTag('meta[data-seo="og:url"]', {
      'data-seo': 'og:url',
      property: 'og:url',
      content: seo.canonical,
    });
    upsertMetaTag('meta[data-seo="og:image"]', {
      'data-seo': 'og:image',
      property: 'og:image',
      content: seo.imageUrl,
    });
    upsertMetaTag('meta[data-seo="og:image:secure_url"]', {
      'data-seo': 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: seo.imageUrl,
    });
    upsertMetaTag('meta[data-seo="og:image:alt"]', {
      'data-seo': 'og:image:alt',
      property: 'og:image:alt',
      content: seo.imageAlt,
    });
    upsertMetaTag('meta[data-seo="twitter:title"]', {
      'data-seo': 'twitter:title',
      name: 'twitter:title',
      content: seo.title,
    });
    upsertMetaTag('meta[data-seo="twitter:description"]', {
      'data-seo': 'twitter:description',
      name: 'twitter:description',
      content: seo.description,
    });
    upsertMetaTag('meta[data-seo="twitter:image"]', {
      'data-seo': 'twitter:image',
      name: 'twitter:image',
      content: seo.imageUrl,
    });
    upsertMetaTag('meta[data-seo="twitter:image:alt"]', {
      'data-seo': 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: seo.imageAlt,
    });
    upsertStructuredData(seo.structuredData);
  }, [pathname]);

  return null;
}
