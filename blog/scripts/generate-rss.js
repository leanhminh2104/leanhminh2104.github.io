/**
 * Script tự động sinh RSS Feed 2.0 (feed.xml) từ assets/js/blog-data.js
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const blogDataPath = path.join(ROOT_DIR, 'assets', 'js', 'blog-data.js');

const blogDataCode = fs.readFileSync(blogDataPath, 'utf8');
const sandbox = { window: {} };
const fn = new Function('window', blogDataCode);
fn(sandbox.window);
const DATA = sandbox.window.BLOG_DATA;

const BASE_URL = 'https://leanhminh2104.github.io/blog/';
const nowRfc822 = new Date().toUTCString();

const itemsXml = DATA.posts.map(post => {
    const postUrl = `${BASE_URL}${post.path}`;
    const pubDate = new Date(post.date).toUTCString();
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.categoryName}]]></category>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`;
}).join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${DATA.site.title || 'leanhminh2104 — Blog'}]]></title>
    <link>${BASE_URL}</link>
    <description><![CDATA[${DATA.site.tagline || 'Chia sẻ về Lập trình, Công nghệ & Cuộc sống'}]]></description>
    <language>vi</language>
    <lastBuildDate>${nowRfc822}</lastBuildDate>
    <atom:link href="${BASE_URL}feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>
`;

const rssDist = path.join(ROOT_DIR, 'feed.xml');
fs.writeFileSync(rssDist, rssXml, 'utf8');
console.log(`[RSS Generator] ✅ Đã tạo RSS Feed: ${rssDist} (${DATA.posts.length} bài viết)`);
