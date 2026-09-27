---
name: blog-post-writer
description: |
  Skill toan dien de viet, quan ly va dang bai viet len blog ca nhan leanhminh2104.
  Bao gom: quy tac thiet ke, cau truc HTML chuan, tich hop GitHub Pages, theo doi
  luot xem, quan ly commit, va workflow day du tu y tuong den dang bai.
  Repo: leanhminh2104/leanhminh2104.github.io, blog tai /blog/ subfolder.
  Local: d:\code\laragon\www\blog | Git mirror: d:\code\Git\leanhminh2104.github.io
---

# Blog Post Writer — Huong Dan Toan Dien

## 1. KIEN TRUC TONG QUAN

Blog la Static Blog HTML/CSS/JS thuan, khong can backend, khong can build tool.

| Thuoc tinh | Gia tri |
|---|---|
| URL Local (Laragon) | http://blog.test/ |
| URL GitHub Pages | https://leanhminh2104.github.io/blog/ |
| CSS | 1 file blog.css (import stars.css) tai assets/css/ |
| JS | 1 file core.js tai assets/js/ |
| Font | Inter + Fira Code (Google Fonts CDN) |
| Icons | Font Awesome 6.5 (CDN) |
| Design | DaLyMMO Dark Purple Glassmorphism (copy tu qlct) |
| Git Repo | leanhminh2104/leanhminh2104.github.io (branch: main) |
| Deploy script | d:\code\laragon\www\blog\deploy.bat |

QUY TAC CO BAN:
- KHONG them style inline vao bai viet moi (tru nhung gi template da co)
- KHONG viet JS rieng cho tung bai
- Chi them style moi neu la component hoan toan moi chua co trong blog.css

---

## 2. CAU TRUC THU MUC

```
blog/
├── index.html                   (Trang chu - danh sach bai viet)
├── deploy.bat                   (Script day len GitHub 1-click)
├── README.md
├── assets/
│   ├── css/
│   │   ├── blog.css             (CSS DUY NHAT cho toan bo blog)
│   │   └── stars.css            (Hieu ung sao - duoc import boi blog.css)
│   └── js/
│       └── core.js              (JS DUY NHAT cho toan bo blog)
├── tech/
│   ├── index.html               (Trang danh muc Cong nghe)
│   └── [slug]/
│       └── index.html           (File HTML bai viet)
├── life/
│   ├── index.html               (Trang danh muc Cuoc song)
│   └── [slug]/
│       └── index.html
└── _template/
    └── post-template.html       (Mau goc de tao bai moi)
```

Quy tac dat ten slug: chu thuong, gach ngang (-), khong dau tieng Viet
Vi du: laravel-tips, cuoc-song-dev, mysql-optimize-tips

Duong dan tuong doi theo cap thu muc:
- index.html (root): ./assets/css/blog.css
- tech/index.html: ../assets/css/blog.css
- tech/[slug]/index.html: ../../assets/css/blog.css

---

## 3. WORKFLOW VIET BAI MOI (6 buoc)

Buoc 1: Xac dinh thong tin
- title, slug, category (tech|life), date, emoji, tags, excerpt

Buoc 2: Tao thu muc va copy template
  mkdir blog\tech\[slug]
  copy blog\_template\post-template.html blog\tech\[slug]\index.html

Buoc 3: Dien thong tin vao HTML (xem Section 4)

Buoc 4: Them card vao index.html (trang chu)

Buoc 5: Them card vao tech/index.html hoac life/index.html

Buoc 6: Deploy
  deploy.bat

---

## 4. CAU TRUC HTML CHUAN BAI VIET

Cac vi tri can sua trong template (danh dau []):

### HEAD (SEO)
```html
<meta name="description" content="[Mo ta 120-160 ky tu cho Google]">
<meta property="og:title" content="[Tieu de] -- Le Anh Minh Blog">
<meta property="og:description" content="[Mo ta ngan]">
<meta property="og:url" content="https://leanhminh2104.github.io/blog/[category]/[slug]/">
<meta property="article:published_time" content="[YYYY-MM-DD]">
<title>[Tieu de bai viet] -- Le Anh Minh Blog</title>
<!-- CSS (KHONG thay doi duong dan) -->
<link rel="stylesheet" href="../../assets/css/blog.css">
```

### HEADER NAVIGATION (them class="active" dung danh muc)
```html
<nav class="blog-nav">
  <a href="../../">Trang chu</a>
  <a href="../../tech/" class="active">Cong nghe</a>  <!-- neu bai la Tech -->
  <a href="../../life/">Cuoc song</a>
</nav>
```

