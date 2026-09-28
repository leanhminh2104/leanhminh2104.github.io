# 🌟 leanhminh2104.github.io — Personal Website & Blog Hub

<p align="center">
  <img src="https://img.shields.io/badge/GitHub%20Pages-Live-success?style=for-the-badge&logo=github&logoColor=white" alt="Live Badge" />
  <img src="https://img.shields.io/badge/Author-Lê%20Anh%20Minh-purple?style=for-the-badge" alt="Author Badge" />
  <img src="https://img.shields.io/badge/Security-Protected-blue?style=for-the-badge&logo=securityscorecard&logoColor=white" alt="Security" />
</p>

Repository cá nhân và website chính thức của **Lê Anh Minh** (`leanhminh2104`), được xây dựng và xuất bản trực tiếp qua GitHub Pages.

---

## 🚀 Các Chuyên Mục & Dự Án Trọng Tâm

### 1. 🌌 [Personal Blog (`/blog/`)](./blog/)
Blog cá nhân chia sẻ kiến thức chuyên sâu về công nghệ thông tin, kiến trúc phần mềm, Laravel/PHP, thủ thuật tối ưu và đời sống Developer.
- **URL Trực tiếp:** [https://leanhminh2104.github.io/blog/](https://leanhminh2104.github.io/blog/)
- **Đặc điểm:** Giao diện Dark Cyberpunk Glassmorphism, 100% Static HTML/CSS/JS không phụ thuộc framework cồng kềnh, tích hợp hệ thống kiểm tra bảo mật tự động và trợ lý AI Skills.
- 📖 [Đọc tài liệu chi tiết Blog tại đây](./blog/README.md)

### 2. 💼 [Trang Giới Thiệu & Danh Mục Tiện Ích (`/`)](./index.html)
Trang portfolio cá nhân, cung cấp tiện ích, công cụ và liên kết đến các dịch vụ trực tuyến.

### 3. 🛠️ Các dự án & Hướng dẫn kỹ thuật khác
- **`Configure-ACB-notifications-to-email/`**: Hướng dẫn cấu hình thông báo ngân hàng ACB qua email.
- **`instructions/`**: Các tài liệu và hướng dẫn vận hành khác.

---

## 🗂️ Cấu trúc Kho Lưu Trữ (Repository Tree)

```
leanhminh2104.github.io/
├── .github/                           # GitHub Actions workflows & config
├── .gitignore                         # Bộ lọc bảo mật ngăn chặn lộ secret / files rác
├── index.html                         # Landing page & Portfolio gốc
├── blog/                              # 🌌 Sub-system: Blog cá nhân hoàn chỉnh
│   ├── assets/                        # CSS, JS, Fonts dùng chung
│   │   ├── css/ (blog.css, stars.css, design-system.css, ...)
│   │   └── js/ (core.js, ...)
│   ├── tech/                          # Chuyên mục Công nghệ & Bài viết Tech
│   ├── life/                          # Chuyên mục Cuộc sống & Bài viết Life
│   ├── _template/                     # Khuôn mẫu chuẩn cho bài viết mới
│   ├── index.html                     # Trang chủ Blog
│   └── README.md                      # Hướng dẫn chi tiết hệ thống Blog
├── Configure-ACB-notifications-to-email/
├── instructions/
└── README.md                          # Tài liệu chính của Repository
```

---

## 🛡️ Chính sách Bảo Mật (Security Policy)

Repository áp dụng các nguyên tắc bảo mật nghiêm ngặt:
- **Không lưu trữ Secret Keys:** Toàn bộ API token, private key (`.pem`, `.key`), credentials và tệp cấu hình môi trường (`.env`) đều được kiểm tra trước khi push và tự động loại trừ bởi `.gitignore`.
- **Pre-deploy Automated Scan:** Quy trình triển khai luôn quét mã nguồn nhằm phát hiện rò rỉ token ngoài ý muốn trước khi commit.

---

<p align="center">
  © 2026 <b>Lê Anh Minh</b> (leanhminh2104). Mọi quyền được bảo lưu.
</p>


### 📝 Bài viết mới nhất trên Blog

<!-- BLOG-POSTS-START -->
- [Cơ Chế Duy Trì Gói YouTube Premium & Hướng Dẫn Sửa Lỗi Gia Đình Google Family](https://leanhminh2104.github.io/blog/tech/co-che-duy-tri-youtube-premium-va-fix-loi-family/) — *2026-09-28* `Công nghệ` (6 phút)
- [Hướng Dẫn Cấu Hình Thông Báo Biến Động Số Dư ACB Về Email & API Ngân Hàng](https://leanhminh2104.github.io/blog/tech/cau-hinh-thong-bao-acb-email/) — *2026-03-26* `Công nghệ` (7 phút)
- [Hướng Dẫn Lấy App Password (Mật Khẩu Ứng Dụng) Google Cho Developer](https://leanhminh2104.github.io/blog/tech/lay-app-password-google/) — *2026-03-25* `Công nghệ` (5 phút)
- [10 Laravel Tips & Tricks Giúp Tối Ưu Code Của Bạn](https://leanhminh2104.github.io/blog/tech/laravel-tips/) — *2026-03-24* `Công nghệ` (5 phút)
- [Một Ngày Của Developer: Cân Bằng Giữa Code Và Cuộc Sống](https://leanhminh2104.github.io/blog/life/cuoc-song-dev/) — *2026-03-20* `Cuộc sống` (4 phút)
<!-- BLOG-POSTS-END -->
