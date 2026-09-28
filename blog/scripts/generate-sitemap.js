/**
 * Script tự động sinh sitemap.xml và robots.txt từ assets/js/blog-data.js
 * Chạy bởi GitHub Actions hoặc thủ công trước khi deploy
 */
const fs = require('fs');
const path = require('path');

// Đọc blog-data.js
const blogDataPath = path.join(__dirname, '..', 'assets', 'js', 'blog-data.js');
const blogDataCode = fs.readFileSync(blogDataPath, 'utf8');

// Giả lập window.BLOG_DATA
const sandbox = { window: {} };
const fn = new Function('window', blogDataCode);
fn(sandbox.window);

const data = sandbox.window.BLOG_DATA;
const BASE_URL = 'https://leanhminh2104.github.io/blog/';
const today = new Date().toISOString().split('T')[0];

console.log(`[SEO Generator] Tìm thấy ${data.posts.length} bài viết và ${data.categories.length} chuyên mục.`);

// 1. Tạo sitemap.xml
let sitemapUrls = [
    `  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`
];

// Thêm các chuyên mục
data.categories.forEach(cat => {
    if (cat.slug !== '') {
        sitemapUrls.push(`  <url>
    <loc>${BASE_URL}${cat.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }
});

// Thêm các bài viết
data.posts.forEach(post => {
    sitemapUrls.push(`  <url>
    <loc>${BASE_URL}${post.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>
`;

const sitemapDist = path.join(__dirname, '..', 'sitemap.xml');
fs.writeFileSync(sitemapDist, sitemapXml, 'utf8');
console.log(`[SEO Generator] Đã xuất: ${sitemapDist}`);

// 2. Tạo robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}sitemap.xml
`;

const robotsDist = path.join(__dirname, '..', 'robots.txt');
fs.writeFileSync(robotsDist, robotsTxt, 'utf8');
console.log(`[SEO Generator] Đã xuất: ${robotsDist}`);