### BREADCRUMB
```html
<nav class="breadcrumb animate-up">
  <a href="../../"><i class="fas fa-house"></i> Trang chu</a>
  <i class="fas fa-chevron-right"></i>
  <a href="../">[Ten danh muc]</a>
  <i class="fas fa-chevron-right"></i>
  <span>[Ten rut gon bai viet]</span>
</nav>
```

### ARTICLE HEADER
```html
<header class="article-header animate-up">
  <h1 class="article-title">[Tieu de day du] [emoji]</h1>
  <div class="article-meta">
    <span class="article-meta-item"><i class="fas fa-user"></i> Le Anh Minh</span>
    <span class="article-meta-item"><i class="fas fa-calendar"></i> [Ngay thang nam]</span>
    <span class="article-meta-item"><i class="fas fa-clock"></i> <span id="reading-time">dang tinh...</span></span>
    <!-- GitHub commit date (xem Section 8) -->
    <span class="article-meta-item"><i class="fas fa-rotate"></i> Cap nhat: <span id="last-updated">...</span></span>
    <!-- View counter (xem Section 9) -->
    <span class="article-meta-item" id="view-counter">
      <i class="fas fa-eye"></i> <span id="view-count">...</span> luot xem
    </span>
  </div>
  <div class="article-tags">
    <!-- Badge mau theo danh muc: Tech=badge-info, Life=badge-success -->
    <span class="badge badge-info"><i class="fas fa-code"></i> Tech</span>
    <span class="badge badge-primary">[Tag 2]</span>
  </div>
</header>
```

### NOI DUNG BAI VIET (cac the h2, h3 tu dong tao TOC)
```html
<p>[Doan mo dau]</p>

<blockquote>"[Trich dan noi bat]"</blockquote>

<h2>1. [Tieu de muc chinh]</h2>
<p>[Noi dung...]</p>

<!-- Code block: them class language-xxx -->
<pre><code class="language-php">
$users = User::where('active', true)->get();
</code></pre>

<h2>2. [Tieu de muc thu hai]</h2>
<ul>
  <li>[Diem 1]</li>
  <li>[Diem 2]</li>
</ul>

<h3>[Tieu de phu]</h3>
<p>[Chi tiet hon...]</p>

<h2>Ket luan</h2>
<p>[Tom luoc + loi khuyen]</p>

<hr>

<!-- Navigation bai ke tiep -->
<div class="glass-card" style="margin-top:2.5rem; display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap;">
  <div>
    <div style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Bai ke tiep</div>
    <a href="../../" style="color:#fff; font-weight:700; text-decoration:none; display:block; margin-top:0.2rem;">
      [Ten bai ke tiep]
    </a>
  </div>
  <a href="../../" class="btn btn-primary" style="padding:0.5rem 1rem; font-size:0.8rem;">
    Doc tiep <i class="fas fa-arrow-right"></i>
  </a>
</div>
```

### SIDEBAR (tu dong tao TOC tu h2/h3)
```html
<aside class="article-sidebar">
  <!-- Muc luc - TU DONG tao boi core.js -->
  <div class="glass-card toc-card" id="toc-card">
    <div class="toc-title"><i class="fas fa-list-ul"></i> Muc luc</div>
    <ul class="toc-list" id="toc-list"></ul>
  </div>

  <!-- The tac gia -->
  <div class="glass-card author-card">
    <div class="author-avatar">&#x1F468;&#x200D;&#x1F4BB;</div>
    <div style="font-weight:700; color:#fff;">Le Anh Minh</div>
    <div style="font-size:0.75rem; color:var(--text-dim);">Full-stack Developer</div>
    <a href="https://github.com/leanhminh2104" target="_blank" rel="noopener noreferrer"
       class="btn btn-secondary" style="width:100%; margin-top:0.85rem; font-size:0.78rem; padding:0.45rem 0.8rem;">
      <i class="fab fa-github"></i> Theo doi GitHub
    </a>
  </div>

  <!-- GitHub Stats Card -->
  <div class="glass-card" style="padding:1rem;">
    <div style="font-size:0.72rem; color:var(--text-dim); font-weight:700; text-transform:uppercase; margin-bottom:0.75rem;">
      <i class="fab fa-github" style="color:#c084fc;"></i> GitHub Stats
    </div>
    <div id="github-stats-sidebar"><div style="font-size:0.78rem; color:var(--text-muted);">Dang tai...</div></div>
  </div>
</aside>
```

