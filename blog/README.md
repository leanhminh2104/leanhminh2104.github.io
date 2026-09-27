# 📝 leanhminh2104.github.io — Blog

Blog cá nhân — Static HTML + CSS + JS thuần, host trên GitHub Pages.

## 🏗️ Cấu trúc

```
/
├── assets/
│   ├── css/
│   │   ├── design-system.css   ← Design tokens, glass cards, buttons, badges
│   │   ├── blog.css            ← Header, post cards, article layout, TOC, sidebar
│   │   └── highlight.css       ← Code syntax highlight
│   └── js/
│       └── core.js             ← Mobile nav, TOC, scroll reveal, reading time...
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
    └── post-template.html      ← ← Template để viết bài mới
```

## ✍️ Cách viết bài mới

### 3 bước đơn giản:

**Bước 1:** Copy file `_template/post-template.html`

**Bước 2:** Đặt vào thư mục đúng vị trí:
```
tech/ten-bai-viet/index.html
life/ten-bai-viet/index.html
```

**Bước 3:** Điền thông tin:
- Thay `[TIÊU ĐỀ BÀI VIẾT]` bằng tiêu đề thật
- Thay `[MÔ TẢ BÀI VIẾT]` bằng mô tả SEO
- Thay `[NGÀY THÁNG NĂM]` bằng ngày đăng
- Viết nội dung vào phần `article-content`
- Đặt `class="active"` vào đúng danh mục trong nav

**Bước 4:** Thêm card vào trang chủ (`index.html`) và trang danh mục (`tech/index.html` hoặc `life/index.html`)

**Bước 5:** Push lên GitHub — tự publish!

## 🎨 Design System

| Token | Giá trị | Dùng cho |
|-------|---------|----------|
| `--primary` | `#a855f7` | Màu chủ đạo |
| `--accent` | `#6366f1` | Gradient pair |
| `--bg-dark` | `#06070a` | Background |
| `--glass-border` | `rgba(168,85,247,0.11)` | Viền card |

## 🧩 Components có sẵn

```html
<!-- Glass Card -->
<div class="glass-card">Nội dung</div>

<!-- Button Primary -->
<a href="#" class="btn btn-primary"><i class="fas fa-icon"></i> Text</a>

<!-- Button Secondary -->
<a href="#" class="btn btn-secondary">Text</a>

<!-- Badge / Tag -->
<span class="badge badge-primary">Laravel</span>
<span class="badge badge-success">Life</span>
<span class="badge badge-info">Tech</span>
<span class="badge badge-warning">Tips</span>

<!-- Scroll reveal animation (thêm class reveal vào element) -->
<div class="reveal">Sẽ animate khi scroll đến</div>
```

## 🚀 GitHub Pages Setup

1. Tạo repo tên `leanhminh2104.github.io`
2. Push code lên branch `main`
3. Vào Settings → Pages → Source: `main` branch
4. URL tự động: `https://leanhminh2104.github.io/`

## 📦 Dependencies (CDN — không cần cài)

- **Font Inter**: Google Fonts
- **Font Fira Code**: Google Fonts (cho code)
- **Font Awesome 6.5**: cdnjs.cloudflare.com
- Không dùng framework nào khác!
