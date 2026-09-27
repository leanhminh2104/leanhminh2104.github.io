# 📝 leanhminh2104.github.io — Blog

Blog cá nhân — Static HTML + CSS + JS thuần, host trên GitHub Pages.

## 🗂️ Cấu trúc thư mục đồng bộ 2 môi trường

```
D:\code\laragon\www\
│
├── blog/                              ← Dev workspace (http://blog.test/)
│   ├── index.html
│   ├── assets/css/   assets/js/
│   ├── tech/   life/   _template/
│   └── deploy.bat                    ← 1-click deploy
│
└── leanhminh2104.github.io/          ← Git repo (http://leanhminh2104.github.io.test/)
    ├── .git/   .gitignore
    ├── index.html                    ← Trang gốc GitHub Pages
    └── blog/                         ← Mirror đồng bộ từ blog/ (qua deploy.bat)
        ├── index.html
        ├── assets/css/   assets/js/
        ├── tech/
        └── life/
```

### URL truy cập:

| Môi trường | URL |
|---|---|
| Dev blog | http://blog.test/ |
| Local mirror (giống GitHub Pages) | http://leanhminh2104.github.io.test/blog/ |
| **GitHub Pages live** | **https://leanhminh2104.github.io/blog/** |

> 💡 Cấu trúc thư mục `laragon\www\leanhminh2104.github.io\blog\` khớp 100% với URL `leanhminh2104.github.io/blog/` — test local xong là deploy y chang lên live!

---

## 🏗️ Cấu trúc blog/

```
blog/
├── assets/
│   ├── css/
│   │   ├── blog.css            ← CSS duy nhất cho toàn blog
│   │   └── stars.css           ← Hiệu ứng sao (import bởi blog.css)
│   └── js/
│       └── core.js             ← JS duy nhất cho toàn blog
│
├── index.html                  ← Trang chủ
│
├── tech/                       ← Danh mục: Công nghệ
│   ├── index.html
│   └── laravel-tips/
│       └── index.html
│
├── life/                       ← Danh mục: Cuộc sống
│   ├── index.html
│   └── cuoc-song-dev/
│       └── index.html
│
└── _template/
    └── post-template.html      ← Template viết bài mới
```

---

## ✍️ Cách viết bài mới

**Bước 1:** Copy template
```bat
copy blog\_template\post-template.html blog\tech\ten-bai-viet\index.html
```

**Bước 2:** Điền thông tin (title, meta, breadcrumb, tags, nội dung)

**Bước 3:** Thêm card vào `index.html` và `tech/index.html` (hoặc `life/index.html`)

**Bước 4:** Chạy `deploy.bat` — tự publish!

---

## 🎨 Design System

| Token | Giá trị | Dùng cho |
|-------|---------|----------|
| `--primary` | `#a855f7` | Màu tím chủ đạo |
| `--accent` | `#6366f1` | Gradient pair |
| `--success` | `#10b981` | Life category |
| `--glass-border` | `rgba(168,85,247,0.12)` | Viền card |

## 🧩 Components có sẵn

```html
<!-- Glass Card -->
<div class="glass-card">Nội dung</div>

<!-- Buttons -->
<a href="#" class="btn btn-primary"><i class="fas fa-arrow-right"></i> Text</a>
<a href="#" class="btn btn-secondary">Text</a>

<!-- Badges -->
<span class="badge badge-info">Tech</span>
<span class="badge badge-success">Life</span>
<span class="badge badge-primary">Laravel</span>
<span class="badge badge-warning">Coming Soon</span>

<!-- Code block (tự có nút Copy) -->
<pre><code class="language-php">$x = 1;</code></pre>

<!-- Animation -->
<div class="reveal">Animate khi scroll đến</div>
```

## 🚀 Deploy

```bat
REM 1-click deploy từ blog.test lên GitHub Pages
deploy.bat
```

Script tự động: scan file nhạy cảm → robocopy → git add → git commit → git push

## 📦 Dependencies (CDN — không cài gì)

- **Font Inter** — Google Fonts
- **Font Fira Code** — Google Fonts
- **Font Awesome 6.5** — cdnjs.cloudflare.com