### MOBILE BOTTOM NAV (them class active cho dung trang)
```html
<div class="bottom-nav-wrapper">
  <div class="bottom-nav-inner">
    <div class="bottom-nav-glass">
      <div class="bottom-nav-gradients"></div>
      <nav class="bottom-nav-menu">
        <a href="../../" class="nav-item">
          <i class="fas fa-house nav-icon"></i>
          <span class="nav-text">Trang chu</span>
        </a>
        <a href="../../tech/" class="nav-item active"> <!-- them active neu bai la tech -->
          <i class="fas fa-code nav-icon"></i>
          <span class="nav-text">Cong nghe</span>
        </a>
        <div class="fab-container">
          <div class="fab-ping"></div>
          <a href="../../" class="fab-btn" title="Trang chu">
            <i class="fas fa-pen-nib"></i>
          </a>
          <div class="fab-placeholder"></div>
          <span class="fab-text">Kham pha</span>
        </div>
        <a href="../../life/" class="nav-item"> <!-- them active neu bai la life -->
          <i class="fas fa-heart nav-icon"></i>
          <span class="nav-text">Cuoc song</span>
        </a>
        <button type="button" class="nav-item" id="open-drawer-btn">
          <i class="fas fa-bars nav-icon"></i>
          <span class="nav-text">Menu</span>
        </button>
      </nav>
    </div>
  </div>
</div>
```

### SCRIPT CUOI FILE
```html
<!-- JS Core - KHONG thay doi duong dan -->
<script src="../../assets/js/core.js"></script>

<!-- GitHub Integration -->
<script>
const POST_PATH = 'tech/laravel-tips'; // Doi theo bai hien tai
// Tai GitHub stats sidebar
(async () => {
  try {
    // Load last commit date
    const commitRes = await fetch(
      'https://api.github.com/repos/leanhminh2104/leanhminh2104.github.io/commits?path=blog/' + POST_PATH + '/index.html&per_page=1'
    );
    const commits = await commitRes.json();
    if (commits[0]) {
      const d = new Date(commits[0].commit.committer.date);
      const el = document.getElementById('last-updated');
      if (el) el.textContent = d.toLocaleDateString('vi-VN');
    }

    // Load GitHub profile stats
    const userRes = await fetch('https://api.github.com/users/leanhminh2104');
    const user = await userRes.json();
    const statsEl = document.getElementById('github-stats-sidebar');
    if (statsEl) {
      statsEl.innerHTML =
        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">' +
        '<div style="text-align:center; padding:0.5rem; background:rgba(168,85,247,0.08); border-radius:10px;">' +
        '<div style="font-size:1.1rem; font-weight:800; color:#c084fc;">' + user.public_repos + '</div>' +
        '<div style="font-size:0.65rem; color:var(--text-dim);">Repos</div></div>' +
        '<div style="text-align:center; padding:0.5rem; background:rgba(56,189,248,0.08); border-radius:10px;">' +
        '<div style="font-size:1.1rem; font-weight:800; color:#38bdf8;">' + user.followers + '</div>' +
        '<div style="font-size:0.65rem; color:var(--text-dim);">Followers</div></div>' +
        '</div>';
    }
  } catch(e) { console.log('GitHub API load error:', e); }
})();
</script>
```

---

## 5. DESIGN TOKENS (MAU SAC VA LOP KINH)

Mau sac chinh (CSS variables trong :root):
- --primary: #a855f7 (tim chinh)
- --primary-hover: #c084fc (tim sang hon)
- --accent: #6366f1 (indigo phu)
- --success: #10b981 (xanh la - Life category)
- --warning: #f59e0b (vang - Coming Soon)
- --danger: #ef4444 (do)
- --text-main: #ffffff
- --text-muted: #cbd5e1
- --text-dim: #94a3b8

Cac lop Glass (kinh mo):
- --glass-bg: rgba(147,51,234,0.010) - rat trong suot
- --glass-bg-2: rgba(168,85,247,0.025) - hover state
- --glass-border: rgba(168,85,247,0.12) - vien tim mo
- --glass-blur: blur(20px)

Border radius:
- --radius-sm: 8px
- --radius-md: 14px
- --radius-lg: 20px
- --radius-xl: 28px (card lon chinh)
- --radius-full: 9999px (pill button, badge)

