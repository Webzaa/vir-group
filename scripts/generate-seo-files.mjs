/**
 * Replaces Next's robots.ts / sitemap.ts / next.config redirects.
 * Writes public/robots.txt, public/sitemap.xml and server/redirects.generated.json from the app's own data modules.
 */
import { writeFile } from 'node:fs/promises';
import { createServer, loadEnv } from 'vite';

const root = process.cwd();
const SITE_URL = (loadEnv('production', root, 'VITE_').VITE_SITE_URL ?? 'https://virgroup.in').replace(/\/$/, '');

const vite = await createServer({ root, appType: 'custom', server: { middlewareMode: true }, logLevel: 'error' });
try {
  const { projects } = await vite.ssrLoadModule('/src/data/projects/index.js');
  const { redirects } = await vite.ssrLoadModule('/src/router/redirects.js');

  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...['', '/projects', '/about', '/team', '/contact'].map((p) => ({ loc: `${SITE_URL}${p}`, freq: 'monthly', priority: p === '' ? 1 : 0.8 })),
    ...projects.map((p) => ({ loc: `${SITE_URL}/projects/${p.slug}`, freq: 'weekly', priority: 0.9 })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`;

  await writeFile('public/sitemap.xml', xml);
  await writeFile('public/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  const { mkdir } = await import('node:fs/promises');
  await mkdir('server', { recursive: true });
  await writeFile('server/redirects.generated.json', JSON.stringify(redirects, null, 2));
  console.log(`[seo] sitemap (${urls.length} urls), robots.txt, ${redirects.length} redirects`);
} finally {
  await vite.close();
}
