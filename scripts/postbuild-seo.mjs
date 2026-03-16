import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_METADATA, getPageSeo, resolveSiteUrl } from '../src/seo/pageMetadata.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const distIndexPath = path.join(distDir, 'index.html');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', '&quot;');
}

function replaceTagContent(html, tagName, dataSeo, content) {
  const pattern = new RegExp(
    `<${tagName}([^>]*data-seo="${dataSeo}"[^>]*)>[\\s\\S]*?<\\/${tagName}>`,
    'i'
  );

  if (!pattern.test(html)) {
    throw new Error(`Missing ${tagName}[data-seo="${dataSeo}"] in built HTML.`);
  }

  return html.replace(pattern, `<${tagName}$1>${content}</${tagName}>`);
}

function replaceContentAttribute(html, tagName, dataSeo, content, attributeName = 'content') {
  const pattern = new RegExp(
    `(<${tagName}[^>]*data-seo="${dataSeo}"[^>]*${attributeName}=")([^"]*)(")`,
    'i'
  );

  if (!pattern.test(html)) {
    throw new Error(`Missing ${tagName}[data-seo="${dataSeo}"] ${attributeName} in built HTML.`);
  }

  return html.replace(pattern, `$1${escapeAttribute(content)}$3`);
}

function applySeo(html, seo) {
  let output = html;
  output = replaceTagContent(output, 'title', 'title', escapeHtml(seo.title));
  output = replaceContentAttribute(output, 'meta', 'description', seo.description);
  output = replaceContentAttribute(output, 'meta', 'robots', seo.robots);
  output = replaceContentAttribute(output, 'meta', 'googlebot', seo.robots);
  output = replaceContentAttribute(output, 'meta', 'keywords', seo.keywords);
  output = replaceContentAttribute(output, 'link', 'canonical', seo.canonical, 'href');
  output = replaceContentAttribute(output, 'meta', 'og:type', seo.ogType);
  output = replaceContentAttribute(output, 'meta', 'og:title', seo.title);
  output = replaceContentAttribute(output, 'meta', 'og:description', seo.description);
  output = replaceContentAttribute(output, 'meta', 'og:url', seo.canonical);
  output = replaceContentAttribute(output, 'meta', 'og:image', seo.imageUrl);
  output = replaceContentAttribute(output, 'meta', 'og:image:secure_url', seo.imageUrl);
  output = replaceContentAttribute(output, 'meta', 'og:image:alt', seo.imageAlt);
  output = replaceContentAttribute(output, 'meta', 'twitter:title', seo.title);
  output = replaceContentAttribute(output, 'meta', 'twitter:description', seo.description);
  output = replaceContentAttribute(output, 'meta', 'twitter:image', seo.imageUrl);
  output = replaceContentAttribute(output, 'meta', 'twitter:image:alt', seo.imageAlt);
  output = replaceTagContent(
    output,
    'script',
    'structured-data',
    JSON.stringify(seo.structuredData).replaceAll('</script', '<\\/script')
  );
  return output;
}

function buildSitemap(siteUrl) {
  const now = new Date().toISOString();
  const entries = Object.entries(PAGE_METADATA)
    .map(([pathname, page]) => {
      const loc = pathname === '/' ? `${siteUrl}/` : `${siteUrl}${pathname}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
    '',
  ].join('\n');
}

function buildRobots(siteUrl) {
  return [`User-agent: *`, `Allow: /`, `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n');
}

async function main() {
  const siteUrl = resolveSiteUrl(process.env);
  const baseHtml = await readFile(distIndexPath, 'utf8');

  for (const pathname of Object.keys(PAGE_METADATA)) {
    const seo = getPageSeo(pathname, siteUrl);
    const html = applySeo(baseHtml, seo);
    const outputPath =
      pathname === '/'
        ? distIndexPath
        : path.join(distDir, pathname.replace(/^\//, ''), 'index.html');

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
  }

  await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(siteUrl));
  await writeFile(path.join(distDir, 'robots.txt'), buildRobots(siteUrl));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
