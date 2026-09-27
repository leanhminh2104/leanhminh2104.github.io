# 🌌 leanhminh2104 Blog — Personal Tech & Life Hub

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live%20on%20GitHub%20Pages-success?style=for-the-badge&logo=github&logoColor=white" alt="Live Badge" />
  <img src="https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue?style=for-the-badge&logo=javascript&logoColor=white" alt="Stack Badge" />
  <img src="https://img.shields.io/badge/Design-Glassmorphism%20%26%20Cyberpunk-purple?style=for-the-badge" alt="Design Badge" />
  <img src="https://img.shields.io/badge/Security-Auto%20Secret%20Scan-red?style=for-the-badge&logo=securityscorecard&logoColor=white" alt="Security Badge" />
</p>

<p align="center">
  <b>Blog cá nhân của Lê Anh Minh — Nơi chia sẻ kiến thức công nghệ, lập trình Web, thủ thuật Laravel/PHP và những câu chuyện đời thường của Developer.</b>
</p>

<p align="center">
  <a href="https://leanhminh2104.github.io/blog/">🌐 <b>Xem Live trên GitHub Pages</b></a> •
  <a href="#-cấu-trúc-dự-án">📁 <b>Cấu trúc dự án</b></a> •
  <a href="#-hướng-dẫn-viết-bài-mới">✍️ <b>Viết bài mới</b></a> •
  <a href="#-quy-trình-deploy--bảo-mật">🚀 <b>Deploy & Bảo mật</b></a> •
  <a href="#-hệ-thống-ai-skills">🤖 <b>AI Skills</b></a>
</p>

---

## 📑 Mục lục

