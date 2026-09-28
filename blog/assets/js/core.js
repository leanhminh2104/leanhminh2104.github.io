/**
 * DaLyMMO Blog Core JS
 * Dùng chung cho tất cả trang: index, category, article
 * Không dependency, tối ưu hiệu năng và tương thích 100%
 */

// ============================================================
// 1. Mobile Navigation & Drawer (Sheet)
// ============================================================
function initMobileNav() {
    // Đã được quản lý tập trung và toàn diện bởi components.js (setupDrawerDelegation)
    // Không đăng ký trùng lặp ở đây để tránh xung đột sự kiện đóng/mở
}

// ============================================================
// 2. Active Nav Link (Desktop & Bottom Nav)
// ============================================================
function initActiveNavLink() {
    const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    const isHome = (currentPath === '/' || currentPath.endsWith('/blog/') || currentPath.endsWith('/blog') || currentPath.endsWith('/blog/index.html'));

    document.querySelectorAll('.blog-nav a, .bottom-nav-menu .nav-item').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href === '#') return;

        const isLinkHome = (href === './' || href === '/' || href.endsWith('/blog/') || href.endsWith('/blog'));

        if (isHome && isLinkHome) {
            link.classList.add('active');
        } else if (!isHome) {
            const cleanHref = href.replace(/^\.\.\//, '').replace(/^\.\//, '').replace(/^\//, '').replace(/\/$/, '');
            if (cleanHref && currentPath.includes(cleanHref)) {
                link.classList.add('active');
            }
        }
    });
}

// ============================================================
// 3. Scroll Reveal Animation
// ============================================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('in');
                    entry.target.classList.add('visible');
                }, i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================
// 4. Back to Top
// ============================================================
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// 5. Reading Progress (dành cho trang bài viết)
// ============================================================
function initReadingProgress() {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docH > 0 ? (window.scrollY / docH) * 100 : 0;
        bar.style.width = Math.min(progress, 100) + '%';
    }, { passive: true });
}

// ============================================================
// 6. Table of Contents — Auto generate & Scrollspy
// ============================================================
function initTOC() {
    const tocList = document.getElementById('toc-list');
    const article = document.querySelector('.article-body, .article-content');
    if (!tocList || !article) return;

    const headings = article.querySelectorAll('h2, h3');
    if (headings.length === 0) {
        const tocCard = document.getElementById('toc-card');
        if (tocCard) tocCard.style.display = 'none';
        return;
    }

    tocList.innerHTML = '';
    headings.forEach((h, idx) => {
        if (!h.id) {
            h.id = 'sec-' + idx + '-' + h.textContent.trim().toLowerCase()
                .replace(/[^a-z0-9\u00C0-\u024F]+/gi, '-').replace(/^-|-$/g, '');
        }

        const li = document.createElement('li');
        li.className = (h.tagName === 'H3' ? 'toc-h3' : 'toc-h2');
        li.dataset.id = h.id;

        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.getElementById(h.id);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', '#' + h.id);
            }
        });

        li.appendChild(a);
        tocList.appendChild(li);
    });

    const tocItems = tocList.querySelectorAll('li');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                tocItems.forEach(i => {
                    if (i.dataset.id === id) {
                        i.classList.add('active');
                    } else {
                        i.classList.remove('active');
                    }
                });
            }
        });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

    headings.forEach(h => observer.observe(h));
}

// ============================================================
// 7. Code Blocks — Copy button & Language badge
// ============================================================
function initCodeBlocks() {
    document.querySelectorAll('.article-body pre, .article-content pre').forEach(pre => {
        if (pre.parentElement.classList.contains('code-wrap')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrap';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const code = pre.querySelector('code');
        let lang = 'code';
        if (code) {
            const langClass = Array.from(code.classList).find(c => c.startsWith('language-'));
            if (langClass) {
                lang = langClass.replace('language-', '');
            }
        }

        const langBadge = document.createElement('span');
        langBadge.className = 'code-lang';
        langBadge.textContent = lang;
        wrapper.appendChild(langBadge);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Sao chép';
        copyBtn.addEventListener('click', () => {
            const text = (code ? code.innerText : pre.innerText);
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Đã chép!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Sao chép';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });
        wrapper.appendChild(copyBtn);
    });
}

// ============================================================
// 8. Post Category Filter
// ============================================================
function initPostFilter() {
    const tabs = document.querySelectorAll('.filter-tab, .filter-tab-btn');
    const cards = document.querySelectorAll('.post-card-wrapper');

    if (tabs.length === 0 || cards.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;

            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.classList.add('visible');
                        card.classList.add('in');
                    }, 40);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================================
// 9. Client-side Search
// ============================================================
function initSearch() {
    const input = document.getElementById('search-input');
    const cards = document.querySelectorAll('.post-card-wrapper');

    if (!input || cards.length === 0) return;

    input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();

        cards.forEach(card => {
            const title   = card.querySelector('.post-card-title, .post-title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.post-card-excerpt, .post-excerpt')?.textContent.toLowerCase() || '';
            const tags    = card.querySelector('.post-card-tags, .post-tags')?.textContent.toLowerCase() || '';

            if (!q || title.includes(q) || excerpt.includes(q) || tags.includes(q)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ============================================================
// 10. Estimated Reading Time
// ============================================================
function initReadingTime() {
    const article = document.querySelector('.article-body, .article-content');
    const target  = document.getElementById('reading-time');
    if (!article || !target) return;

    const words = article.textContent.trim().split(/\s+/).length;
    const mins  = Math.max(1, Math.round(words / 220));
    target.textContent = mins + ' phút đọc';
}

// ============================================================
// 11. Stagger animation cho post cards
// ============================================================
function initStaggerCards() {
    document.querySelectorAll('.post-card-wrapper').forEach((card, i) => {
        card.style.transitionDelay = (i * 0.08) + 's';
    });
}

// ============================================================
// DOM Ready
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initActiveNavLink();
    initScrollReveal();
    initBackToTop();
    initReadingProgress();
    initTOC();
    initCodeBlocks();
    initPostFilter();
    initSearch();
    initReadingTime();
    initStaggerCards();
});
