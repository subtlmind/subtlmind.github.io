// Post-build steps for GitHub Pages, run after `ng build` (static prerender output).
//  1. 404.html  <- client-only shell, so unknown URLs boot the app instead of showing the homepage HTML.
//  2. <route>.html copies of <route>/index.html, so GitHub Pages serves /about without a /about/ redirect.
//  3. sitemap.xml generated from the prerendered pages.
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE_URL = 'https://subtlmind.in';
const OUT = 'dist/subtlmind-site/browser';

if (!existsSync(OUT)) {
  console.error(`postbuild: ${OUT} not found. Run ng build first.`);
  process.exit(1);
}

copyFileSync(join(OUT, existsSync(join(OUT, 'index.csr.html')) ? 'index.csr.html' : 'index.html'), join(OUT, '404.html'));

const pages = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== 'assets') walk(full);
    } else if (name === 'index.html') {
      const route = relative(OUT, dir).split(sep).join('/');
      const html = readFileSync(full, 'utf8');
      if (/http-equiv="refresh"/i.test(html)) continue; // redirect stubs (e.g. /platform)
      pages.push(route);
      if (route) copyFileSync(full, `${dir}.html`);
    }
  }
};
walk(OUT);

const priority = (r) => (r === '' ? '1.0' : r === 'solutions' ? '0.9' : r.startsWith('solutions/') ? '0.8' : ['privacy', 'terms'].includes(r) ? '0.3' : '0.7');
const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .sort()
  .map((r) => `  <url>\n    <loc>${SITE_URL}/${r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(r)}</priority>\n  </url>`)
  .join('\n');
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

console.log(`postbuild: 404.html, ${pages.length - 1} .html route copies, sitemap.xml (${pages.length} URLs)`);