---

## 6. COMPONENT CSS SAN CO

### Badge / Tag
```html
<span class="badge badge-info"><i class="fas fa-code"></i> Tech</span>
<span class="badge badge-success"><i class="fas fa-heart"></i> Life</span>
<span class="badge badge-primary">Laravel</span>
<span class="badge badge-warning">Coming Soon</span>
<span class="badge badge-danger">Hot</span>
```

### Button
```html
<a href="#" class="btn btn-primary">Doc tiep <i class="fas fa-arrow-right"></i></a>
<a href="#" class="btn btn-secondary"><i class="fab fa-github"></i> GitHub</a>
```

### Glass Card
```html
<div class="glass-card">
  <h3>Tieu de</h3>
  <p>Noi dung</p>
</div>
```

### Code Block (tu dong co nut Copy)
```html
<pre><code class="language-php">$users = User::all();</code></pre>
<pre><code class="language-javascript">const x = 1;</code></pre>
<pre><code class="language-bash">php artisan migrate</code></pre>
<pre><code class="language-sql">SELECT * FROM users;</code></pre>
```
Ngon ngu ho tro: php, javascript, python, bash, sql, html, css, json, yaml

### Blockquote
```html
<blockquote>"Cau trich dan quan trong can lam noi bat."</blockquote>
```

### Animation
```html
<div class="animate-up">Xuat hien voi hieu ung truot len</div>
<div class="reveal">Card xuat hien khi scroll den</div>
```

### Info/Warning Box
```html
<!-- Meo hay -->
<div class="glass-card" style="border-color:rgba(168,85,247,0.4); background:rgba(168,85,247,0.06);">
  <div style="font-weight:700; color:#c084fc; margin-bottom:0.5rem;"><i class="fas fa-lightbulb"></i> Meo hay</div>
  <p style="color:var(--text-muted); font-size:0.875rem; margin:0;">[Noi dung tip]</p>
</div>

<!-- Luu y -->
<div class="glass-card" style="border-color:rgba(245,158,11,0.4); background:rgba(245,158,11,0.06);">
  <div style="font-weight:700; color:#fbbf24; margin-bottom:0.5rem;"><i class="fas fa-triangle-exclamation"></i> Luu y</div>
  <p style="color:var(--text-muted); font-size:0.875rem; margin:0;">[Canh bao]</p>
</div>
```

---

## 7. THEM CARD BAI VIET VAO TRANG CHU

Tim phan posts-grid trong index.html, them o DAU DANH SACH:

```html
<div class="post-card-wrapper reveal" data-category="tech">
  <a href="./tech/[slug]/" class="post-card">
    <div class="post-cover">[emoji]</div>
    <div class="post-body">
      <div class="post-meta">
        <span class="badge badge-info"><i class="fas fa-code"></i> Tech</span>
        <span class="post-meta-item"><i class="fas fa-calendar"></i> [ngay]</span>
        <span class="post-meta-item"><i class="fas fa-clock"></i> [X phut]</span>
        <span class="badge badge-warning" style="margin-left:auto;"><i class="fas fa-sparkles"></i> Moi</span>
      </div>
      <h2 class="post-title">[Tieu de bai viet]</h2>
      <p class="post-excerpt">[Mo ta ngan 100-150 ky tu...]</p>
      <div class="post-footer">
        <div class="post-tags">
          <span class="badge badge-primary">[Tag 1]</span>
          <span class="badge badge-primary">[Tag 2]</span>
        </div>
        <div class="post-arrow"><i class="fas fa-arrow-right"></i></div>
      </div>
    </div>
  </a>
</div>
```

Cho category index (tech/index.html hoac life/index.html): duong dan la ./[slug]/ khong co prefix.

---

## 8. TICH HOP GITHUB SAU

### 8.1 Ngay cap nhat tu commit cuoi cung
```javascript
async function loadLastUpdate(postPath) {
  const res = await fetch(
    'https://api.github.com/repos/leanhminh2104/leanhminh2104.github.io/commits?path=blog/' + postPath + '/index.html&per_page=1'
  );
  const data = await res.json();
  if (data[0]) {
    const d = new Date(data[0].commit.committer.date);
    document.getElementById('last-updated').textContent = d.toLocaleDateString('vi-VN');
  }
}
```

