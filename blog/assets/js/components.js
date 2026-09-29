/**
 * ============================================================
 * BLOG COMPONENTS ENGINE — MODULAR HEADER, FOOTER, MENU & ADS
 * ============================================================
 * Tự động tạo:
 * 1. Topbar / Header PC (kèm Ô Tìm Kiếm nhanh Ctrl+K)
 * 2. Interactive Search Modal (Tìm kiếm tức thì toàn bộ bài viết)
 * 3. Mobile Bottom Dock (Nút FAB chính giữa đổi thành TÌM KIẾM)
 * 4. Mobile Drawer Menu (Menu vuốt chuẩn Bottom Sheet)
 * 5. Chân trang Footer chuẩn chỉnh kèm thống kê & liên kết
 * 6. Quảng cáo / Sponsor Banners tự động theo vị trí
 * 
 * Tự động tính toán đường dẫn tương đối (rootPath) cho mọi cấp thư mục!
 */

(function () {
    'use strict';

    // ────────────────────────────────────────────────────────────
    // 1. TÍNH TOÁN ĐƯỜNG DẪN TƯƠNG ĐỐI TỚI THƯ MỤC GỐC BLOG
    // ────────────────────────────────────────────────────────────
    function resolveBlogRoot() {
        const meta = document.querySelector('meta[name="blog-root"]');
        if (meta) return meta.getAttribute('content');

        // Suy ra từ thẻ script nạp file components.js
        const script = document.querySelector('script[src*="components.js"]');
        if (script) {
            const src = script.getAttribute('src');
            const idx = src.indexOf('assets/');
            if (idx !== -1) {
                return src.substring(0, idx); // Trả về "./", "../", hoặc "../../"
            }
        }

        // Dựa trên phân cấp URL
        const p = window.location.pathname.replace(/\\/g, '/');
        if (p.includes('/tech/') || p.includes('/life/')) {
            const afterCat = p.split(/\/(tech|life)\//)[2];
            if (afterCat && afterCat.trim() !== '' && afterCat !== 'index.html') {
                return '../../';
            }
            return '../';
        }
        return './';
    }

    const ROOT = resolveBlogRoot();
    const DATA = window.BLOG_DATA || { site: {}, categories: [], posts: [], ads: {} };

    // ────────────────────────────────────────────────────────────
    // 1.1 HÀM TẠO LOGO SVG ĐỘNG CHO leanhminh2104
    // ────────────────────────────────────────────────────────────
    function getLogoSvg(height = 36) {
        const width = Math.round(height * (268 / 42));
        return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 42" height="${height}" width="${width}" class="logo-svg-brand" aria-label="LEANHMINH2104" style="display:block; max-width:100%; height:auto; max-height:${height}px;">
          <defs>
            <filter id="c-lm-aura" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="2.4" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <filter id="c-lm-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.6" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <linearGradient id="c-lm-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="50%" stop-color="#a855f7"/>
              <stop offset="100%" stop-color="#f472b6"/>
            </linearGradient>
            <linearGradient id="c-ribbon-l" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#818cf8"/>
            </linearGradient>
            <linearGradient id="c-ribbon-m" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#c084fc">
                <animate attributeName="stop-color" values="#c084fc;#38bdf8;#f472b6;#c084fc" dur="6s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stop-color="#a855f7">
                <animate attributeName="stop-color" values="#a855f7;#818cf8;#c084fc;#a855f7" dur="6s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            <linearGradient id="c-full-wordmark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#38bdf8">
                <animate attributeName="stop-color" values="#38bdf8;#c084fc;#f472b6;#38bdf8" dur="7s" repeatCount="indefinite"/>
              </stop>
              <stop offset="35%" stop-color="#818cf8">
                <animate attributeName="stop-color" values="#818cf8;#38bdf8;#c084fc;#818cf8" dur="7s" repeatCount="indefinite"/>
              </stop>
              <stop offset="70%" stop-color="#c084fc">
                <animate attributeName="stop-color" values="#c084fc;#f472b6;#38bdf8;#c084fc" dur="7s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stop-color="#f472b6">
                <animate attributeName="stop-color" values="#f472b6;#a855f7;#38bdf8;#f472b6" dur="7s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
          <g transform="translate(3, 3)" class="brand-monogram">
            <rect x="0" y="0" width="36" height="36" rx="10" fill="#a855f7" opacity="0.35" filter="url(#c-lm-aura)"/>
            <rect x="0" y="0" width="36" height="36" rx="10" fill="#0d0f1f"/>
            <rect x="0" y="0" width="36" height="36" rx="10" fill="none" stroke="url(#c-lm-border)" stroke-width="1.5"/>
            <rect x="1.5" y="1.5" width="33" height="33" rx="8.5" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
            <g transform="translate(1, 0)">
              <path d="M 10 11.5 L 10 24.5 L 17 24.5" fill="none" stroke="url(#c-ribbon-l)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M 16.5 24.5 L 20 15 L 23.5 21.5 L 27 15 L 27 24.5" fill="none" stroke="url(#c-ribbon-m)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="23.5" cy="21.5" r="1.3" fill="#ffffff" opacity="0.95"/>
            </g>
          </g>
          <g transform="translate(48, 28)" class="brand-wordmark">
            <path d="M16.32 0L1.20 0L1.20-15.14L4.45-15.14L4.45-3.28L16.32-3.28L16.32 0M32.38 0L18.42 0L18.42-15.12L32.38-15.12L32.38-11.84L21.71-11.84L21.71-9.20L30.30-9.20L30.30-5.92L21.71-5.92L21.71-3.28L32.38-3.28L32.38 0M35.34 0L35.34-12.01Q35.34-12.87 35.76-13.58Q36.18-14.28 36.90-14.70Q37.61-15.12 38.45-15.12L47.33-15.12Q48.20-15.12 48.90-14.70Q49.60-14.28 50.03-13.58Q50.46-12.87 50.46-12.01L50.46 0L47.17 0L47.17-4.87L38.60-4.87L38.60 0L35.34 0M38.60-8.15L47.17-8.15L47.17-11.84Q47.17-11.84 47.17-11.84Q47.17-11.84 47.17-11.84L38.60-11.84Q38.60-11.84 38.60-11.84Q38.60-11.84 38.60-11.84L38.60-8.15M56.95 0L53.70 0L53.70-15.12L57.06-15.12L65.52-5.04L65.52-15.12L68.82-15.12L68.82 0L65.46 0L56.95-10.12L56.95 0M75.29 0L72.03 0L72.03-15.12L75.29-15.12L75.29-9.20L84.21-9.20L84.21-15.12L87.47-15.12L87.47 0L84.21 0L84.21-5.92L75.29-5.92L75.29 0M93.98 0L90.72 0L90.72-15.12L94.08-15.12L99.20-9.01L104.31-15.12L107.69-15.12L107.69 0L104.41 0L104.41-10.14L99.20-3.93L93.98-10.12L93.98 0M113.74 0L110.52 0L110.52-15.12L113.74-15.12L113.74 0M119.64 0L116.38 0L116.38-15.12L119.74-15.12L128.21-5.04L128.21-15.12L131.50-15.12L131.50 0L128.14 0L119.64-10.12L119.64 0M137.97 0L134.72 0L134.72-15.12L137.97-15.12L137.97-9.20L146.90-9.20L146.90-15.12L150.15-15.12L150.15 0L146.90 0L146.90-5.92L137.97-5.92L137.97 0M168.27 0L153.43 0L153.43-5.86Q153.43-6.70 153.85-7.39Q154.27-8.09 154.96-8.49Q155.65-8.90 156.49-8.90L165.06-8.90Q165.06-8.90 165.06-8.90Q165.06-8.90 165.06-8.90L165.06-11.91Q165.06-11.91 165.06-11.91Q165.06-11.91 165.06-11.91L156.64-11.91Q156.64-11.91 156.64-11.91Q156.64-11.91 156.64-11.91L156.64-10.69L153.43-10.69L153.43-12.08Q153.43-12.92 153.85-13.61Q154.27-14.30 154.96-14.71Q155.65-15.12 156.49-15.12L165.21-15.12Q166.05-15.12 166.74-14.71Q167.43-14.30 167.85-13.61Q168.27-12.92 168.27-12.08L168.27-8.74Q168.27-7.90 167.85-7.20Q167.43-6.51 166.74-6.09Q166.05-5.67 165.21-5.67L156.64-5.67Q156.64-5.67 156.64-5.67Q156.64-5.67 156.64-5.67L156.64-3.21Q156.64-3.21 156.64-3.21Q156.64-3.21 156.64-3.21L168.27-3.21L168.27 0M178.69 0L175.48 0L175.48-10.23L174.78-9.37L170.52-9.37L175.35-15.12L178.69-15.12L178.69 0M183.81 0Q182.97 0 182.28-0.47Q181.59-0.95 181.17-1.69Q180.75-2.44 180.75-3.26L180.75-11.99Q180.75-12.83 181.17-13.55Q181.59-14.26 182.28-14.69Q182.97-15.12 183.81-15.12L192.53-15.12Q193.37-15.12 194.06-14.69Q194.75-14.26 195.17-13.55Q195.59-12.83 195.59-11.99L195.59-3.26Q195.59-2.44 195.17-1.69Q194.75-0.95 194.06-0.47Q193.37 0 192.53 0L183.81 0M192.38-9.05L185.68-3.42L192.38-3.42Q192.38-3.42 192.38-3.42Q192.38-3.42 192.38-3.42L192.38-9.05M183.96-11.82L183.96-6.20L190.66-11.82L183.96-11.82Q183.96-11.82 183.96-11.82Q183.96-11.82 183.96-11.82M210.29 0L207.08 0L207.08-3.76L198.03-3.76L198.03-6.64L207.42-15.12L210.29-15.12L210.29-6.99L212.31-6.99L212.31-3.76L210.29-3.76L210.29 0M207.08-10.10L203.26-6.99L207.08-6.99" fill="url(#c-full-wordmark)" opacity="0.45" filter="url(#c-lm-glow)"/>
            <path d="M16.32 0L1.20 0L1.20-15.14L4.45-15.14L4.45-3.28L16.32-3.28L16.32 0M32.38 0L18.42 0L18.42-15.12L32.38-15.12L32.38-11.84L21.71-11.84L21.71-9.20L30.30-9.20L30.30-5.92L21.71-5.92L21.71-3.28L32.38-3.28L32.38 0M35.34 0L35.34-12.01Q35.34-12.87 35.76-13.58Q36.18-14.28 36.90-14.70Q37.61-15.12 38.45-15.12L47.33-15.12Q48.20-15.12 48.90-14.70Q49.60-14.28 50.03-13.58Q50.46-12.87 50.46-12.01L50.46 0L47.17 0L47.17-4.87L38.60-4.87L38.60 0L35.34 0M38.60-8.15L47.17-8.15L47.17-11.84Q47.17-11.84 47.17-11.84Q47.17-11.84 47.17-11.84L38.60-11.84Q38.60-11.84 38.60-11.84Q38.60-11.84 38.60-11.84L38.60-8.15M56.95 0L53.70 0L53.70-15.12L57.06-15.12L65.52-5.04L65.52-15.12L68.82-15.12L68.82 0L65.46 0L56.95-10.12L56.95 0M75.29 0L72.03 0L72.03-15.12L75.29-15.12L75.29-9.20L84.21-9.20L84.21-15.12L87.47-15.12L87.47 0L84.21 0L84.21-5.92L75.29-5.92L75.29 0M93.98 0L90.72 0L90.72-15.12L94.08-15.12L99.20-9.01L104.31-15.12L107.69-15.12L107.69 0L104.41 0L104.41-10.14L99.20-3.93L93.98-10.12L93.98 0M113.74 0L110.52 0L110.52-15.12L113.74-15.12L113.74 0M119.64 0L116.38 0L116.38-15.12L119.74-15.12L128.21-5.04L128.21-15.12L131.50-15.12L131.50 0L128.14 0L119.64-10.12L119.64 0M137.97 0L134.72 0L134.72-15.12L137.97-15.12L137.97-9.20L146.90-9.20L146.90-15.12L150.15-15.12L150.15 0L146.90 0L146.90-5.92L137.97-5.92L137.97 0M168.27 0L153.43 0L153.43-5.86Q153.43-6.70 153.85-7.39Q154.27-8.09 154.96-8.49Q155.65-8.90 156.49-8.90L165.06-8.90Q165.06-8.90 165.06-8.90Q165.06-8.90 165.06-8.90L165.06-11.91Q165.06-11.91 165.06-11.91Q165.06-11.91 165.06-11.91L156.64-11.91Q156.64-11.91 156.64-11.91Q156.64-11.91 156.64-11.91L156.64-10.69L153.43-10.69L153.43-12.08Q153.43-12.92 153.85-13.61Q154.27-14.30 154.96-14.71Q155.65-15.12 156.49-15.12L165.21-15.12Q166.05-15.12 166.74-14.71Q167.43-14.30 167.85-13.61Q168.27-12.92 168.27-12.08L168.27-8.74Q168.27-7.90 167.85-7.20Q167.43-6.51 166.74-6.09Q166.05-5.67 165.21-5.67L156.64-5.67Q156.64-5.67 156.64-5.67Q156.64-5.67 156.64-5.67L156.64-3.21Q156.64-3.21 156.64-3.21Q156.64-3.21 156.64-3.21L168.27-3.21L168.27 0M178.69 0L175.48 0L175.48-10.23L174.78-9.37L170.52-9.37L175.35-15.12L178.69-15.12L178.69 0M183.81 0Q182.97 0 182.28-0.47Q181.59-0.95 181.17-1.69Q180.75-2.44 180.75-3.26L180.75-11.99Q180.75-12.83 181.17-13.55Q181.59-14.26 182.28-14.69Q182.97-15.12 183.81-15.12L192.53-15.12Q193.37-15.12 194.06-14.69Q194.75-14.26 195.17-13.55Q195.59-12.83 195.59-11.99L195.59-3.26Q195.59-2.44 195.17-1.69Q194.75-0.95 194.06-0.47Q193.37 0 192.53 0L183.81 0M192.38-9.05L185.68-3.42L192.38-3.42Q192.38-3.42 192.38-3.42Q192.38-3.42 192.38-3.42L192.38-9.05M183.96-11.82L183.96-6.20L190.66-11.82L183.96-11.82Q183.96-11.82 183.96-11.82Q183.96-11.82 183.96-11.82M210.29 0L207.08 0L207.08-3.76L198.03-3.76L198.03-6.64L207.42-15.12L210.29-15.12L210.29-6.99L212.31-6.99L212.31-3.76L210.29-3.76L210.29 0M207.08-10.10L203.26-6.99L207.08-6.99" fill="url(#c-full-wordmark)"/>
          </g>
        </svg>
        `;
    }

    // ────────────────────────────────────────────────────────────
    // 2. RENDER HEADER (PC & MOBILE TOPBAR)
    // ────────────────────────────────────────────────────────────
    function renderHeader() {
        let container = document.getElementById('site-header') || document.querySelector('.blog-topbar, .blog-header');
        if (!container) {
            container = document.createElement('header');
            container.className = 'blog-topbar';
            document.body.prepend(container);
        } else {
            container.className = 'blog-topbar';
        }

        const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
        const isHome = (currentPath === '/' || currentPath.endsWith('/blog/') || currentPath.endsWith('/blog'));

        // Sinh danh sách menu từ BLOG_DATA
        let navHtml = '';
        DATA.categories.forEach(cat => {
            const href = cat.slug === '' ? ROOT : `${ROOT}${cat.path}`;
            let isActive = false;
            if (cat.slug === '' && isHome) {
                isActive = true;
            } else if (cat.slug !== '' && currentPath.includes(`/${cat.slug}/`)) {
                isActive = true;
            }
            navHtml += `<a href="${href}" class="${isActive ? 'active' : ''}">${cat.name}</a>`;
        });

        container.innerHTML = `
            <div class="blog-header-inner">
                <!-- Logo leanhminh2104 (SVG Animated) -->
                <a href="${ROOT}" class="blog-logo" aria-label="leanhminh2104">
                    ${getLogoSvg(36)}
                </a>

                <!-- Desktop Navigation (Tự động từ dữ liệu) -->
                <nav class="blog-nav">
                    ${navHtml}
                </nav>

                <!-- Search Bar trên PC -->
                <div class="header-search-bar" id="pc-header-search-btn" title="Tìm kiếm bài viết (Phím tắt: Ctrl + K)">
                    <i class="fas fa-search header-search-icon"></i>
                    <span class="header-search-text">Tìm kiếm bài viết...</span>
                    <kbd class="search-kbd">Ctrl K</kbd>
                </div>

                <!-- Right Actions (Dành cho PC) -->
                <div class="topbar-actions">
                    <a href="${DATA.site.github || 'https://github.com/leanhminh2104'}" target="_blank" rel="noopener noreferrer" class="icon-btn" title="GitHub" aria-label="GitHub Profile">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        `;
    }

    // ────────────────────────────────────────────────────────────
    // 3. RENDER MOBILE BOTTOM DOCK (Nút chính giữa là TÌM KIẾM)
    // ────────────────────────────────────────────────────────────
    function renderMobileDock() {
        let container = document.getElementById('site-bottom-dock') || document.querySelector('.bottom-nav-wrapper');
        if (!container) {
            container = document.createElement('div');
            container.className = 'bottom-nav-wrapper';
            document.body.appendChild(container);
        } else {
            container.className = 'bottom-nav-wrapper';
        }

        const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
        const isHome = (currentPath === '/' || currentPath.endsWith('/blog/') || currentPath.endsWith('/blog'));
        const isTech = currentPath.includes('/tech/');
        const isLife = currentPath.includes('/life/');

        container.innerHTML = `
            <div class="bottom-nav-inner">
                <div class="bottom-nav-glass">
                    <div class="bottom-nav-gradients"></div>
                    <nav class="bottom-nav-menu">
                        <!-- Trang chủ -->
                        <a href="${ROOT}" class="nav-item ${isHome ? 'active' : ''}">
                            <i class="fas fa-house nav-icon"></i>
                            <span class="nav-text">Trang chủ</span>
                        </a>

                        <!-- Chuyên mục Công nghệ -->
                        <a href="${ROOT}tech/" class="nav-item ${isTech ? 'active' : ''}">
                            <i class="fas fa-code nav-icon"></i>
                            <span class="nav-text">Công nghệ</span>
                        </a>

                        <!-- Centered FAB Button: ĐỔI THÀNH NÚT TÌM KIẾM TRÊN MOBILE -->
                        <div class="fab-container">
                            <div class="fab-ping"></div>
                            <button type="button" class="fab-btn fab-search-trigger" id="fab-search-btn" title="Tìm kiếm bài viết" aria-label="Tìm kiếm">
                                <i class="fas fa-search"></i>
                            </button>
                            <div class="fab-placeholder"></div>
                            <span class="fab-text">Tìm kiếm</span>
                        </div>

                        <!-- Chuyên mục Cuộc sống -->
                        <a href="${ROOT}life/" class="nav-item ${isLife ? 'active' : ''}">
                            <i class="fas fa-heart nav-icon"></i>
                            <span class="nav-text">Cuộc sống</span>
                        </a>

                        <!-- Nút mở Menu Drawer -->
                        <button type="button" class="nav-item" id="open-drawer-btn" aria-label="Mở menu">
                            <i class="fas fa-bars nav-icon"></i>
                            <span class="nav-text">Menu</span>
                        </button>
                    </nav>
                </div>
            </div>
        `;
    }

    // ────────────────────────────────────────────────────────────
    // 4. RENDER MOBILE DRAWER (Menu trượt phía dưới)
    // ────────────────────────────────────────────────────────────
    function renderMobileDrawer() {
        let overlay = document.getElementById('mobile-drawer-overlay');
        let drawer = document.getElementById('mobile-drawer');

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'drawer-overlay';
            overlay.id = 'mobile-drawer-overlay';
            document.body.appendChild(overlay);
        }

        if (!drawer) {
            drawer = document.createElement('div');
            drawer.className = 'drawer-sheet';
            drawer.id = 'mobile-drawer';
            document.body.appendChild(drawer);
        }

        const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
        const isHome = (currentPath === '/' || currentPath.endsWith('/blog/') || currentPath.endsWith('/blog'));

        // Tạo danh sách category
        let catHtml = '';
        DATA.categories.forEach(cat => {
            const href = cat.slug === '' ? ROOT : `${ROOT}${cat.path}`;
            const isActive = (cat.slug === '' && isHome) || (cat.slug !== '' && currentPath.includes(`/${cat.slug}/`));
            catHtml += `
                <a href="${href}" class="drawer-item ${isActive ? 'active' : ''}">
                    <div class="drawer-item-icon" style="background: rgba(168,85,247,0.15); color: ${cat.color || 'var(--primary)'};">
                        <i class="fas ${cat.icon || 'fa-folder'}"></i>
                    </div>
                    <div class="drawer-item-text">
                        <div class="drawer-item-title">${cat.name}</div>
                        <div class="drawer-item-desc">${cat.desc || ''}</div>
                    </div>
                </a>
            `;
        });

        // Tạo bài viết mới nhất trong drawer
        let recentPostsHtml = '';
        DATA.posts.slice(0, 3).forEach(post => {
            recentPostsHtml += `
                <a href="${ROOT}${post.path}" class="drawer-item">
                    <div class="drawer-item-icon" style="background: rgba(99,102,241,0.15); color: #818cf8;">
                        <i class="fas ${post.icon || 'fa-file-lines'}"></i>
                    </div>
                    <div class="drawer-item-text">
                        <div class="drawer-item-title" style="font-size:0.86rem;">${post.title}</div>
                        <div class="drawer-item-desc">${post.categoryName} • ${post.readTime}</div>
                    </div>
                </a>
            `;
        });

        drawer.innerHTML = `
            <div class="drawer-header-sticky">
                <div class="drawer-handle"></div>
                <div class="drawer-head">
                    <a href="${ROOT}" class="blog-logo" aria-label="leanhminh2104" style="text-decoration:none;">
                        ${getLogoSvg(28)}
                    </a>
                    <button type="button" class="drawer-close-btn" id="close-drawer-btn" aria-label="Đóng menu">
                        <i class="fas fa-xmark"></i>
                    </button>
                </div>
            </div>
            <div class="drawer-body">
                <div class="drawer-section-label" style="padding-top: 0.2rem;">Chuyên mục</div>
                ${catHtml}

                <div class="drawer-divider"></div>
                <div class="drawer-section-label">Bài viết mới cập nhật</div>
                ${recentPostsHtml}

                <div class="drawer-divider"></div>
                <div class="drawer-section-label">Liên kết ngoài</div>
                <a href="${DATA.site.github || 'https://github.com/leanhminh2104'}" target="_blank" rel="noopener noreferrer" class="drawer-item">
                    <div class="drawer-item-icon" style="background:rgba(255,255,255,0.08); color:#94a3b8;">
                        <i class="fab fa-github"></i>
                    </div>
                    <div class="drawer-item-text">
                        <div class="drawer-item-title">GitHub</div>
                        <div class="drawer-item-desc">Mã nguồn & Dự án mã nguồn mở</div>
                    </div>
                </a>
            </div>
        `;
    }

    // ────────────────────────────────────────────────────────────
    // 5. RENDER SEARCH MODAL (Hệ thống tìm kiếm toàn năng)
    // ────────────────────────────────────────────────────────────
    function renderSearchModal() {
        if (document.getElementById('global-search-modal')) return;

        const modal = document.createElement('div');
        modal.className = 'search-modal-backdrop';
        modal.id = 'global-search-modal';
        modal.innerHTML = `
            <div class="search-modal-card">
                <div class="search-modal-header">
                    <i class="fas fa-search search-modal-icon"></i>
                    <input type="text" class="search-modal-input" id="global-search-input" placeholder="Gõ từ khóa tìm bài viết (tiêu đề, thẻ, nội dung)..." autocomplete="off" spellcheck="false">
                    <button type="button" class="search-modal-clear" id="search-modal-clear" style="display:none;" aria-label="Xóa từ khóa">
                        <i class="fas fa-circle-xmark"></i>
                    </button>
                    <button type="button" class="search-modal-close" id="search-modal-close" aria-label="Đóng tìm kiếm">
                        <kbd>ESC</kbd>
                    </button>
                </div>

                <!-- Category quick filters inside search -->
                <div class="search-filter-pills" id="search-filter-pills">
                    <button type="button" class="search-pill active" data-cat="all">Tất cả</button>
                    <button type="button" class="search-pill" data-cat="tech"><i class="fas fa-code"></i> Công nghệ</button>
                    <button type="button" class="search-pill" data-cat="life"><i class="fas fa-heart"></i> Cuộc sống</button>
                </div>

                <div class="search-results-info" id="search-results-info">
                    <span>Gợi ý các bài viết</span>
                    <span class="search-count" id="search-count">${DATA.posts.length} bài viết</span>
                </div>

                <div class="search-results-list" id="search-results-list">
                    <!-- Sẽ được fill bằng JavaScript -->
                </div>

                <div class="search-modal-footer">
                    <div class="search-footer-hint">
                        <span><kbd>↑</kbd> <kbd>↓</kbd> để chọn</span>
                        <span><kbd>↵</kbd> để mở</span>
                        <span><kbd>ESC</kbd> để thoát</span>
                    </div>
                    <div class="search-footer-brand">
                        <i class="fas fa-bolt" style="color:var(--primary);"></i> Tìm kiếm siêu tốc
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        setupSearchModalLogic();
    }

    function setupSearchModalLogic() {
        const modal = document.getElementById('global-search-modal');
        const input = document.getElementById('global-search-input');
        const clearBtn = document.getElementById('search-modal-clear');
        const closeBtn = document.getElementById('search-modal-close');
        const list = document.getElementById('search-results-list');
        const countEl = document.getElementById('search-count');
        const pills = document.querySelectorAll('.search-pill');

        let activeCat = 'all';

        function openSearch() {
            const drawer = document.getElementById('mobile-drawer');
            const overlay = document.getElementById('mobile-drawer-overlay');
            const drawerBtn = document.getElementById('open-drawer-btn');
            if (drawer) drawer.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
            if (drawerBtn) drawerBtn.classList.remove('active');

            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            setTimeout(() => input.focus(), 80);
            renderSearchResults(input.value.trim());
        }

        function closeSearch() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }

        // Bắt sự kiện mở search từ các nút
        document.addEventListener('click', (e) => {
            if (e.target.closest('#pc-header-search-btn') || 
                e.target.closest('#mobile-top-search-btn') || 
                e.target.closest('#fab-search-btn') ||
                e.target.closest('#drawer-search-btn')) {
                e.preventDefault();
                openSearch();
            }
        });

        // Phím tắt Ctrl + K / Cmd + K
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (modal.classList.contains('open')) {
                    closeSearch();
                } else {
                    openSearch();
                }
            } else if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeSearch();
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', closeSearch);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeSearch();
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                input.value = '';
                clearBtn.style.display = 'none';
                input.focus();
                renderSearchResults('');
            });
        }

        input.addEventListener('input', () => {
            clearBtn.style.display = input.value.length > 0 ? 'block' : 'none';
            renderSearchResults(input.value.trim());
        });

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeCat = pill.dataset.cat;
                renderSearchResults(input.value.trim());
            });
        });

        function renderSearchResults(query) {
            const q = query.toLowerCase();
            let matches = DATA.posts.filter(p => {
                const matchCat = (activeCat === 'all' || p.category === activeCat);
                if (!matchCat) return false;
                if (!q) return true;

                const matchTitle = p.title.toLowerCase().includes(q);
                const matchExcerpt = p.excerpt.toLowerCase().includes(q);
                const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
                return matchTitle || matchExcerpt || matchTags;
            });

            countEl.textContent = `${matches.length} bài viết`;

            if (matches.length === 0) {
                list.innerHTML = `
                    <div class="search-empty">
                        <i class="fas fa-search-minus search-empty-icon"></i>
                        <h4>Không tìm thấy bài viết phù hợp</h4>
                        <p>Hãy thử tìm bằng từ khóa khác như "laravel", "php", "mindset", hoặc "tips".</p>
                    </div>
                `;
                return;
            }

            list.innerHTML = matches.map(post => {
                const badgeColor = post.category === 'tech' ? 'badge-info' : 'badge-success';
                const tagsHtml = post.tags.map(t => `<span class="search-result-tag">#${t}</span>`).join('');
                return `
                    <a href="${ROOT}${post.path}" class="search-result-item">
                        <div class="search-result-icon">
                            <i class="fas ${post.icon || 'fa-file-lines'}"></i>
                        </div>
                        <div class="search-result-content">
                            <div class="search-result-meta">
                                <span class="badge ${badgeColor}">${post.categoryName}</span>
                                ${post.isNew ? '<span class="badge badge-warning">Mới</span>' : ''}
                                <span>${post.formattedDate}</span>
                                <span>• ${post.readTime}</span>
                            </div>
                            <h4 class="search-result-title">${highlightQuery(post.title, q)}</h4>
                            <p class="search-result-excerpt">${highlightQuery(post.excerpt, q)}</p>
                            <div class="search-result-tags">${tagsHtml}</div>
                        </div>
                        <div class="search-result-arrow">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </a>
                `;
            }).join('');
        }

        function highlightQuery(text, query) {
            if (!query) return text;
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }
    }

    // ────────────────────────────────────────────────────────────
    // 6. RENDER FOOTER (Chân trang chuyên nghiệp)
    // ────────────────────────────────────────────────────────────
    function renderFooter() {
        let footer = document.getElementById('site-footer') || document.querySelector('.blog-footer');
        if (!footer) {
            footer = document.createElement('footer');
            footer.className = 'blog-footer';
            document.body.appendChild(footer);
        } else {
            footer.className = 'blog-footer';
        }

        const catLinks = DATA.categories
            .filter(c => c.slug !== '')
            .map(c => `<li><a href="${ROOT}${c.path}"><i class="fas ${c.icon}"></i> ${c.name}</a></li>`)
            .join('');

        const postLinks = DATA.posts
            .slice(0, 3)
            .map(p => `<li><a href="${ROOT}${p.path}"><i class="fas fa-chevron-right"></i> ${p.title}</a></li>`)
            .join('');

        footer.innerHTML = `
            <div class="blog-container">
                <div class="footer-blog-card">
                    <!-- Top Section: Brand Info & Social Connect -->
                    <div class="footer-top-section">
                        <div class="footer-brand-info">
                            <a href="${ROOT}" class="blog-logo footer-logo" aria-label="leanhminh2104">
                                ${getLogoSvg(30)}
                            </a>
                            <p class="footer-bio-text">
                                ${DATA.site.tagline || 'Blog cá nhân chia sẻ kiến thức chuyên sâu về lập trình, tối ưu hóa hệ thống và hành trình làm nghề của Developer.'}
                            </p>
                        </div>
                        
                        <div class="footer-social-wrap">
                            <div class="footer-social-label">Kết nối cùng tác giả</div>
                            <div class="footer-social-pills">
                                <a href="${DATA.site.github || 'https://github.com/leanhminh2104'}" target="_blank" rel="noopener noreferrer" class="social-pill-link" title="GitHub Profile">
                                    <i class="fab fa-github"></i>
                                    <span>GitHub</span>
                                </a>
                                <a href="${DATA.site.facebook || '#'}" target="_blank" rel="noopener noreferrer" class="social-pill-link" title="Facebook">
                                    <i class="fab fa-facebook"></i>
                                    <span>Facebook</span>
                                </a>
                                <a href="mailto:${DATA.site.email || 'contact@leanhminh.dev'}" class="social-pill-link" title="Email liên hệ">
                                    <i class="fas fa-envelope"></i>
                                    <span>Email</span>
                                </a>
                                <a href="${ROOT}feed.xml" target="_blank" class="social-pill-link" title="RSS Feed 2.0">
                                    <i class="fas fa-rss"></i>
                                    <span>RSS</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="footer-divider-line"></div>

                    <!-- Bottom Section: Nav Links & Copyright -->
                    <div class="footer-bottom-section">
                        <nav class="footer-nav-menu" aria-label="Footer Navigation">
                            <a href="${ROOT}"><i class="fas fa-house"></i> Trang chủ</a>
                            <a href="${ROOT}tech/"><i class="fas fa-code"></i> Công nghệ</a>
                            <a href="${ROOT}life/"><i class="fas fa-heart"></i> Cuộc sống</a>
                            <a href="${ROOT}sitemap.xml" target="_blank"><i class="fas fa-sitemap"></i> Sitemap</a>
                        </nav>
                        
                        <div class="footer-copyright">
                            © ${DATA.site.year || 2026} <b>${DATA.site.author || 'Lê Anh Minh'}</b>. Thiết kế chuẩn phong cách Cyberpunk Glassmorphism.
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Nút nổi Lên đầu trang (Floating Back-to-Top Button)
    function renderBackToTop() {
        let btn = document.getElementById('back-to-top');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'back-to-top';
            btn.className = 'back-to-top';
            btn.setAttribute('type', 'button');
            btn.setAttribute('title', 'Cuộn lên đầu trang');
            btn.setAttribute('aria-label', 'Cuộn lên đầu trang');
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(btn);
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 280) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ────────────────────────────────────────────────────────────
    // 7. RENDER QUẢNG CÁO & TIẾP THỊ LIÊN KẾT ĐA NGUỒN TẬP TRUNG
    // (Shopee, TikTok Shop, Google AdSense, Tài trợ & Custom HTML)
    // ────────────────────────────────────────────────────────────
    window.renderBlogAds = function () {
        if (!DATA.ads || !DATA.ads.enabled || !DATA.ads.banners || !DATA.ads.banners.length) return;

        // 1. Tự động nạp thư viện Google AdSense nếu có cấu hình Publisher ID
        if (DATA.ads.adsensePublisherId && !document.getElementById('adsense-core-script')) {
            const adScript = document.createElement('script');
            adScript.id = 'adsense-core-script';
            adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${DATA.ads.adsensePublisherId}`;
            adScript.async = true;
            adScript.crossOrigin = 'anonymous';
            document.head.appendChild(adScript);
        }

        // 2. Tự động chèn vị trí quảng cáo vào bài viết nếu bài chưa gắn thẻ (Auto-Inject)
        if (DATA.ads.autoInjectInArticles !== false) {
            const articleContent = document.querySelector('.article-content, article');
            const aside = document.querySelector('.article-sidebar');

            if (articleContent) {
                // Tự động chèn slot cuối bài (trước bình luận)
                if (!document.querySelector('.ad-slot-container[data-slot="article-bottom"], .ad-slot-container[data-slot="article"]')) {
                    const commentsSection = document.querySelector('.article-comments-section');
                    const postNav = document.querySelector('.post-nav');
                    const bottomSlot = document.createElement('div');
                    bottomSlot.className = 'ad-slot-container';
                    bottomSlot.setAttribute('data-slot', 'article-bottom');
                    bottomSlot.style.margin = '2.5rem 0 1.5rem';

                    if (postNav) {
                        postNav.parentNode.insertBefore(bottomSlot, postNav);
                    } else if (commentsSection) {
                        commentsSection.parentNode.insertBefore(bottomSlot, commentsSection);
                    } else {
                        articleContent.appendChild(bottomSlot);
                    }
                }

                // Tự động chèn slot giữa bài (trước thẻ h2 thứ 3 nếu bài dài)
                if (!document.querySelector('.ad-slot-container[data-slot="article-mid"]')) {
                    const headings = articleContent.querySelectorAll('h2');
                    if (headings.length >= 3) {
                        const midSlot = document.createElement('div');
                        midSlot.className = 'ad-slot-container';
                        midSlot.setAttribute('data-slot', 'article-mid');
                        midSlot.style.margin = '2.5rem 0';
                        headings[2].parentNode.insertBefore(midSlot, headings[2]);
                    }
                }
            }

            // Tự động chèn slot sidebar nếu chưa có
            if (aside && !document.getElementById('sidebar-ad-slot')) {
                const sidebarSlot = document.createElement('div');
                sidebarSlot.id = 'sidebar-ad-slot';
                sidebarSlot.style.marginTop = '1.5rem';
                aside.appendChild(sidebarSlot);
            }
        }

        // 3. Hàm tạo HTML cho từng loại quảng cáo
        function buildAdCardHtml(banner, isSidebar = false) {
            const platform = banner.platform || 'sponsor';

            // A. Quảng cáo Google AdSense
            if (platform === 'adsense') {
                if (DATA.ads.adsensePublisherId) {
                    setTimeout(() => {
                        try {
                            (window.adsbygoogle = window.adsbygoogle || []).push({});
                        } catch (_) {}
                    }, 200);
                    return `
                        <div class="blog-ad-card platform-adsense ${isSidebar ? 'sidebar-ad-card' : ''} slot-${banner.slot || 'custom'}">
                            <div class="ad-card-badge">${banner.badge || 'Quảng cáo Google'}</div>
                            <ins class="adsbygoogle"
                                style="display:block"
                                data-ad-client="${DATA.ads.adsensePublisherId}"
                                data-ad-slot="${banner.adSlot || ''}"
                                data-ad-format="auto"
                                data-full-width-responsive="true"></ins>
                        </div>
                    `;
                } else {
                    return ''; // Chưa điền Publisher ID thì không hiển thị placeholder
                }
            }

            // B. Mã nhúng HTML / Iframe tùy chỉnh (AccessTrade, MasOffer, Ezoic, ...)
            if (platform === 'html' && banner.html) {
                return `
                    <div class="blog-ad-card platform-html ${isSidebar ? 'sidebar-ad-card' : ''} slot-${banner.slot || 'custom'}">
                        ${banner.badge ? `<div class="ad-card-badge">${banner.badge}</div>` : ''}
                        <div class="ad-html-content">${banner.html}</div>
                    </div>
                `;
            }

            // C. Thẻ tiếp thị liên kết (Shopee, TikTok Shop, Sponsor, Khóa học)
            const defaultIcon = platform === 'shopee' ? 'fa-bag-shopping' : (platform === 'tiktok' ? 'fa-tiktok' : (banner.icon || 'fa-star'));
            const isBrandIcon = platform === 'tiktok';
            const iconPrefix = isBrandIcon ? 'fab' : 'fas';

            const pricingHtml = banner.price ? `
                <div class="ad-card-pricing">
                    <span class="ad-price-sale">${banner.price}</span>
                    ${banner.originalPrice ? `<span class="ad-price-old">${banner.originalPrice}</span>` : ''}
                    ${banner.discount ? `<span class="ad-discount-tag">${banner.discount}</span>` : ''}
                </div>
            ` : '';

            const iconHtml = banner.imageUrl 
                ? `<img src="${banner.imageUrl}" alt="${banner.title}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`
                : `<i class="${iconPrefix} ${banner.icon || defaultIcon}"></i>`;

            const defaultBadge = platform === 'shopee' ? 'Shopee Deal' : (platform === 'tiktok' ? 'TikTok Shop' : 'Tài trợ');
            const defaultCta = platform === 'shopee' ? 'Săn Deal Shopee' : (platform === 'tiktok' ? 'Mua Trên TikTok Shop' : 'Khám Phá Ngay');

            return `
                <div class="blog-ad-card platform-${platform} ${isSidebar ? 'sidebar-ad-card' : ''} slot-${banner.slot || 'custom'}">
                    <div class="ad-card-badge">${banner.badge || defaultBadge}</div>
                    <div class="ad-card-inner">
                        <div class="ad-card-icon" style="color:${banner.accentColor || 'var(--primary)'};">
                            ${iconHtml}
                        </div>
                        <div class="ad-card-content">
                            <h4 class="ad-card-title">${banner.title}</h4>
                            <p class="ad-card-desc">${banner.desc || ''}</p>
                            ${pricingHtml}
                        </div>
                        <a href="${banner.link}" target="_blank" rel="noopener noreferrer sponsored" class="ad-card-cta">
                            <span>${banner.ctaText || defaultCta}</span>
                            <i class="fas fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            `;
        }

        // 4. Lấy banner phù hợp theo Slot & Xoay vòng (Rotation) ngẫu nhiên nếu có nhiều deal
        function pickBannerForSlot(slotName, adId = null) {
            const activeBanners = DATA.ads.banners.filter(b => {
                if (b.active === false) return false;
                if (b.platform === 'adsense' && !DATA.ads.adsensePublisherId) return false;
                return true;
            });
            if (!activeBanners.length) return null;

            if (adId) {
                return activeBanners.find(b => b.id === adId) || null;
            }

            // Lọc các banner khớp slot (hỗ trợ cả mảng các slot hoặc slot chuỗi)
            const matches = activeBanners.filter(b => {
                const slots = Array.isArray(b.slot) ? b.slot : [b.slot];
                if (slots.includes(slotName) || slots.includes('all')) return true;
                if (slotName === 'article-bottom' && (slots.includes('article') || slots.includes('sidebar'))) return true;
                if (slotName === 'article' && (slots.includes('article-bottom') || slots.includes('article'))) return true;
                if (slotName === 'article-mid' && (slots.includes('article') || slots.includes('all'))) return true;
                return false;
            });

            if (matches.length > 0) {
                // Xoay vòng ngẫu nhiên để độc giả xem các deal khác nhau
                const randomIndex = Math.floor(Math.random() * matches.length);
                return matches[randomIndex];
            }

            return activeBanners[0];
        }

        // 5. Render vào các thẻ .ad-slot-container trong trang
        document.querySelectorAll('.ad-slot-container').forEach(container => {
            const adId = container.dataset.adId;
            const slot = container.dataset.slot || 'feed';
            const banner = pickBannerForSlot(slot, adId);
            if (!banner) return;
            container.innerHTML = buildAdCardHtml(banner, slot === 'sidebar');
        });

        // 6. Render vào vị trí Sidebar mặc định trong bài viết
        const sidebarSlot = document.getElementById('sidebar-ad-slot');
        if (sidebarSlot && !sidebarSlot.hasChildNodes()) {
            const sidebarBanner = pickBannerForSlot('sidebar') || 
                DATA.ads.banners.find(b => b.platform === 'tiktok' || b.platform === 'shopee') || 
                DATA.ads.banners[0];
            if (sidebarBanner) {
                sidebarSlot.innerHTML = buildAdCardHtml(sidebarBanner, true);
            }
        }

        // 7. Khởi tạo Popup Quảng Cáo Nổi (Floating Popup Ad - 30 phút / 1 lần)
        initPopupAd();

        function initPopupAd() {
            const popupConfig = DATA.ads.popup;
            if (!popupConfig || popupConfig.enabled === false) return;
            if (document.getElementById('blog-ad-popup-modal')) return;

            const STORAGE_KEY = 'blog_ad_popup_last_shown';
            const intervalMinutes = typeof popupConfig.intervalMinutes === 'number' ? popupConfig.intervalMinutes : 30;
            const intervalMs = intervalMinutes * 60 * 1000;
            const now = Date.now();
            const lastShown = localStorage.getItem(STORAGE_KEY);

            if (lastShown) {
                const elapsed = now - parseInt(lastShown, 10);
                if (!isNaN(elapsed) && elapsed < intervalMs) {
                    return; // Chưa đủ 30 phút kể từ lần hiển thị trước
                }
            }

            // Chọn banner cho popup (ưu tiên bannerId hoặc banner có slot popup / deal hot)
            let banner = null;
            if (popupConfig.bannerId) {
                banner = pickBannerForSlot('popup', popupConfig.bannerId);
            }
            if (!banner) {
                banner = pickBannerForSlot('popup') || 
                         DATA.ads.banners.find(b => (b.platform === 'shopee' || b.platform === 'tiktok') && b.active !== false) || 
                         DATA.ads.banners.find(b => b.active !== false);
            }
            if (!banner) return;

            const delaySec = typeof popupConfig.delaySeconds === 'number' ? popupConfig.delaySeconds : 3;

            setTimeout(() => {
                if (document.getElementById('blog-ad-popup-modal')) return;

                const platform = banner.platform || 'sponsor';
                const defaultIcon = platform === 'shopee' ? 'fa-bag-shopping' : (platform === 'tiktok' ? 'fa-tiktok' : (banner.icon || 'fa-fire'));
                const isBrandIcon = platform === 'tiktok';
                const iconPrefix = isBrandIcon ? 'fab' : 'fas';
                const defaultBadge = platform === 'shopee' ? 'Shopee Deal' : (platform === 'tiktok' ? 'TikTok Shop' : 'Hot Deal');
                const defaultCta = platform === 'shopee' ? 'Săn Deal Ngay' : (platform === 'tiktok' ? 'Mua Trên TikTok Shop' : 'Khám Phá Ngay');

                const pricingHtml = banner.price ? `
                    <div class="ad-popup-pricing">
                        <span class="ad-popup-price">${banner.price}</span>
                        ${banner.originalPrice ? `<span class="ad-popup-old-price">${banner.originalPrice}</span>` : ''}
                        ${banner.discount ? `<span class="ad-popup-discount">${banner.discount}</span>` : ''}
                    </div>
                ` : '';

                const iconHtml = banner.imageUrl 
                    ? `<img src="${banner.imageUrl}" alt="${banner.title}" class="ad-popup-thumb">`
                    : `<div class="ad-popup-icon-wrap" style="color:${banner.accentColor || 'var(--primary-hover)'};"><i class="${iconPrefix} ${banner.icon || defaultIcon}"></i></div>`;

                const modal = document.createElement('div');
                modal.id = 'blog-ad-popup-modal';
                modal.className = `blog-ad-popup-backdrop platform-${platform}`;
                modal.setAttribute('role', 'dialog');
                modal.setAttribute('aria-modal', 'true');

                modal.innerHTML = `
                    <div class="ad-popup-card animate-popup">
                        <div class="ad-popup-glow"></div>
                        
                        <div class="ad-popup-header">
                            <div class="ad-popup-badges">
                                <span class="ad-popup-badge ${platform}">${banner.badge || defaultBadge}</span>
                                <span class="ad-popup-live-indicator"><span class="live-dot"></span> Đang có ưu đãi</span>
                            </div>
                            <button type="button" class="ad-popup-close-btn" id="ad-popup-close-btn" title="Đóng quảng cáo" aria-label="Đóng quảng cáo">
                                <i class="fas fa-xmark"></i>
                            </button>
                        </div>

                        <div class="ad-popup-body">
                            ${iconHtml}
                            <div class="ad-popup-info">
                                <h3 class="ad-popup-title">${banner.title}</h3>
                                <p class="ad-popup-desc">${banner.desc || ''}</p>
                                ${pricingHtml}
                            </div>
                        </div>

                        <div class="ad-popup-actions">
                            <a href="${banner.link || '#'}" target="_blank" rel="noopener noreferrer sponsored" class="ad-popup-cta-btn" id="ad-popup-cta-btn">
                                <span>${banner.ctaText || defaultCta}</span>
                                <i class="fas fa-arrow-up-right-from-square"></i>
                            </a>
                            <button type="button" class="ad-popup-dismiss-text" id="ad-popup-dismiss-btn">
                                Bỏ qua ưu đãi này
                            </button>
                        </div>
                    </div>
                `;

                document.body.appendChild(modal);
                // Lưu thời điểm hiển thị vào localStorage
                localStorage.setItem(STORAGE_KEY, Date.now().toString());

                function closePopup() {
                    modal.classList.add('closing');
                    setTimeout(() => {
                        if (modal.parentNode) modal.parentNode.removeChild(modal);
                    }, 300);
                }

                const closeBtn = modal.querySelector('#ad-popup-close-btn');
                const dismissBtn = modal.querySelector('#ad-popup-dismiss-btn');
                const ctaBtn = modal.querySelector('#ad-popup-cta-btn');

                if (closeBtn) closeBtn.addEventListener('click', closePopup);
                if (dismissBtn) dismissBtn.addEventListener('click', closePopup);
                if (ctaBtn) {
                    ctaBtn.addEventListener('click', () => {
                        setTimeout(closePopup, 300);
                    });
                }

                const onEsc = (e) => {
                    if (e.key === 'Escape') {
                        closePopup();
                        document.removeEventListener('keydown', onEsc);
                    }
                };
                document.addEventListener('keydown', onEsc);

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closePopup();
                });
            }, delaySec * 1000);
        }
    };

    // ────────────────────────────────────────────────────────────
    // 8. TỰ ĐỘNG LẤY THỐNG KÊ GITHUB & BÌNH LUẬN GISCUS
    // ────────────────────────────────────────────────────────────
    function fetchGitHubStats() {
        const el = document.getElementById('gh-stats-val');
        if (!el) return;
        try {
            const cached = sessionStorage.getItem('gh_repos_count');
            if (cached) {
                el.textContent = `${cached} Repos`;
                return;
            }
            fetch('https://api.github.com/users/leanhminh2104')
                .then(res => res.json())
                .then(d => {
                    if (d && typeof d.public_repos === 'number') {
                        el.textContent = `${d.public_repos} Repos`;
                        sessionStorage.setItem('gh_repos_count', d.public_repos);
                    }
                })
                .catch(() => {});
        } catch (_) {}
    }

    function initGiscusComments() {
        const el = document.getElementById('comments');
        if (!el) return;

        const config = (DATA && DATA.comments) || {};
        if (config.enabled === false) {
            const section = el.closest('.article-comments-section');
            if (section) section.style.display = 'none';
            return;
        }

        const repo = config.repo || 'leanhminh2104/leanhminh2104.github.io';
        const hasGiscusCategory = Boolean(config.categoryId && config.categoryId.trim() !== '');

        // 1. Chỉ hiển thị liên kết kiểm duyệt khi có tham số ?admin trên URL, khách bình thường sẽ KHÔNG THẤY bất kỳ bảng nào
        const isAdmin = new URLSearchParams(window.location.search).has('admin');
        el.innerHTML = `
            ${isAdmin ? `
            <div style="margin-bottom: 0.75rem; text-align: right;">
                <a href="https://github.com/${repo}/${hasGiscusCategory ? 'discussions' : 'issues'}" target="_blank" rel="noopener noreferrer" class="comments-admin-link" style="font-size: 0.76rem; color: var(--primary-light);">
                    <i class="fas fa-user-shield"></i> Quản lý bình luận trên GitHub (Admin) <i class="fas fa-arrow-up-right-from-square"></i>
                </a>
            </div>` : ''}
            <div class="comments-glass-panel">
                <div id="github-comments-embed"></div>
            </div>
        `;

        const embedContainer = el.querySelector('#github-comments-embed');
        if (!embedContainer) return;

        // 2. Nạp script bình luận GitHub (Giscus nếu có categoryId, ngược lại nạp Utterances)
        if (hasGiscusCategory) {
            if (document.getElementById('giscus-client-script')) return;
            const script = document.createElement('script');
            script.id = 'giscus-client-script';
            script.src = 'https://giscus.app/client.js';
            script.setAttribute('data-repo', repo);
            script.setAttribute('data-repo-id', config.repoId || 'R_kgDOPJsGaQ');
            script.setAttribute('data-category', config.category || 'General');
            script.setAttribute('data-category-id', config.categoryId);
            script.setAttribute('data-mapping', config.mapping || 'pathname');
            script.setAttribute('data-strict', config.strict || '0');
            script.setAttribute('data-reactions-enabled', config.reactionsEnabled || '1');
            script.setAttribute('data-emit-metadata', config.emitMetadata || '0');
            script.setAttribute('data-input-position', config.inputPosition || 'top');
            script.setAttribute('data-theme', config.theme || 'transparent_dark');
            script.setAttribute('data-lang', config.lang || 'vi');
            script.setAttribute('crossorigin', 'anonymous');
            script.async = true;
            embedContainer.appendChild(script);
        } else {
            // Nạp Utterances qua GitHub Issues (dùng theme github-dark kết hợp mix-blend-mode screen để nền trong suốt nhìn xuyên thấu sao trời)
            if (document.getElementById('utterances-client-script')) return;
            const script = document.createElement('script');
            script.id = 'utterances-client-script';
            script.src = 'https://utteranc.es/client.js';
            script.setAttribute('repo', repo);
            script.setAttribute('issue-term', config.mapping || 'pathname');
            script.setAttribute('label', '💬 blog-comment');
            script.setAttribute('theme', 'github-dark');
            script.setAttribute('crossorigin', 'anonymous');
            script.async = true;
            embedContainer.appendChild(script);
        }
    }

    // ────────────────────────────────────────────────────────────
    // 9. TỰ ĐỘNG KHỞI TẠO TẤT CẢ COMPONENT KHI TRANG TẢI XONG
    // ────────────────────────────────────────────────────────────
    function initBlogComponents() {
        renderHeader();
        renderMobileDrawer();
        renderSearchModal();
        renderMobileDock();
        renderFooter();
        renderBackToTop();
        window.renderBlogAds();
        setupDrawerDelegation();
        fetchGitHubStats();
        initGiscusComments();
    }

    function setupDrawerDelegation() {
        document.addEventListener('click', (e) => {
            const openTrigger = e.target.closest('#hamburger-btn, #open-drawer-btn');
            if (openTrigger) {
                e.preventDefault();
                e.stopPropagation();
                const overlay = document.getElementById('mobile-drawer-overlay');
                const drawer = document.getElementById('mobile-drawer');
                if (!drawer) return;
                const isOpen = drawer.classList.contains('open');

                if (isOpen && openTrigger.id === 'open-drawer-btn') {
                    // Nếu đang mở mà nhấn lại nút Menu ở bottom dock thì đóng lại
                    if (overlay) overlay.classList.remove('open');
                    drawer.classList.remove('open');
                    openTrigger.classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    if (overlay) overlay.classList.add('open');
                    drawer.classList.add('open');
                    if (openTrigger.id === 'open-drawer-btn') {
                        openTrigger.classList.add('active');
                    }
                    document.body.style.overflow = 'hidden';
                }
                return;
            }

            if (e.target.closest('#close-drawer-btn, #mobile-drawer-overlay, .drawer-item')) {
                const overlay = document.getElementById('mobile-drawer-overlay');
                const drawer = document.getElementById('mobile-drawer');
                const drawerBtn = document.getElementById('open-drawer-btn');
                if (overlay) overlay.classList.remove('open');
                if (drawer) drawer.classList.remove('open');
                if (drawerBtn) drawerBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const overlay = document.getElementById('mobile-drawer-overlay');
                const drawer = document.getElementById('mobile-drawer');
                const drawerBtn = document.getElementById('open-drawer-btn');
                if (overlay) overlay.classList.remove('open');
                if (drawer) drawer.classList.remove('open');
                if (drawerBtn) drawerBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlogComponents);
    } else {
        initBlogComponents();
    }

    // Xuất ra window để các trang có thể gọi lại nếu cần
    window.BlogComponents = {
        init: initBlogComponents,
        renderHeader,
        renderMobileDock,
        renderMobileDrawer,
        renderSearchModal,
        renderFooter,
        renderAds: window.renderBlogAds,
        getRoot: () => ROOT
    };
})();
