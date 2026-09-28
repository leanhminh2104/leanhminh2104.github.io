/**
 * MASTER BLOG AUTOMATION RUNNER
 * Chạy toàn bộ các quy trình tự động hóa:
 * 1. build-blog: Cập nhật toàn bộ HTML (Trang chủ, Chuyên mục, Bài viết chi tiết)
 * 2. generate-sitemap: Tạo sitemap.xml & robots.txt
 * 3. generate-rss: Tạo feed.xml chuẩn RSS 2.0
 * 4. update-readme: Cập nhật danh sách bài viết vào README.md
 * 5. validate-build: Kiểm tra chất lượng và tính toàn vẹn của tất cả bài viết
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCRIPTS_DIR = __dirname;
const ROOT_DIR = path.join(__dirname, '..');

console.log('============================================================');
console.log('🚀 BẮT ĐẦU QUY TRÌNH TỰ ĐỘNG HÓA BLOG (MASTER AUTOMATION)');
console.log('============================================================');

function runScript(scriptName, description) {
    console.log(`\n▶️  [Bước] ${description}...`);
    const scriptPath = path.join(SCRIPTS_DIR, scriptName);
    try {
        const out = execSync(`node "${scriptPath}"`, { encoding: 'utf8', cwd: ROOT_DIR });
        console.log(out.trim());
    } catch (err) {
        console.error(`❌ LỖI tại ${scriptName}:`, err.message);
        process.exit(1);
    }
}

// 1. Cập nhật toàn bộ HTML
runScript('build-blog.js', 'Đồng bộ HTML trang chủ, chuyên mục và bài viết chi tiết');

// 2. Tạo Sitemap & Robots
runScript('generate-sitemap.js', 'Sinh sitemap.xml và robots.txt chuẩn SEO');

// 3. Tạo RSS Feed
runScript('generate-rss.js', 'Tạo feed.xml chuẩn RSS 2.0 cho độc giả');

// 4. Cập nhật README
runScript('update-readme.js', 'Cập nhật danh sách bài viết mới vào README.md');

// 5. Kiểm tra tính toàn vẹn (Integrity Check)
console.log('\n▶️  [Kiểm tra] Kiểm tra tính toàn vẹn của hệ thống...');
const requiredFiles = [
    path.join(ROOT_DIR, 'index.html'),
    path.join(ROOT_DIR, 'sitemap.xml'),
    path.join(ROOT_DIR, 'robots.txt'),
    path.join(ROOT_DIR, 'feed.xml'),
    path.join(ROOT_DIR, 'assets', 'js', 'blog-data.js'),
    path.join(ROOT_DIR, 'assets', 'js', 'components.js')
];

let allOk = true;
requiredFiles.forEach(f => {
    if (fs.existsSync(f)) {
        const stat = fs.statSync(f);
        console.log(`  ✓ ${path.relative(ROOT_DIR, f)} (${(stat.size / 1024).toFixed(1)} KB)`);
    } else {
        console.error(`  ✗ THIẾU FILE: ${path.relative(ROOT_DIR, f)}`);
        allOk = false;
    }
});

if (!allOk) {
    console.error('❌ Kiểm tra thất bại: Thiếu các file cốt lõi!');
    process.exit(1);
}

console.log('\n============================================================');
console.log('✅ HOÀN TẤT TOÀN BỘ TỰ ĐỘNG HÓA BLOG THÀNH CÔNG 100%!');
console.log('============================================================');