### 8.2 So lan chinh sua (edit count)
```javascript
async function loadEditCount(postPath) {
  const res = await fetch(
    'https://api.github.com/repos/leanhminh2104/leanhminh2104.github.io/commits?path=blog/' + postPath + '/index.html&per_page=100'
  );
  const data = await res.json();
  document.getElementById('edit-count').textContent = data.length;
}
```

### 8.3 Profile stats (repos, followers)
```javascript
async function loadGitHubStats() {
  const res = await fetch('https://api.github.com/users/leanhminh2104');
  const user = await res.json();
  // user.public_repos, user.followers, user.following, user.public_gists
}
```

### 8.4 Danh sach repo moi nhat
```javascript
async function loadRecentRepos() {
  const res = await fetch('https://api.github.com/users/leanhminh2104/repos?sort=updated&per_page=3');
  const repos = await res.json();
  // repos[i].name, repos[i].html_url, repos[i].stargazers_count, repos[i].description
}
```

### 8.5 Traffic API (qua gh CLI)
```bash
gh api repos/leanhminh2104/leanhminh2104.github.io/traffic/views
gh api repos/leanhminh2104/leanhminh2104.github.io/traffic/popular/paths
```

---

## 9. HE THONG DEM LUOT XEM

### Phuong an A: GitHub Issues lam View Counter

Tao issue cho moi bai (chay 1 lan khi publish):
```bash
gh issue create --repo leanhminh2104/leanhminh2104.github.io \
  --title "views:tech/laravel-tips" \
  --body "View counter for: Laravel Tips" \
  --label "view-counter"
```

Doc luot xem (them vao cuoi body):
```html
<script>
const ISSUE_NUMBER = 1; // So issue GitHub tuong ung
async function loadViewCount() {
  try {
    const res = await fetch(
      'https://api.github.com/repos/leanhminh2104/leanhminh2104.github.io/issues/' + ISSUE_NUMBER
    );
    const issue = await res.json();
    const views = issue.reactions ? issue.reactions.total_count : 0;
    document.getElementById('view-count').textContent = views > 0 ? views.toLocaleString('vi') : 'Moi';
  } catch(e) {}
}
loadViewCount();
</script>
```

### Phuong an B: GitHub Releases lam Changelog
```bash
gh release create "post/tech/laravel-tips/v1.0" \
  --repo leanhminh2104/leanhminh2104.github.io \
  --title "Bai viet moi: Laravel Tips" \
  --notes "Bai viet moi ve Laravel tips"
```

---

## 10. BADGE "MOI" VA GITHUB ACTIONS

### Badge "Moi" tu dong (duoi 7 ngay)
Them vao cuoi core.js hoac inline:
```javascript
function initNewBadge() {
  document.querySelectorAll('.post-card-wrapper').forEach(card => {
    const dateEl = card.querySelector('.post-meta-item i.fa-calendar');
    if (!dateEl) return;
    const dateText = dateEl.parentElement.textContent.trim();
    const m = dateText.match(/(\d+) thang (\d+), (\d+)/);
    if (!m) return;
    const postDate = new Date(m[3], m[2]-1, m[1]);
    if ((new Date() - postDate) / 86400000 <= 7) {
      const meta = card.querySelector('.post-meta');
      if (meta && !meta.querySelector('.badge-new')) {
        const badge = document.createElement('span');
        badge.className = 'badge badge-warning badge-new';
        badge.style.marginLeft = 'auto';
        badge.innerHTML = '<i class="fas fa-sparkles"></i> Moi';
        meta.appendChild(badge);
      }
    }
  });
}
```

### GitHub Action: Tu dong tao issue khi co bai moi
Tao .github/workflows/announce-post.yml trong repo leanhminh2104.github.io:
```yaml
name: Announce New Blog Post
on:
  push:
    paths: ['blog/tech/*/index.html', 'blog/life/*/index.html']
jobs:
  announce:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 2 }
      - name: Detect new post
        id: detect
        run: |
          NEW_FILE=$(git diff --name-only HEAD~1 HEAD | grep 'blog/.*/index.html' | grep -v 'blog/index.html' | head -1)
          echo "post_path=$NEW_FILE" >> $GITHUB_OUTPUT
      - name: Create issue
        if: steps.detect.outputs.post_path != ''
        uses: actions/github-script@v7
        with:
          script: |
            const path = '${{ steps.detect.outputs.post_path }}';
            const url = 'https://leanhminh2104.github.io/' + path.replace('index.html', '');
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Bai viet moi: ' + path,
              body: 'Bai viet moi!\n\n' + url + '\n\n*Tu dong tao boi GitHub Actions*',
              labels: ['new-post', 'view-counter']
            });
```

