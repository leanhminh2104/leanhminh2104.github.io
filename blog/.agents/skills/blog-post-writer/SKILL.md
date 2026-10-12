---
name: blog-post-writer
description: |
  Skill tiêu chuẩn và toàn diện để viết, định dạng, quản lý và tự động xuất bản bài viết
  cho blog cá nhân leanhminh2104 (https://leanhminh2104.github.io/blog/).
  Cung cấp 1 FORM CẤU TRÚC CHUẨN DUY NHẤT để mọi bài viết tiếp theo luôn đồng bộ 100%
  về mặt giao diện, trải nghiệm đọc, SEO, mục lục (TOC), bình luận Giscus và CI/CD.
  Local: d:\code\laragon\www\blog | Git mirror: d:\code\laragon\www\leanhminh2104.github.io
---

# Blog Post Writer — Cẩm Nang Toàn Diện Về Viết & Tự Động Hóa Bài Viết

Tài liệu này là **bộ quy chuẩn tối cao và đầy đủ nhất** cho blog **leanhminh2104**. Dù là Developer hay AI Assistant khi viết bài mới, **bắt buộc phải tuân theo 1 FORM DUY NHẤT** được hướng dẫn chi tiết dưới đây. Mọi bài viết sẽ có cùng một phong cách thiết kế Cyberpunk Glassmorphism sang trọng, trải nghiệm đọc xuất sắc, tự động sinh mục lục, tự động cập nhật bài trước/sau và tự động deploy qua GitHub Actions.

---

## 📑 MỤC LỤC CẨM NANG
1. [Kiến Trúc & Các Nguyên Tắc Bất Di Bất Dịch](#1-kien-truc--nguyen-tac)
2. [Bộ Khung HTML Chuẩn 100% (The Full Blueprint)](#2-bo-khung-html-chuan)
3. [Thư Viện Component & Snippet Nội Dung Chuẩn](#3-thu-vien-component)
4. [Tiêu Chuẩn Biên Soạn Nội Dung (Editorial Standards)](#4-tieu-chuan-bien-soan)
5. [Quy Trình 5 Bước Xuất Bản & Tự Động Hóa](#5-quy-trinh-xuat-ban)
6. [Cấu Hình Dữ Liệu Bài Viết Trong `blog-data.js`](#6-cau-hinh-du-lieu)
7. [Checklist Kiểm| Thuộc tính | Giá trị quy chuẩn |
|---|---|
| **Domain Trực Tuyến** | `https://leanhminh2104.github.io/blog/` |
| **Môi Trường Local** | `d:\code\laragon\www\blog\` (`http://blog.test/`) |
| **Git Mirror Local** | `d:\code\laragon\www\leanhminh2104.github.io\blog\` |
| **Design Style** | Dark Cyberpunk Glassmorphism (`#06070a`, tím `--primary: #a855f7`, cyan `#38bdf8`) |
| **Phông Chữ** | `Inter` (Nội dung) + `Fira Code` (Code/Monospace) + `Orbitron` (Logo) |
| **Đường Dẫn Tương Đối** | Bài viết nằm ở cấp 2 (`tech/<slug>/` hoặc `life/<slug>/`) $\rightarrow$ Đường dẫn tới `assets` **LUÔN LÀ** `../../assets/...` |
| **Hệ Thống CSS** | Dùng chung 100% `assets/css/blog.css` — Tuyệt đối không viết CSS riêng lẻ hoặc inline |

### ⛔ 5 ĐIỀU CẤM KỴ:
1. **KHÔNG viết CSS inline** (`style="..."`) tùy tiện trong các thẻ nội dung bài viết. Chỉ sử dụng hệ thống class đã được định nghĩa sẵn trong `blog.css`.
2. **KHÔNG viết JavaScript riêng cho từng bài**. Toàn bộ tính năng (Mục lục TOC, thanh tiến trình đọc, nút copy code, bình luận Giscus, tìm kiếm, Header, Footer, Banner dọc, Popup) đã được xử lý tập trung trong `assets/js/core.js` và `assets/js/components.js`.
3. **KHÔNG dùng ảnh cover trừu tượng/vô nghĩa**. Ảnh cover bài viết (tỷ lệ 16:9) phải thể hiện trực quan chủ đề: nhìn cái là biết bài viết nói về điều gì (logo thương hiệu, giao diện thực tế, thiết bị, text chủ đề tiếng Việt rõ ràng).
4. **KHÔNG sửa thủ công `index.html` hoặc các bài viết khác** để thêm link bài mới. Hãy để kịch bản `scripts/master-build.js` tự động làm việc này.
5. **KHÔNG chèn API Key, mật khẩu thật hoặc token bí mật** vào bài viết. Luôn che mờ hoặc dùng ví dụ giả định (`sk-proj-xxxx...`, `ghp_xxxx...`).

---

<a id="2-bo-khung-html-chuan"></a>
## 2. BỘ KHUNG HTML CHUẨN 100% (THE FULL BLUEPRINT)

Khi tạo bài viết mới, tệp `index.html` của bài viết **PHẢI CHỨA ĐỦ 100% CẤU TRÚC SAU ĐÂY** (Mẫu gốc tại `_template/post-template.html`):

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5, user-scalable=yes">
    <meta name="color-scheme" content="dark">
    <meta name="theme-color" content="#06070a">

    <!-- ============================================================
         1. SEO & OPENGRAPH META (Bắt buộc chỉnh sửa)
         ============================================================ -->
    <meta name="description" content="[Mô tả cuốn hút từ 120-160 ký tự chuẩn SEO Google]">
    <meta name="author" content="Lê Anh Minh">
    <meta property="og:type" content="article">
    <meta property="og:title" content="[Tiêu đề bài viết]">
    <meta property="og:description" content="[Mô tả ngắn gọn hiển thị khi chia sẻ Facebook/Zalo]">
    <meta property="og:image" content="https://leanhminh2104.github.io/blog/assets/images/posts/[slug]/cover.jpg">
    <title>[Tiêu đề bài viết] — Lê Anh Minh Blog</title>

    <!-- Google Fonts & FontAwesome -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;700&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- CSS dùng chung toàn Blog (Đường dẫn tương đối 2 cấp) -->
    <link rel="stylesheet" href="../../assets/css/blog.css">
</head>
<body>

<!-- Thanh tiến trình đọc trên cùng -->
<div class="reading-progress" id="reading-progress"></div>

<!-- Nền trời sao động -->
<div class="stars-bg-container">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
</div>

<!-- TOPBAR / HEADER (Tự động tạo bởi components.js) -->
<div id="site-header"></div>

<!-- NỘI DUNG CHÍNH -->
<main class="blog-main">
    <div class="blog-container">

        <!-- ========================================================
             2. BREADCRUMB (Điều hướng phân cấp)
             ======================================================== -->
        <nav class="breadcrumb animate-up" aria-label="Breadcrumb">
            <a href="../../"><i class="fas fa-house"></i> Trang chủ</a>
            <i class="fas fa-chevron-right"></i>
            <a href="../">[Tên chuyên mục: Công nghệ hoặc Cuộc sống]</a>
            <i class="fas fa-chevron-right"></i>
            <span>[Tên rút gọn bài viết]</span>
        </nav>

        <div class="article-layout">

            <!-- CỘT TRÁI: Thân bài viết -->
            <article class="article-body">

                <!-- Article Header Hero -->
                <header class="article-header animate-up">
                    <h1 class="article-title">
                        [Tiêu đề bài viết đầy đủ] 🚀
                    </h1>

                    <div class="article-meta">
                        <span class="article-meta-item"><i class="fas fa-user"></i> Lê Anh Minh</span>
                        <span class="article-meta-item"><i class="fas fa-calendar"></i> [Ngày đăng, VD: 28 tháng 9, 2026]</span>
                        <!-- Tự động tính thời gian đọc dựa trên số từ bởi core.js -->
                        <span class="article-meta-item"><i class="fas fa-clock"></i> <span id="reading-time">đang tính...</span></span>
                    </div>

                    <div class="article-tags">
                        <!-- Chuyên mục: badge-info (Tech) hoặc badge-success (Life) -->
                        <span class="badge badge-info"><i class="fas fa-code"></i> [Chuyên mục]</span>
                        <span class="badge badge-primary">Tag 1</span>
                        <span class="badge badge-primary">Tag 2</span>
                        <span class="badge badge-primary">Tag 3</span>
                    </div>
                </header>

                <!-- ====================================================
                     3. THÂN NỘI DUNG CHUẨN FORM
                     ==================================================== -->
                
                <!-- Đoạn mở đầu (Lead Hook) -->
                <p>
                    [Đoạn mở đầu giới thiệu bài toán thực tế. Nêu khó khăn thường gặp và giải pháp mà bài viết đem lại].
                </p>

                <!-- Hộp Tóm tắt nhanh (Callout Box) -->
                <blockquote>
                    💡 <b>Tóm tắt nhanh:</b> [1-2 câu ngắn gọn cô đọng toàn bộ giá trị cốt lõi của bài viết].
                </blockquote>

                <!-- MỤC 1 (Heading h2 có số thứ tự để TOC tự bắt) -->
                <h2>1. [Tiêu đề mục 1: Bản chất vấn đề / Khái niệm]</h2>
                <p>
                    [Giải thích chi tiết, cơ chế hoạt động hoặc nguyên nhân gốc rễ].
                </p>

                <!-- KHỐI HÌNH ẢNH MINH HỌA CHUẨN CAPTION & WATERMARK (Xem chi tiết Mục 3-D) -->
                <figure class="post-figure">
                    <img src="../../assets/images/posts/[slug]/hinh-1.png" alt="[Mô tả ảnh]" loading="lazy">
                    <figcaption>
                        <em><b>Ảnh 1:</b> [Mô tả chi tiết nội dung ảnh — bắt buộc canh giữa, chữ Ảnh in đậm, toàn bộ in nghiêng]</em>
                    </figcaption>
                </figure>

                <!-- Khối mã nguồn minh họa -->
                <pre><code class="language-php">// [Mã nguồn mẫu chuẩn]
namespace App\Services;

class ExampleService {
    public function execute(): void {
        // Xử lý logic
    }
}</code></pre>

                <!-- MỤC 2 -->
                <h2>2. [Tiêu đề mục 2: Hướng dẫn triển khai từng bước]</h2>
                <p>
                    [Nội dung hướng dẫn chi tiết]:
                </p>
                <ul>
                    <li><b>Bước 1:</b> [Mô tả chi tiết].</li>
                    <li><b>Bước 2:</b> [Mô tả chi tiết kèm lưu ý].</li>
                    <li><b>Bước 3:</b> [Mô tả chi tiết và kiểm tra].</li>
                </ul>

                <!-- MỤC 3 -->
                <h2>3. [Tiêu đề mục 3: Kinh nghiệm thực chiến & Best Practices]</h2>
                <p>
                    [Các cạm bẫy cần tránh và mẹo tối ưu hiệu năng].
                </p>

                <!-- Vị trí Quảng Cáo Giữa Bài (Shopee / TikTok / Sponsor tự động nạp từ blog-data.js) -->
                <div class="ad-slot-container" data-slot="article-mid" style="margin: 2rem 0;"></div>

                <!-- MỤC TỔNG KẾT -->
                <h2>4. Tổng kết</h2>
                <p>
                    [Đoạn kết bài ngắn gọn, nhấn mạnh lại giá trị và gợi ý các chủ đề tiếp theo].
                </p>

                <!-- Vị trí Quảng Cáo Cuối Bài (Shopee / TikTok Hot Deal tự động nạp từ blog-data.js) -->
                <div class="ad-slot-container" data-slot="article-bottom" style="margin: 2rem 0;"></div>

                <hr>

                <!-- ====================================================
                     4. ĐIỀU HƯỚNG BÀI TRƯỚC / BÀI SAU
                     (Được tự động đồng bộ bởi scripts/master-build.js)
                     ==================================================== -->
                <div class="post-nav animate-up">
                    <a href="../../" class="post-nav-card next">
                        <span class="post-nav-label">Khám phá thêm <i class="fas fa-house"></i></span>
                        <span class="post-nav-title">Về trang chủ Blog xem bài viết mới</span>
                    </a>
                </div>

                <!-- ====================================================
                     5. BÌNH LUẬN GISCUS (Kết nối GitHub Discussions)
                     ==================================================== -->
                <div class="article-comments-section" style="margin-top: 3rem;">
                    <h3 style="font-size:1.15rem; color:#fff; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
                        <i class="fas fa-comments" style="color:var(--primary);"></i> Bình luận & Thảo luận
                    </h3>
                    <div id="comments"></div>
                </div>

            </article>

            <!-- CỘT PHẢI: Sticky Sidebar -->
            <aside class="article-sidebar">

                <!-- Mục lục tự động (TOC) -->
                <div class="glass-card toc-card" id="toc-card">
                    <div class="toc-title">
                        <i class="fas fa-list-ul"></i> Mục lục bài viết
                    </div>
                    <ul class="toc-list" id="toc-list">
                        <!-- Tự động sinh bởi core.js từ các thẻ h2, h3 -->
                    </ul>
                </div>

                <!-- Thẻ thông tin tác giả -->
                <div class="glass-card author-card">
                    <div class="author-avatar">👨‍💻</div>
                    <div style="font-weight:700; font-size:0.95rem; color:#fff;">Lê Anh Minh</div>
                    <div style="font-size:0.75rem; color:var(--text-dim); margin-top:0.2rem;">Full-stack Developer</div>
                    <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.6; margin-top:0.6rem;">
                        Chia sẻ kiến thức lập trình, công nghệ và bài học cuộc sống.
                    </p>
                    <a href="https://github.com/leanhminh2104" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width:100%; margin-top:0.85rem; font-size:0.78rem; padding:0.45rem 0.8rem;">
                        <i class="fab fa-github"></i> Theo dõi GitHub
                    </a>
                </div>

                <!-- Vị trí Quảng Cáo / Affiliate Sidebar (Shopee / TikTok Hot Deal) -->
                <div id="sidebar-ad-slot" style="margin-top: 1.5rem;"></div>

            </aside>

        </div><!-- /article-layout -->

    </div><!-- /blog-container -->
</main>

<!-- Chân trang & Mobile Bottom Dock (Tự động tạo bởi components.js) -->
<div id="site-footer"></div>
<div id="site-bottom-dock"></div>

<!-- Nạp Scripts cốt lõi -->
<script src="../../assets/js/blog-data.js"></script>
<script src="../../assets/js/components.js"></script>
<script src="../../assets/js/core.js"></script>
</body>
</html>
```

---

<a id="3-thu-vien-component"></a>
## 3. THƯ VIỆN COMPONENT, HÌNH ẢNH & QUY CHUẨN THIẾT KẾ

### A. Quy chuẩn Ảnh Bìa Đại Diện (Post Cover 16:9)
Mỗi bài viết **bắt buộc phải có ảnh cover tỷ lệ 16:9** lưu tại thư mục `assets/images/posts/[slug]/cover.jpg`:
- **Độ phân giải khuyến nghị:** `1280x720` px hoặc `1200x675` px.
- **Tiêu chuẩn nội dung ảnh cover:**
  - **Trực quan 100%:** Nhìn lướt qua là biết ngay bài viết nói về chủ đề gì.
  - **Yếu tố nhận diện:** Phải chứa logo thương hiệu chính thức (Viettel, Google, YouTube, ACB, Laravel...), giao diện ứng dụng hoặc thiết bị minh họa thực tế.
  - **Typography nổi bật:** Tiêu đề / từ khóa chính in tiếng Việt rõ ràng, tương phản cao, badge tính năng nổi bật (ví dụ: `120GB DATA`, `AI ASSISTANT`, `ELOQUENT TIPS`).
  - ⛔ **Tuyệt đối cấm:** Dùng các khối hình học trừu tượng 3D, cầu xoắn neon vô nghĩa không liên quan đến bài viết.

### B. Quy chuẩn Chú Thích Hình Ảnh (Image Caption)
Toàn bộ hình ảnh minh họa trong bài viết phải đặt trong thẻ `<figure class="post-figure">` với cấu trúc chuẩn:
```html
<figure class="post-figure">
    <img src="../../assets/images/posts/[slug]/ten-anh.png" alt="[Mô tả ảnh]" loading="lazy">
    <figcaption>
        <em><b>Ảnh 1:</b> Thông cáo báo chí chính thức từ Fanpage Thông tin Chính phủ</em>
    </figcaption>
</figure>
```
**Yêu cầu nghiêm ngặt:**
1. Vị trí chú thích: **Canh chính giữa ảnh** (`text-align: center; margin: 0 auto;`).
2. Chữ `Ảnh X:` phải **in đậm** (`<b>Ảnh 1:</b>`).
3. Toàn bộ nội dung chú thích phải **in nghiêng** (`<em>...</em>`).
4. Khung ảnh có bo góc `border-radius: 12px;`, viền kính nhẹ và đổ bóng nổi sang trọng theo đúng chuẩn Cyberpunk.

### C. Đóng Dấu Chìm Bản Quyền Chống Sao Chép (Watermark `DALYMMO.COM`)
Để chống việc các website đối thủ tự động cào bài (clone) và đánh cắp hình ảnh minh họa:
- Toàn bộ ảnh chụp màn hình, ảnh tài liệu trong bài viết **phải được đóng dấu chìm `DALYMMO.COM`**.
- **Quy cách đóng dấu:**
  - Chữ nằm **xiên / chéo 1 góc** khoảng `22° - 25°` vắt ngang qua ảnh.
  - Màu chữ: Trắng có bóng đổ đen mờ nhẹ (`rgba(255, 255, 255, 110)`).
  - Độ mờ: Vừa đủ để bảo vệ bản quyền nhưng **không làm cản trở việc đọc thông tin** trên ảnh.
- **Script Python mẫu tự động đóng watermark (Pillow):**
```python
from PIL import Image, ImageDraw, ImageFont

def add_watermark(input_path, output_path, text="DALYMMO.COM"):
    im = Image.open(input_path).convert("RGBA")
    w, h = im.size
    
    txt_layer = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    draw = ImageDraw.Draw(txt_layer)
    font_size = max(28, int(min(w, h) * 0.055))
    font = ImageFont.truetype("arialbd.ttf", font_size)
    
    # Tạo stamp xoay nghiêng 23 độ
    stamp = Image.new("RGBA", (int(w * 0.8), font_size * 3), (255, 255, 255, 0))
    s_draw = ImageDraw.Draw(stamp)
    s_draw.text((10, 10), text, font=font, fill=(255, 255, 255, 115), stroke_fill=(0, 0, 0, 70), stroke_width=2)
    rotated = stamp.rotate(23, expand=True, resample=Image.BICUBIC)
    
    rw, rh = rotated.size
    txt_layer.paste(rotated, ((w - rw) // 2, (h - rh) // 2), rotated)
    
    out = Image.alpha_composite(im, txt_layer).convert("RGB")
    out.save(output_path, quality=95)
```

### D. Hệ Thống Banner Dọc 2 Bên Màn Hình (Skyscraper Side Banners)
Blog trang bị hệ thống 2 banner dọc cố định ở 2 bên mép màn hình:
1. **Thiết kế lấp đầy khoảng trống:**
   - Chiều rộng co giãn tự động theo kích thước màn hình bằng CSS:
     `width: clamp(200px, calc(50vw - 570px - 36px), 380px);` (~354px trên màn hình Full HD 1920x1080).
   - Nằm chính giữa 2 khoảng trống gutter bên trái và bên phải bài viết.
   - Tự động ẩn trên màn hình `< 1360px` để không đè vào khung bài viết.
2. **Cơ chế Đóng & F5 Tái Xuất Hiện (Dismiss & Refresh Rules):**
   - Khi độc giả bấm nút đóng `[x]`, banner **chỉ tạm ẩn trong 45 giây** (`reappearSeconds: 45`). Sau 45s sẽ tự động mờ dần hiện lại với nội dung banner ngẫu nhiên.
   - **Tuyệt đối KHÔNG lưu vĩnh viễn vào `sessionStorage`:** Khi độc giả F5 (tải lại trang) hoặc chuyển trang, **banner lập tức hiển thị lại đầy đủ**.
3. **Cấu hình dữ liệu trong `assets/js/blog-data.js`:**
   Được quản lý trong `BLOG_DATA.ads.sideSkyscrapers`:
   - `enabled: true`
   - `reappearSeconds: 45`
   - `left`: Danh sách các banner bên trái (random luân phiên sau 35s).
   - `right`: Danh sách các banner bên phải (random luân phiên sau 35s).

### E. Popup Quảng Cáo Nổi (Floating Ad Popup)
- Được cấu hình tại `BLOG_DATA.ads.floatingPopup`.
- Kích thước thẻ hiển thị to rõ, sang trọng: `max-width: 580px`, padding `2rem 2.2rem`, icon kích thước lớn `72x72px`, tiêu đề `1.25rem` font-weight 800, nút bấm CTA lớn `1.02rem`.
- Cơ chế xuất hiện sau độ trễ `delaySeconds: 15`.

### F. Khối Code chuẩn (Code Block)
Luôn đặt class `language-{ngôn_ngữ}` trên thẻ `<code>`. Hệ thống `core.js` sẽ tự động hiển thị nhãn ngôn ngữ và gắn nút **Copy Mã**:
```html
<pre><code class="language-bash"># Cài đặt qua Composer
composer require laravel/sanctum</code></pre>
```

### G. Hộp Ghi Chú & Cảnh Báo (Callout / Alert Boxes)
- **Ghi chú / Mẹo (Tip):**
```html
<blockquote>
    💡 <b>Mẹo tối ưu:</b> Luôn sử dụng <code>select()</code> để chỉ lấy các cột cần thiết thay vì <code>select *</code>.
</blockquote>
```

- **Cảnh báo quan trọng (Warning):**
```html
<blockquote style="border-left-color: var(--warning);">
    ⚠️ <b>Lưu ý quan trọng:</b> Hãy đảm bảo đã sao lưu cơ sở dữ liệu trước khi chạy lệnh migration này.
</blockquote>
```

- **Nguy hiểm / Bảo mật (Security / Danger):**
```html
<blockquote style="border-left-color: var(--danger);">
    🛑 <b>Cảnh báo bảo mật:</b> Tuyệt đối không commit tệp <code>.env</code> lên GitHub công khai!
</blockquote>
```

### H. Vị trí Chèn Quảng Cáo Nội Dung (Article Ads)
- Giữa bài: `<div class="ad-slot-container" data-slot="article-mid" style="margin: 2rem 0;"></div>`
- Cuối bài: `<div class="ad-slot-container" data-slot="article-bottom" style="margin: 2rem 0;"></div>`
- Sidebar: `<div id="sidebar-ad-slot" style="margin-top: 1.5rem;"></div>`

---

<a id="4-tieu-chuan-bien-soan"></a>
## 4. TIÊU CHUẨN BIÊN SOẠN NỘI DUNG (EDITORIAL STANDARDS)

### 1. Công thức đặt Tiêu đề (Headline Formula):
- **Cấu trúc:** `[Số lượng hoặc Hành động] + [Từ khóa chính] + [Lợi ích thực tế] + [Emoji]`
- **Ví dụ chuẩn:**
  - `Gói Viettel YT150, YT200 Tặng YouTube Premium: Sự Thật & Lưu Ý 📱`
  - `Nâng Cấp Google Gemini Advanced 18 Tháng Bản Quyền: Review & Đánh Giá Chi Tiết ✨`
  - `Cơ Chế Duy Trì YouTube Premium Và Cách Fix Lỗi Family Khi Bị Đổi Quốc Gia 🌍`
  - `Cấu hình thông báo biến động số dư ACB về Email & API 📲`

### 2. Định dạng Slug URL:
- Chỉ dùng chữ thường, không dấu, ngăn cách bằng dấu gạch ngang (`-`).
- Không chứa ký tự đặc biệt, không dài quá 6-8 từ.
- Ví dụ: `tech/viettel-yt150-yt200-youtube-premium/`, `tech/gemini-pro-18-thang-jio/`.

### 3. Quy chuẩn Đánh số Heading (`<h2>` và `<h3>`):
- Mọi thẻ `<h2>` phải có số thứ tự: `1. ...`, `2. ...`, `3. ...`, `4. Tổng kết`.
- Giúp mục lục tự động (TOC) phân cấp rõ ràng và hỗ trợ người đọc cuộn tới đúng mục quan tâm.

---

<a id="5-quy-trinh-xuat-ban"></a>
## 5. QUY TRÌNH 5 BƯỚC XUẤT BẢN & TỰ ĐỘNG HÓA

```
[ Bước 1: Tạo thư mục bài & ảnh ] ──▶ [ Bước 2: Viết nội dung HTML ] ──▶ [ Bước 3: Đăng ký blog-data.js ]
                                                                                   │
[ Bước 5: Deploy GitHub ]         ◀── [ Bước 4: Chạy master-build.js ] ◀───────────┘
```

### Bước 1: Tạo thư mục bài viết & tài nguyên ảnh
```bash
# Tạo thư mục bài viết
mkdir "d:\code\laragon\www\blog\tech\docker-tips"
copy "d:\code\laragon\www\blog\_template\post-template.html" "d:\code\laragon\www\blog\tech\docker-tips\index.html"

# Tạo thư mục ảnh riêng
mkdir "d:\code\laragon\www\blog\assets\images\posts\docker-tips"
# Chuẩn bị ảnh cover.jpg (16:9) và ảnh minh họa đã đóng watermark DALYMMO.COM
```

### Bước 2: Soạn thảo nội dung
Mở tệp `index.html` vừa tạo, điền tiêu đề, mô tả SEO, ảnh minh họa chuẩn `<figure>` và nội dung theo đúng **Form Mục 2**.

### Bước 3: Đăng ký vào `assets/js/blog-data.js`
Thêm đối tượng vào đầu mảng `posts` (BẮT BUỘC có trường `cover`):
```javascript
{
    id: "docker-tips",
    title: "10 Docker Tips Giúp Developer Tối Ưu Môi Trường Dev",
    slug: "docker-tips",
    category: "tech",
    categoryName: "Công nghệ",
    path: "tech/docker-tips/",
    cover: "assets/images/posts/docker-tips/cover.jpg",
    date: "2026-10-12",
    formattedDate: "12 Th10, 2026",
    readTime: "6 phút",
    excerpt: "Những kinh nghiệm thực tế giúp tối ưu dung lượng image, tăng tốc build và quản lý container chuyên nghiệp.",
    tags: ["Docker", "DevOps", "Container", "Tips"],
    isNew: true,
    icon: "fa-server"
},
```

### Bước 4: Chạy Master Automation Script
Mở Terminal và thực thi:
```bash
node scripts/master-build.js
```
Script sẽ tự động:
1. Điền thẻ bài viết mới vào trang chủ `index.html` và trang danh mục `tech/index.html` (kèm cover 16:9).
2. Tự động liên kết nút "Bài trước / Bài sau" giữa bài viết này và các bài viết khác.
3. Sinh mới `sitemap.xml` và `robots.txt` chuẩn SEO Google.
4. Sinh mới kênh `feed.xml` chuẩn RSS 2.0.
5. Cập nhật danh sách bài viết mới vào `README.md`.

### Bước 5: Deploy an toàn lên GitHub
Chạy quy trình đồng bộ sang Git mirror và push lên GitHub:
```bash
deploy.bat
```

---

<a id="6-cau-hinh-du-lieu"></a>
## 6. CẤU HÌNH DỮ LIỆU BÀI VIẾT TRONG `blog-data.js`

Mỗi bài viết khi khai báo vào `assets/js/blog-data.js` bắt buộc phải có đủ 12 thuộc tính sau:

| Thuộc tính | Kiểu | Mô tả & Ví dụ |
|---|---|---|
| `id` | string | Định danh duy nhất (trùng slug): `"docker-tips"` |
| `title` | string | Tiêu đề bài viết đầy đủ |
| `slug` | string | Slug URL bài viết: `"docker-tips"` |
| `category` | string | `"tech"` (Công nghệ) hoặc `"life"` (Cuộc sống) |
| `categoryName` | string | `"Công nghệ"` hoặc `"Cuộc sống"` |
| `path` | string | Đường dẫn tương đối từ gốc: `"tech/docker-tips/"` |
| `cover` | string | Đường dẫn ảnh cover 16:9: `"assets/images/posts/docker-tips/cover.jpg"` |
| `date` | string | Ngày chuẩn ISO: `"2026-10-12"` |
| `formattedDate`| string | Ngày hiển thị tiếng Việt: `"12 Th10, 2026"` |
| `readTime` | string | Thời gian đọc ước tính: `"6 phút"` |
| `excerpt` | string | Tóm tắt ngắn gọn 1-2 câu hiển thị ở danh sách bài viết |
| `tags` | array | Mảng 3-5 thẻ tag: `["Docker", "DevOps", "Tips"]` |
| `isNew` | boolean | `true` nếu là bài mới nhất để hiện nhãn vàng "Mới" |
| `icon` | string | Class icon FontAwesome: `"fa-server"`, `"fa-bolt"` |

---

<a id="7-checklist-kiem-tra"></a>
## 7. CHECKLIST KIỂM TRA CHẤT LƯỢNG TRƯỚC KHI DEPLOY

Trước khi chạy `deploy.bat`, hãy điểm qua danh sách kiểm tra sau:

- [ ] **SEO Meta:** Đã điền `title`, `meta description` và `og:image` (trỏ tới cover 16:9) chưa?
- [ ] **Ảnh Cover 16:9:** Đã có ảnh bìa tại `assets/images/posts/[slug]/cover.jpg` và khai báo trường `cover` trong `blog-data.js` chưa? Ảnh có nhận diện thương hiệu rõ ràng không?
- [ ] **Watermark Bản Quyền:** Toàn bộ ảnh minh họa trong bài viết đã được đóng dấu mờ `DALYMMO.COM` nghiêng chưa?
- [ ] **Caption Ảnh:** Toàn bộ chú thích ảnh đã được đặt trong `<figure><figcaption>`, canh chính giữa, chữ `Ảnh X:` in đậm, toàn bộ in nghiêng chưa?
- [ ] **Breadcrumb & CSS:** Đường dẫn Breadcrumb đúng danh mục (`../`), đường dẫn CSS/JS đúng 2 cấp (`../../assets/...`) không?
- [ ] **Heading TOC:** Các thẻ `<h2>` đã có số thứ tự `1.`, `2.`, `3.` chưa?
- [ ] **Master Build:** Đã chạy `node scripts/master-build.js` thành công chưa?
- [ ] **Bảo mật:** Không có mật khẩu, token thật, API key thật nào trong bài viết.
- [ ] **Kiểm tra trên Mobile:** Mở trình duyệt F12 (chế độ Responsive 360px), bài viết hiển thị gọn gàng, banner dọc tự ẩn, không bị tràn viền ngang.

