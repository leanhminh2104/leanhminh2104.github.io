/**
 * Script tự động đồng bộ danh sách bài viết mới vào README.md
 */
const fs = require('fs');
const path = require('path');

// Đọc blog-data.js
const blogDataPath = path.join(__dirname, '..', 'assets', 'js', 'blog-data.js');
const blogDataCode = fs.readFileSync(blogDataPath, 'utf8');

const sandbox = { window: {} };
const fn = new Function('window', blogDataCode);
fn(sandbox.window);

const data = sandbox.window.BLOG_DATA;
const BASE_URL = 'https://leanhminh2104.github.io/blog/';

// Tạo markdown danh sách bài viết mới
const postsMd = data.posts.map(post => {
    return `- [${post.title}](${BASE_URL}${post.path}) — *${post.date}* \`${post.categoryName}\` (${post.readTime})`;
}).join('\n');

const newSection = `<!-- BLOG-POSTS-START -->
${postsMd}
<!-- BLOG-POSTS-END -->`;

// Cập nhật file README nếu có
function updateReadmeFile(targetPath) {
    if (!fs.existsSync(targetPath)) return;
    let content = fs.readFileSync(targetPath, 'utf8');
    
    if (content.includes('<!-- BLOG-POSTS-START -->')) {
        content = content.replace(/<!-- BLOG-POSTS-START -->[\s\S]*?<!-- BLOG-POSTS-END -->/, newSection);
    } else {
        content += `\n\n### 📝 Bài viết mới nhất trên Blog\n\n${newSection}\n`;
    }
    
    fs.writeFileSync(targetPath, content, 'utf8');
    console.log(`[README Updater] Đã cập nhật: ${targetPath}`);
}

// Cập nhật cả ở blog README và root repo README (nếu có)
updateReadmeFile(path.join(__dirname, '..', 'README.md'));
updateReadmeFile(path.join(__dirname, '..', '..', 'README.md'));
updateReadmeFile(path.join(__dirname, '..', '..', 'leanhminh2104.github.io', 'README.md'));
