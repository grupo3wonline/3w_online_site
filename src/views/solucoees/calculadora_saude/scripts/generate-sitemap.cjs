const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.3wonline.com.br/calculadora_saude';
// Grava tanto no public (fonte) quanto no dist (build final), quando existir.
const OUT_PUBLIC = path.resolve(__dirname, '../public/sitemap.xml');
const OUT_DIST = path.resolve(__dirname, '../dist/sitemap.xml');

// Rotas reais da aplicação (landing única + páginas legais).
const routes = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/privacidade', priority: '0.5', changefreq: 'yearly' },
  { loc: '/termos', priority: '0.5', changefreq: 'yearly' },
];

function buildSitemap() {
  const now = new Date().toISOString().slice(0, 10);
  const entries = routes
    .map(
      (r) =>
        `  <url>\n    <loc>${BASE_URL}${r.loc === '/' ? '/' : r.loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  fs.writeFileSync(OUT_PUBLIC, xml, 'utf8');
  console.log('Sitemap gerado em', OUT_PUBLIC);

  if (fs.existsSync(path.dirname(OUT_DIST))) {
    fs.writeFileSync(OUT_DIST, xml, 'utf8');
    console.log('Sitemap copiado para', OUT_DIST);
  }
}

buildSitemap();