1. [Tổng quan & Kiến trúc Môi trường](#-tổng-quan--kiến-trúc-môi-trường)
2. [Cấu trúc Thư mục Toàn diện](#-cấu-trúc-thư-mục-toàn-diện)
3. [Design System & Hiệu ứng Giao diện](#-design-system--hiệu-ứng-giao-diện)
4. [Hướng dẫn Viết Bài Mới Chuẩn SEO](#-hướng-dẫn-viết-bài-mới-chuẩn-seo)
5. [Quy trình Deploy & Cơ chế Bảo mật 2 Lớp](#-quy-trình-deploy--cơ-chế-bảo-mật-2-lớp)
6. [Hệ thống AI Skills Tích hợp (.agents)](#-hệ-thống-ai-skills-tích-hợp-agents)
7. [Tối ưu SEO & Hiệu năng](#-tối-ưu-seo--hiệu-năng)
8. [Xử lý sự cố thường gặp (FAQ)](#-xử-lý-sự-cố-thường-gặp-faq)

---

## 🌐 Tổng quan & Kiến trúc Môi trường

Blog được xây dựng theo kiến trúc **Static Site thuần (No-Build Framework)**, tối đa tốc độ tải trang, không phụ thuộc build tooling phức tạp, và được đồng bộ hoàn hảo giữa môi trường Local Dev (Laragon) và Production (GitHub Pages).

### Sơ đồ luồng hoạt động:

```
[Local Dev: blog/] ──(deploy.bat: Scan bảo mật + Sync)──> [Git Repo: leanhminh2104.github.io/blog/] ──(git push)──> [GitHub Pages Live]
   http://blog.test/                                            http://leanhminh2104.github.io.test/blog/            https://leanhminh2104.github.io/blog/
```

### Bảng so sánh 3 môi trường:

| Đặc tính | 1. Local Workspace (`blog/`) | 2. Git Mirror (`.../blog/`) | 3. GitHub Pages (Live) |
|---|---|---|---|
| **Đường dẫn thư mục** | `D:\code\laragon\www\blog\` | `D:\code\laragon\www\leanhminh2104.github.io\blog\` | `https://github.com/leanhminh2104/leanhminh2104.github.io` |
| **URL truy cập** | `http://blog.test/` | `http://leanhminh2104.github.io.test/blog/` | `https://leanhminh2104.github.io/blog/` |
| **Mục đích** | Viết bài, chỉnh sửa CSS/JS, test nhanh | Kiểm tra URL path thực tế trước khi push | Bản chính thức cho độc giả toàn cầu |
| **Đồng bộ** | Gốc (Source of Truth) | Tự động cập nhật qua `deploy.bat` | Tự động build & host bởi GitHub CDN |

> 💡 **Điểm ưu việt:** Cấu trúc local tại `D:\code\laragon\www\leanhminh2104.github.io\blog\` có URI tương đối **giống 100%** so với URL GitHub Pages `leanhminh2104.github.io/blog/`. Mọi đường dẫn assets (`../../assets/...`), liên kết điều hướng đều hoạt động đồng nhất ở cả 2 nơi!

---

## 📁 Cấu trúc Thư mục Toàn diện

```
D:\code\laragon\www\blog\
├── .agents/                                # AI Agent Skills & Trợ lý ảo
│   └── skills/
│       ├── blog-post-writer/               # Skill AI: Viết bài chuẩn giao diện & SEO
│       │   └── SKILL.md
│       └── blog-deploy/                    # Skill AI: Hướng dẫn & quy chuẩn deploy an toàn
│           └── SKILL.md
│
├── assets/                                 # Tài nguyên dùng chung cho toàn bộ Blog
│   ├── css/
│   │   ├── blog.css                        # CSS Master: Design tokens, Layout, Cards, Dark theme
│   │   ├── design-system.css               # Design system mở rộng: Typography, Colors, Grids
│   │   ├── highlight.css                   # Custom syntax highlight cho các khối code
│   │   ├── saas-design.css                 # Phong cách Glassmorphism & UI SaaS hiện đại
│   │   └── stars.css                       # Hiệu ứng bầu trời sao chuyển động (Canvas/CSS Stars)
│   ├── js/
│   │   └── core.js                         # JavaScript chính: Scroll Reveal, Copy Code, Hit Counter
│   └── fonts/                              # Local fonts dự phòng (nếu cần offline)
│
├── tech/                                   # 💻 Danh mục: Công nghệ & Lập trình
│   ├── index.html                          # Trang danh sách bài viết chuyên mục Tech
│   └── laravel-tips/                       # Bài viết mẫu: Laravel tips & tricks
│       └── index.html
│
├── life/                                   # 🌿 Danh mục: Đời sống & Sự nghiệp Dev
│   ├── index.html                          # Trang danh sách bài viết chuyên mục Life
│   └── cuoc-song-dev/                      # Bài viết mẫu: Tâm sự đời sống lập trình viên
│       └── index.html
│
├── _template/                              # 📐 Khuôn mẫu chuẩn cho bài viết mới
│   └── post-template.html                  # Template đầy đủ cấu trúc Breadcrumb, Tag, Meta, View counter
│
├── index.html                              # 🏠 Trang chủ Blog (Hero section, Featured Posts, Category grid)
├── deploy.bat                              # 🚀 Script deploy 1-click tích hợp quét bảo mật
└── README.md                               # 📖 Tài liệu hướng dẫn dự án (File hiện tại)
```

---

## 🎨 Design System & Hiệu ứng Giao diện

Toàn bộ Blog được bao phủ bởi giao diện **Dark Cyberpunk Glassmorphism** sang trọng với bảng màu tương phản cao, dịu mắt và kích thích trải nghiệm đọc.

### Bảng màu Tokens (`blog.css`)

| Token CSS | Mã Màu | Ý nghĩa & Vị trí ứng dụng |
|---|---|---|
| `--bg-dark` | `#0b0f19` | Nền chính của toàn trang web |
| `--bg-card` | `rgba(17, 24, 39, 0.75)` | Nền thẻ bài viết với hiệu ứng kính mờ `backdrop-filter: blur(12px)` |
| `--primary` | `#a855f7` | Tím Neon — Màu thương hiệu chính, nút bấm, tiêu đề highlight |
| `--accent` | `#6366f1` | Xanh Indigo — Phối màu Gradient cùng `--primary` |
| `--success` | `#10b981` | Xanh ngọc lục bảo — Danh mục Life, trạng thái Thành công |
| `--warning` | `#f59e0b` | Vàng cam — Cảnh báo, nhãn bài viết "Sắp ra mắt" |
| `--text-main` | `#f3f4f6` | Màu chữ chính, độ tương phản chuẩn WCAG AAA |
| `--text-muted` | `#9ca3af` | Chữ phụ, ngày tháng, thời gian đọc, breadcrumbs |

### Các Component UI tiêu biểu

- **Glass Card:**
  ```html
  <div class="glass-card">
    <div class="badge badge-primary">Tech</div>
    <h3>Tiêu đề bài viết</h3>
    <p>Nội dung tóm tắt...</p>
  </div>
  ```
- **Code Block tự động gắn nút Copy:**
  ```html
  <pre><code class="language-php">echo "Hello World";</code></pre>
  ```
  *(File `core.js` sẽ tự động inject nút `Copy` với hiệu ứng copy vào clipboard và thông báo toast)*.
- **Badge trạng thái & Phân loại:**
  - `<span class="badge badge-info">Tech</span>`
  - `<span class="badge badge-success">Life</span>`
  - `<span class="badge badge-warning">Mới</span>` (hỗ trợ hiển thị bài viết mới cập nhật)

---

## ✍️ Hướng dẫn Viết Bài Mới Chuẩn SEO

Để tạo một bài viết mới với chuẩn SEO cao nhất và giao diện đồng nhất:

### Bước 1: Nhân bản Template
Tạo thư mục slug mới trong thư mục danh mục tương ứng (`tech/` hoặc `life/`):
```powershell
# Ví dụ tạo bài viết về Docker trong thư mục tech:
New-Item -ItemType Directory -Path "d:\code\laragon\www\blog\tech\docker-co-ban"
Copy-Item "d:\code\laragon\www\blog\_template\post-template.html" "d:\code\laragon\www\blog\tech\docker-co-ban\index.html"
```

### Bước 2: Chỉnh sửa nội dung & Meta Tags
Mở file `index.html` vừa tạo và cập nhật các trường:
1. `<title>`: Tiêu đề bài viết — Tên Blog
2. `<meta name="description">`: Đoạn mô tả bài viết từ 140 - 160 ký tự
3. OpenGraph Tags (`og:title`, `og:description`, `og:url`, `og:image`)
4. Đường dẫn tương đối cho assets:
   - Vì bài viết nằm ở cấp `tech/<slug>/index.html`, đường dẫn tới assets luôn là:
     ```html
     <link rel="stylesheet" href="../../assets/css/blog.css">
     <script src="../../assets/js/core.js"></script>
     ```
5. Breadcrumb:
   ```html
   <nav class="breadcrumb">
     <a href="../../">Home</a> /
     <a href="../">Tech</a> /
     <span>Docker cơ bản</span>
   </nav>
   ```

### Bước 3: Cập nhật danh sách hiển thị
Thêm bài viết mới vào:
- Trang chủ `blog/index.html` (Mục Bài viết Mới Nhất)
- Trang chuyên mục `blog/tech/index.html` (hoặc `blog/life/index.html`)

### Bước 4: Deploy lên Live
Chỉ cần nhấp đúp file `deploy.bat` hoặc gõ lệnh trong terminal:
```bat
deploy.bat
```

---

## 🚀 Quy trình Deploy & Cơ chế Bảo mật 2 Lớp

Script [`deploy.bat`](file:///d:/code/laragon/www/blog/deploy.bat) được thiết kế đặc biệt nhằm ngăn chặn tuyệt đối tình trạng vô tình đẩy thông tin nhạy cảm lên GitHub công khai.

```
       ┌────────────────────────────────────────────────────────┐
       │             Chạy deploy.bat (1-Click)                  │
       └──────────────────────────┬─────────────────────────────┘
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │ [BƯỚC 1] 🔍 SCAN BẢO MẬT TỰ ĐỘNG                       │
       │  • Tìm file: .env, *.pem, *.key, id_rsa, dump.sql      │
       │  • Quét chuỗi nhạy cảm: ghp_*, gho_*, sk-*, AIzaSy*    │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                 Có phát hiện nguy cơ?
                ┌─────────────────┴─────────────────┐
             CÓ │                                   │ KHÔNG
                ▼                                   ▼
      🛑 DỪNG DEPLOY NGAY LẬP TỨC         [BƯỚC 2] ĐỒNG BỘ NỘI DUNG
      Báo file/dòng chứa key nhạy cảm     Robocopy sang leanhminh2104.github.io
                                                    ▼
                                          [BƯỚC 3] KIỂM TRA GIT DIFF
                                          Hiển thị danh sách file thay đổi
                                                    ▼
                                          [BƯỚC 4] COMMIT & PUSH ORIGIN MAIN
                                          Đẩy mã nguồn an toàn lên GitHub
                                                    ▼
                                          ✅ HOÀN TẤT & MỞ URL KIỂM TRA
```

### 🛡️ File `.gitignore` chuẩn bảo mật:
Hệ thống loại trừ toàn bộ các tệp sau:
- Files môi trường: `.env`, `.env.local`, `.env.*`
- Khóa bảo mật: `*.pem`, `*.key`, `*.pfx`, `id_rsa*`
- Database: `*.sql`, `*.sqlite`, `*.db`
- Script cục bộ: `*.bat`, `*.cmd`, `*.ps1`, `deploy.bat`
- Internal Tools: `.agents/`, `node_modules/`, `vendor/`

---

## 🤖 Hệ thống AI Skills Tích hợp (.agents)

Dự án tích hợp bộ Skills chuẩn hóa cho trợ lý AI (Antigravity IDE / Claude / Copilot), nằm tại `.agents/skills/`:

| Tên Skill | Vị trí | Nhiệm vụ chính |
|---|---|---|
| **blog-post-writer** | [`.agents/skills/blog-post-writer/SKILL.md`](file:///d:/code/laragon/www/blog/.agents/skills/blog-post-writer/SKILL.md) | Chuyên gia viết nội dung: Đảm bảo áp dụng 100% chuẩn CSS/HTML, cấu trúc Breadcrumbs, Relative Paths, Meta OpenGraph, bộ đếm lượt xem (View Counter), Badges bài viết mới và tạo issue tự động trên GitHub. |
| **blog-deploy** | [`.agents/skills/blog-deploy/SKILL.md`](file:///d:/code/laragon/www/blog/.agents/skills/blog-deploy/SKILL.md) | Chuyên gia vận hành & Deploy: Hướng dẫn quy trình phát hành an toàn, nguyên tắc chặn mã độc/rò rỉ secret key, kiểm tra tính toàn vẹn của git mirror và rollback khi có sự cố. |

> 📌 Nhờ bộ skill này, khi bạn yêu cầu AI viết bài mới hoặc nâng cấp giao diện, AI sẽ tự động đọc tài liệu và xuất code hoàn toàn chuẩn xác theo thiết kế ban đầu mà không cần nhắc lại quy tắc.

---

## ⚡ Tối ưu SEO & Hiệu năng

- **Zero Framework Overhead:** Hoàn toàn là HTML/CSS/JS thuần, điểm Google PageSpeed Insights đạt 98-100 điểm.
- **Semantic HTML:** Sử dụng triệt để `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` hỗ trợ bot tìm kiếm thu thập dữ liệu chính xác.
- **Lượt xem thời gian thực (View Counter):** Tích hợp dịch vụ đếm lượt xem nhẹ nhàng dựa trên SVG badge/API không làm chậm trải nghiệm người dùng.
- **Assets CDN:** Font Awesome 6.5.1 và Google Fonts (Inter + Fira Code) được nạp qua Cloudflare & Google CDN với thuộc tính `preconnect` và `dns-prefetch`.

---

## ❓ Xử lý sự cố thường gặp (FAQ)

### 1. Tại sao hình ảnh hoặc CSS không hiển thị khi mở bài viết con?
- **Nguyên nhân:** Dùng sai đường dẫn tương đối.
- **Khắc phục:** 
  - Tại trang chủ `blog/index.html`: `assets/css/blog.css`
  - Tại trang danh mục `blog/tech/index.html`: `../assets/css/blog.css`
  - Tại trang chi tiết bài viết `blog/tech/<slug>/index.html`: `../../assets/css/blog.css`

### 2. `deploy.bat` báo lỗi đỏ: "PHÁT HIỆN CHUỖI NHẠY CẢM"?
- **Khắc phục:** Mở file được cảnh báo, kiểm tra xem bạn có vô tình paste API Token (như GitHub Personal Access Token, OpenAI Key...) vào code hay không. Xóa chuỗi đó hoặc đưa vào tài liệu hướng dẫn giả định (ví dụ thay bằng `ghp_your_token_here`) trước khi chạy lại deploy.

### 3. Xem blog local ở đâu tiện nhất?
- Khởi động **Laragon** -> Click **Start All**.
- Mở trình duyệt gõ: `http://blog.test/` để test bài mới, hoặc `http://leanhminh2104.github.io.test/blog/` để duyệt qua mirror chuẩn bị deploy.

---

<p align="center">
  Made with 💜 by <b>Lê Anh Minh</b> • Hosted with GitHub Pages
</p>
