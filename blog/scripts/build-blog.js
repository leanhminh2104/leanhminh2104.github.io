/**
 * BLOG STATIC BUILDER & SYNC ENGINE
 * Tu dong cap nhat the bai viet va dieu huong trong:
 * 1. index.html (Trang chu)
 * 2. tech/index.html (Chuyen muc Cong nghe)
 * 3. life/index.html (Chuyen muc Cuoc song)
 * 4. Cac bai viet chi tiet trong tech va life (Tu cap nhat bai truoc / bai sau)
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const blogDataPath = path.join(ROOT_DIR, 'assets', 'js', 'blog-data.js');

// 1. Nạp BLOG_DATA
const blogDataCode = fs.readFileSync(blogDataPath, 'utf8');
const sandbox = { window: {} };
const fn = new Function('window', blogDataCode);
fn(sandbox.window);
const DATA = sandbox.window.BLOG_DATA;

console.log(`[Blog Builder] Đang đồng bộ cho ${DATA.posts.length} bài viết...`);

// Emoji tương ứng theo icon hoặc category
function getPostEmoji(post) {
    if (post.icon === 'fa-mobile-screen-button') return '📲';
    if (post.icon === 'fa-key') return '🔑';
    if (post.icon === 'fa-bolt') return '💡';
    if (post.icon === 'fa-heart' || post.category === 'life') return '🌱';
    return '🚀';
}

// 2. Hàm sinh thẻ bài viết HTML
function renderPostCard(post, relativeRoot = './') {
    const emoji = getPostEmoji(post);
    const badgeColor = post.category === 'tech' ? 'badge-info' : 'badge-success';
    const catIcon = post.category === 'tech' ? 'fa-code' : 'fa-heart';
    const tagsHtml = (post.tags || []).slice(0, 3).map(t => `<span class="badge badge-primary">${t}</span>`).join('\n                                ');

    return `            <!-- Card: ${post.title} -->
            <div class="post-card-wrapper reveal" data-category="${post.category}">
                <a href="${relativeRoot}${post.path}" class="post-card">
                    <div class="post-cover">
                        ${emoji}
                    </div>
                    <div class="post-body">
                        <div class="post-meta">
                            <span class="badge ${badgeColor}"><i class="fas ${catIcon}"></i> ${post.categoryName}</span>
                            ${post.isNew ? '<span class="badge badge-warning">Mới</span>' : ''}
                            <span class="post-meta-item"><i class="fas fa-calendar"></i> ${post.formattedDate || post.date}</span>
                            <span class="post-meta-item"><i class="fas fa-clock"></i> ${post.readTime}</span>
                        </div>
                        <h2 class="post-title">${post.title}</h2>
                        <p class="post-excerpt">
                            ${post.excerpt}
                        </p>
                        <div class="post-footer">
                            <div class="post-tags">
                                ${tagsHtml}
                            </div>
                            <div class="post-arrow" aria-hidden="true">
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`;
}

// 3. Cập nhật posts-grid trong các trang danh sách
function updatePostsGridInFile(filePath, filterCat = null, relativeRoot = './') {
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    const postsToRender = filterCat ? DATA.posts.filter(p => p.category === filterCat) : DATA.posts;
    const cardsHtml = postsToRender.map(p => renderPostCard(p, relativeRoot)).join('\n\n');

    const gridRegex = /(<div class="posts-grid" id="posts-grid">)[\s\S]*?(<\/div><!-- \/posts-grid -->)/;
    if (gridRegex.test(html)) {
        html = html.replace(gridRegex, `$1\n${cardsHtml}\n        $2`);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`[Blog Builder] ✅ Đã cập nhật danh sách bài viết: ${path.relative(ROOT_DIR, filePath)} (${postsToRender.length} bài)`);
    }
}

// Cập nhật Trang chủ (Toàn bộ bài viết)
updatePostsGridInFile(path.join(ROOT_DIR, 'index.html'), null, './');

// Cập nhật Trang Tech (Chỉ bài viết công nghệ)
updatePostsGridInFile(path.join(ROOT_DIR, 'tech', 'index.html'), 'tech', './');

// Cập nhật Trang Life (Chỉ bài viết cuộc sống)
updatePostsGridInFile(path.join(ROOT_DIR, 'life', 'index.html'), 'life', './');

// 4. Cập nhật "Bài viết trước / Bài viết tiếp theo" trong các trang chi tiết bài viết
DATA.posts.forEach((post, idx) => {
    const postFilePath = path.join(ROOT_DIR, post.path, 'index.html');
    if (!fs.existsSync(postFilePath)) return;

    let html = fs.readFileSync(postFilePath, 'utf8');
    const prevPost = idx > 0 ? DATA.posts[idx - 1] : null;
    const nextPost = idx < DATA.posts.length - 1 ? DATA.posts[idx + 1] : null;

    let navHtml = '            <!-- Post Navigation (Tự động cập nhật bởi build-blog.js) -->\n            <div class="post-nav animate-up">\n';
    
    if (prevPost) {
        navHtml += `                <a href="../../${prevPost.path}" class="post-nav-card prev">
                    <span class="post-nav-label"><i class="fas fa-arrow-left"></i> Bài trước</span>
                    <span class="post-nav-title">${prevPost.title}</span>
                </a>\n`;
    } else {
        navHtml += `                <div class="post-nav-card disabled">
                    <span class="post-nav-label"><i class="fas fa-flag-checkered"></i> Bài viết đầu tiên</span>
                    <span class="post-nav-title">Bạn đang đọc bài mới nhất</span>
                </div>\n`;
    }

    if (nextPost) {
        navHtml += `                <a href="../../${nextPost.path}" class="post-nav-card next">
                    <span class="post-nav-label">Bài tiếp theo <i class="fas fa-arrow-right"></i></span>
                    <span class="post-nav-title">${nextPost.title}</span>
                </a>\n`;
    } else {
        navHtml += `                <a href="../../" class="post-nav-card next">
                    <span class="post-nav-label">Khám phá thêm <i class="fas fa-house"></i></span>
                    <span class="post-nav-title">Về trang chủ Blog</span>
                </a>\n`;
    }

    navHtml += '            </div>';

    // Thay thế khối .post-nav nếu đã có, hoặc chèn trước thẻ </article>
    if (html.includes('class="post-nav')) {
        html = html.replace(/<!-- Post Navigation[\s\S]*?<\/div>\s*<\/div>/, navHtml.trim());
    } else if (html.includes('</article>')) {
        html = html.replace('</article>', `${navHtml}\n\n            </article>`);
    }

    fs.writeFileSync(postFilePath, html, 'utf8');
    console.log(`[Blog Builder] ✅ Đã cập nhật điều hướng chi tiết: ${post.path}index.html`);
});

console.log('[Blog Builder] Hoàn tất toàn bộ việc đồng bộ HTML!');
