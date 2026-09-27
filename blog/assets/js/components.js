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
                <!-- Logo -->
                <a href="${ROOT}" class="blog-logo">
                    <div class="blog-logo-icon">
                        <i class="fas fa-pen-nib"></i>
                    </div>
                    <span>${DATA.site.name || 'leanhminh'}</span>
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
            <div class="drawer-handle"></div>
            <div class="drawer-head">
                <div style="display:flex; align-items:center; gap:0.6rem;">
                    <div class="blog-logo-icon" style="width:30px; height:30px; font-size:0.8rem;">
                        <i class="fas fa-pen-nib"></i>
                    </div>
                    <span style="font-weight:700; font-size:0.95rem; color:#fff;">${DATA.site.name || 'leanhminh'}</span>
                </div>
                <button type="button" class="drawer-close-btn" id="close-drawer-btn" aria-label="Đóng menu">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
            <div class="drawer-body">
                <!-- Search Button inside Drawer -->
                <button type="button" class="drawer-search-trigger" id="drawer-search-btn">
                    <i class="fas fa-search"></i>
                    <span>Tìm kiếm toàn bộ bài viết...</span>
                </button>

                <div class="drawer-section-label">Chuyên mục</div>
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
                <div class="footer-grid">
                    <!-- Cột 1: Thông tin Blog -->
                    <div class="footer-col brand-col">
                        <div class="blog-logo" style="margin-bottom:0.8rem;">
                            <div class="blog-logo-icon">
                                <i class="fas fa-pen-nib"></i>
                            </div>
                            <span>${DATA.site.name || 'leanhminh'}</span>
                        </div>
                        <p class="footer-desc">
                            ${DATA.site.tagline || 'Chia sẻ kinh nghiệm lập trình, kiến trúc hệ thống và cuộc sống của Developer.'}
                        </p>
                        <div class="footer-socials">
                            <a href="${DATA.site.github || 'https://github.com/leanhminh2104'}" target="_blank" rel="noopener noreferrer" class="social-icon" title="GitHub Profile">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="${DATA.site.facebook || '#'}" target="_blank" rel="noopener noreferrer" class="social-icon" title="Facebook">
                                <i class="fab fa-facebook"></i>
                            </a>
                            <a href="mailto:${DATA.site.email || 'contact@leanhminh.dev'}" class="social-icon" title="Email Liên Hệ">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Cột 2: Danh mục -->
                    <div class="footer-col">
                        <h4 class="footer-heading">Chuyên Mục</h4>
                        <ul class="footer-links">
                            <li><a href="${ROOT}"><i class="fas fa-house"></i> Trang chủ</a></li>
                            ${catLinks}
                        </ul>
                    </div>

                    <!-- Cột 3: Bài viết mới -->
                    <div class="footer-col">
                        <h4 class="footer-heading">Bài Viết Mới</h4>
                        <ul class="footer-links recent-posts-links">
                            ${postLinks}
                        </ul>
                    </div>

                    <!-- Cột 4: Thống kê & Công nghệ -->
                    <div class="footer-col">
                        <h4 class="footer-heading">Công Nghệ</h4>
                        <p class="footer-desc" style="font-size:0.82rem;">
                            100% Static HTML5, CSS3 Glassmorphism & Vanilla JavaScript. Host siêu tốc trên GitHub Pages.
                        </p>
                        <div class="footer-stats-chips">
                            <span class="stat-chip"><i class="fas fa-file-lines"></i> ${DATA.posts.length} Bài viết</span>
                            <span class="stat-chip"><i class="fas fa-folder"></i> ${DATA.categories.length - 1} Chuyên mục</span>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-copy">
                        © ${DATA.site.year || 2026} <b>${DATA.site.author || 'Lê Anh Minh'}</b>. Thiết kế với phong cách Cyberpunk Glassmorphism.
                    </div>
                    <button type="button" class="footer-back-to-top" id="footer-back-to-top" title="Cuộn lên đầu trang">
                        <span>Lên đầu trang</span>
                        <i class="fas fa-arrow-up"></i>
                    </button>
                </div>
            </div>
        `;

        const backTop = document.getElementById('footer-back-to-top');
        if (backTop) {
            backTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // ────────────────────────────────────────────────────────────
    // 7. RENDER QUẢNG CÁO & SPONSOR BANNERS
    // ────────────────────────────────────────────────────────────
    window.renderBlogAds = function () {
        if (!DATA.ads || !DATA.ads.enabled) return;

        document.querySelectorAll('.ad-slot-container').forEach(container => {
            const slot = container.dataset.slot || 'feed';
            const banner = DATA.ads.banners.find(b => b.slot === slot) || DATA.ads.banners[0];
            if (!banner) return;

            container.innerHTML = `
                <div class="blog-ad-card slot-${slot}">
                    <div class="ad-card-badge">${banner.badge || 'Tài trợ'}</div>
                    <div class="ad-card-inner">
                        <div class="ad-card-icon" style="color:${banner.accentColor || 'var(--primary)'};">
                            <i class="fas ${banner.icon || 'fa-star'}"></i>
                        </div>
                        <div class="ad-card-content">
                            <h4 class="ad-card-title">${banner.title}</h4>
                            <p class="ad-card-desc">${banner.desc}</p>
                        </div>
                        <a href="${banner.link}" target="_blank" rel="noopener noreferrer sponsored" class="ad-card-cta">
                            <span>${banner.ctaText || 'Xem ngay'}</span>
                            <i class="fas fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            `;
        });
    };

    // ────────────────────────────────────────────────────────────
    // 8. TỰ ĐỘNG KHỞI TẠO TẤT CẢ COMPONENT KHI TRANG TẢI XONG
    // ────────────────────────────────────────────────────────────
    function initBlogComponents() {
        renderHeader();
        renderMobileDock();
        renderMobileDrawer();
        renderSearchModal();
        renderFooter();
        window.renderBlogAds();
        setupDrawerDelegation();
    }

    function setupDrawerDelegation() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#hamburger-btn, #open-drawer-btn')) {
                e.preventDefault();
                const overlay = document.getElementById('mobile-drawer-overlay');
                const drawer = document.getElementById('mobile-drawer');
                if (overlay) overlay.classList.add('open');
                if (drawer) drawer.classList.add('open');
                document.body.style.overflow = 'hidden';
            }

            if (e.target.closest('#close-drawer-btn, #mobile-drawer-overlay, .drawer-item')) {
                const overlay = document.getElementById('mobile-drawer-overlay');
                const drawer = document.getElementById('mobile-drawer');
                if (overlay) overlay.classList.remove('open');
                if (drawer) drawer.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const overlay = document.getElementById('mobile-drawer-overlay');
                const drawer = document.getElementById('mobile-drawer');
                if (overlay) overlay.classList.remove('open');
                if (drawer) drawer.classList.remove('open');
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