### GitHub Action: Validate HTML khi push
```yaml
name: Deploy Check
on:
  push:
    branches: [main]
    paths: ['blog/**']
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check HTML
        run: |
          find blog -name "*.html" | while read f; do
            grep -q "blog.css" "$f" || echo "WARNING Missing blog.css: $f"
            grep -q "core.js" "$f" || echo "WARNING Missing core.js: $f"
          done
          echo "OK All checked"
```

---

## 11. TRIEN KHAI TU DONG

### deploy.bat (co san tai d:\code\laragon\www\blog\deploy.bat)
Git repo tai: d:\code\Git\leanhminh2104.github.io\

Chay deploy.bat:
- Sync blog/ sang git repo
- git add blog/
- git commit (nhap message)
- git push origin main
- GitHub Pages tu build trong 30-60 giay

Kiem tra sau deploy:
```bash
gh api repos/leanhminh2104/leanhminh2104.github.io/pages
git -C d:\code\Git\leanhminh2104.github.io log --name-status -1
```

URL check: https://leanhminh2104.github.io/blog/

---

## 12. CHECKLIST TRUOC KHI DANG

### Bai viet moi:
- [ ] Thu muc: [category]/[slug]/index.html
- [ ] Slug khong co dau, dung gach ngang
- [ ] title dung format: [Tieu de] -- Le Anh Minh Blog
- [ ] meta description 120-160 ky tu
- [ ] og:url dung URL GitHub Pages
- [ ] Duong dan CSS: ../../assets/css/blog.css
- [ ] Duong dan JS: ../../assets/js/core.js
- [ ] Breadcrumb dung danh muc
- [ ] blog-nav a.active dung trang
- [ ] nav-item.active trong bottom-nav dung
- [ ] drawer-item.active trong drawer dung
- [ ] Code blocks co class="language-xxx"
- [ ] Co it nhat 3 section h2

### Trang chu index.html:
- [ ] Card them VAO DAU danh sach
- [ ] data-category dung de filter hoat dong
- [ ] Excerpt 100-150 ky tu

### Category index:
- [ ] Card them vao tech/index.html hoac life/index.html
- [ ] Duong dan la ./[slug]/ (khong co prefix category)

### Deploy:
- [ ] Chay deploy.bat
- [ ] Kiem tra https://leanhminh2104.github.io/blog/
- [ ] Test mobile
- [ ] Test desktop

---

## VI DU THUC TE: Them bai "MySQL Optimize Tips"

```bash
mkdir d:\code\laragon\www\blog\tech\mysql-optimize-tips
copy d:\code\laragon\www\blog\_template\post-template.html d:\code\laragon\www\blog\tech\mysql-optimize-tips\index.html
```

Dien vao HTML:
- title: MySQL Optimize Tips -- 10 cach toi uu database sieu nhanh -- Le Anh Minh Blog
- slug: mysql-optimize-tips, category: tech, emoji: lightning
- tags: MySQL, Database, Performance
- Breadcrumb: Trang chu > Cong nghe > MySQL Tips
- class="active" tren link ../../tech/

Them card vao index.html (o dau posts-grid):
```html
<div class="post-card-wrapper reveal" data-category="tech">
  <a href="./tech/mysql-optimize-tips/" class="post-card">
    <div class="post-cover">&#x26A1;</div>
    <div class="post-body">
      <div class="post-meta">
        <span class="badge badge-info"><i class="fas fa-code"></i> Tech</span>
        <span class="post-meta-item"><i class="fas fa-calendar"></i> 27 thang 9, 2026</span>
        <span class="badge badge-warning" style="margin-left:auto;"><i class="fas fa-sparkles"></i> Moi</span>
      </div>
      <h2 class="post-title">MySQL Optimize Tips -- 10 cach toi uu database sieu nhanh</h2>
      <p class="post-excerpt">Tong hop 10 ky thuat toi uu MySQL hieu qua nhat giup query chay nhanh gap 10 lan...</p>
      <div class="post-footer">
        <div class="post-tags">
          <span class="badge badge-primary">MySQL</span>
          <span class="badge badge-primary">Database</span>
        </div>
        <div class="post-arrow"><i class="fas fa-arrow-right"></i></div>
      </div>
    </div>
  </a>
</div>
```

Chay: deploy.bat (nhap: "feat: add mysql optimize tips post")
