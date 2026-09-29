/**
 * ============================================================
 * BLOG DATA STORE — CƠ SỞ DỮ LIỆU ĐIỀU HƯỚNG & BÀI VIẾT
 * ============================================================
 * File này quản lý tập trung:
 * - Thông tin blog (site, tác giả, mạng xã hội)
 * - Toàn bộ danh mục (categories)
 * - Toàn bộ bài viết (posts) kèm đường dẫn, ngày, tags, lượt đọc
 * - Cấu hình quảng cáo & nhà tài trợ (AdSense & Sponsor Banners)
 * 
 * Bất cứ khi nào thêm bài viết mới hoặc chuyên mục mới,
 * chỉ cần khai báo vào đây, toàn bộ Header, Menu, Drawer, Dock,
 * Bộ tìm kiếm và Footer sẽ TỰ ĐỘNG CẬP NHẬT 100%!
 */

window.BLOG_DATA = {
    // 1. Cấu hình trang & tác giả
    site: {
        name: "leanhminh2104",
        title: "leanhminh2104 — Blog",
        tagline: "Chia sẻ về Lập trình, Công nghệ & Cuộc sống",
        author: "Lê Anh Minh",
        github: "https://github.com/leanhminh2104",
        facebook: "https://facebook.com/",
        email: "contact@leanhminh.dev",
        logo: "assets/images/logo/logo.svg",
        year: 2026
    },

    // 2. Danh mục chuyên mục (Tự động sinh menu PC, Mobile & Filter)
    categories: [
        {
            id: "all",
            name: "Tất cả",
            slug: "",
            path: "",
            icon: "fa-border-all",
            color: "var(--primary)",
            desc: "Toàn bộ bài viết mới nhất trên blog"
        },
        {
            id: "tech",
            name: "Công nghệ",
            slug: "tech",
            path: "tech/",
            icon: "fa-code",
            color: "#38bdf8",
            desc: "Laravel, PHP, JavaScript, DevOps & Kiến trúc hệ thống"
        },
        {
            id: "life",
            name: "Cuộc sống",
            slug: "life",
            path: "life/",
            icon: "fa-heart",
            color: "#34d399",
            desc: "Tâm sự nghề Dev, quản lý năng lượng & cân bằng cuộc sống"
        }
    ],

    // 3. Cơ sở dữ liệu bài viết (Tự động cấp dữ liệu cho Search, Menu, Danh sách, Gợi ý)
    posts: [
        {
            id: "gemini-pro-18-thang-jio",
            title: "Gemini Pro 18 Tháng Giá Sốc 45K — Trọn Bộ Đặc Quyền Google One Pro 🤖",
            slug: "gemini-pro-18-thang-jio",
            category: "tech",
            categoryName: "Công nghệ",
            path: "tech/gemini-pro-18-thang-jio/",
            date: "2026-09-29",
            formattedDate: "29 Th09, 2026",
            readTime: "5 phút",
            excerpt: "Sở hữu trọn bộ Google One AI Pro 18 tháng chỉ 45.000₫. Nhận ngay Gemini Advanced, bộ nhớ đám mây, Google Photos Magic Editor và tặng kèm YouTube Premium Lite.",
            tags: ["Google One Pro", "Gemini Advanced", "YouTube Premium Lite", "Giá rẻ", "Deal hot"],
            isNew: true,
            icon: "fa-robot"
        },
        {
            id: "co-che-duy-tri-youtube-premium-va-fix-loi-family",
            title: "Cơ Chế Duy Trì Gói YouTube Premium & Hướng Dẫn Sửa Lỗi Gia Đình Google Family",
            slug: "co-che-duy-tri-youtube-premium-va-fix-loi-family",
            category: "tech",
            categoryName: "Công nghệ",
            path: "tech/co-che-duy-tri-youtube-premium-va-fix-loi-family/",
            date: "2026-09-28",
            formattedDate: "28 Th09, 2026",
            readTime: "6 phút",
            excerpt: "Nắm rõ cơ chế luân chuyển nhóm YouTube Premium tránh quét Household và cách fix triệt để lỗi không cùng quốc gia, không nhận được lời mời Family.",
            tags: ["YouTube Premium", "Google Family", "Thủ thuật", "Fix lỗi", "Google Payments"],
            isNew: true,
            icon: "fa-brands fa-youtube"
        },
        {
            id: "cau-hinh-thong-bao-acb-email",
            title: "Hướng Dẫn Cấu Hình Thông Báo Biến Động Số Dư ACB Về Email & API Ngân Hàng",
            slug: "cau-hinh-thong-bao-acb-email",
            category: "tech",
            categoryName: "Công nghệ",
            path: "tech/cau-hinh-thong-bao-acb-email/",
            date: "2026-03-26",
            formattedDate: "26 Th03, 2026",
            readTime: "7 phút",
            excerpt: "Từng bước thiết lập nhận thông báo biến động số dư ACB ONE về Gmail và kết nối webhook xử lý nạp tiền tự động 24/7.",
            tags: ["ACB", "Banking API", "Gmail", "Webhook", "Automation"],
            isNew: true,
            icon: "fa-mobile-screen-button"
        },
        {
            id: "lay-app-password-google",
            title: "Hướng Dẫn Lấy App Password (Mật Khẩu Ứng Dụng) Google Cho Developer",
            slug: "lay-app-password-google",
            category: "tech",
            categoryName: "Công nghệ",
            path: "tech/lay-app-password-google/",
            date: "2026-03-25",
            formattedDate: "25 Th03, 2026",
            readTime: "5 phút",
            excerpt: "Cách tạo App Password 16 ký tự của Gmail để gửi nhận email qua SMTP/IMAP trong Laravel, WordPress, NodeJS.",
            tags: ["Google", "App Password", "SMTP", "Security", "Gmail"],
            isNew: true,
            icon: "fa-key"
        },
        {
            id: "laravel-tips",
            title: "10 Laravel Tips & Tricks Giúp Tối Ưu Code Của Bạn",
            slug: "laravel-tips",
            category: "tech",
            categoryName: "Công nghệ",
            path: "tech/laravel-tips/",
            date: "2026-03-24",
            formattedDate: "24 Th03, 2026",
            readTime: "5 phút",
            excerpt: "Tổng hợp 10 mẹo hữu ích trong Laravel giúp code gọn gàng hơn, tối ưu query database và tăng hiệu suất ứng dụng PHP trong thực tế.",
            tags: ["Laravel", "PHP", "Performance", "Tips"],
            isNew: true,
            icon: "fa-bolt"
        },
        {
            id: "cuoc-song-dev",
            title: "Một Ngày Của Developer: Cân Bằng Giữa Code Và Cuộc Sống",
            slug: "cuoc-song-dev",
            category: "life",
            categoryName: "Cuộc sống",
            path: "life/cuoc-song-dev/",
            date: "2026-03-20",
            formattedDate: "20 Th03, 2026",
            readTime: "4 phút",
            excerpt: "Chia sẻ chân thực về hành trình làm dev, cách quản lý năng lượng, phòng tránh burnout và nuôi dưỡng niềm vui lập trình dài hạn.",
            tags: ["Life", "Developer", "Mindset", "Health"],
            isNew: false,
            icon: "fa-coffee"
        }
    ],

    // 4. TRUNG TÂM QUẢN LÝ QUẢNG CÁO & AFFILIATE TẬP TRUNG (ALL-IN-ONE ADS ENGINE)
    // Chỉ cần khai báo tại đây, toàn bộ bài viết, chuyên mục & trang chủ TỰ ĐỘNG nhận diện 100%!
    ads: {
        enabled: true,                  // Bật/Tắt quảng cáo trên toàn bộ website (true / false)
        autoInjectInArticles: true,     // Tự động chèn quảng cáo vào mọi bài viết (cuối bài & sidebar) nếu bài chưa gắn thẻ
        adsensePublisherId: "",         // Google AdSense ID của bạn (ví dụ: "ca-pub-1234567890123456")
        
        // Cấu hình Popup Quảng Cáo Nổi (Floating Popup Ad)
        popup: {
            enabled: true,              // Bật/Tắt hiển thị popup nổi (true / false)
            intervalMinutes: 30,        // 30 phút hiển thị 1 lần (lưu trữ theo LocalStorage)
            delaySeconds: 3,            // Xuất hiện sau khi người dùng vào trang 3 giây (trải nghiệm mượt)
            bannerId: null              // null = Tự động xoay vòng ngẫu nhiên từ banners; Hoặc điền id cụ thể
        },
        
        // Danh sách ưu đãi & đề xuất dịch vụ chuẩn xác theo hệ sinh thái công nghệ
        banners: [
            // 1. DỊCH VỤ YOUTUBE PREMIUM & GOOGLE FAMILY (Rất liên quan đến các bài viết Google & giải trí)
            {
                id: "service-youtube-family",
                platform: "sponsor",
                slot: ["article-mid", "article-bottom", "sidebar"],
                badge: "Ưu Đãi Hot",
                title: "Gói YouTube Premium Chính Chủ & Hỗ Trợ Nhóm Gia Đình",
                desc: "Xem video không quảng cáo, nghe nhạc tắt màn hình, xử lý triệt để lỗi không cùng quốc gia và bảo hành 24/7.",
                price: "Từ 25.000₫/tháng",
                ctaText: "Xem Chi Tiết & Hỗ Trợ",
                link: "tech/co-che-duy-tri-youtube-premium-va-fix-loi-family/",
                icon: "fa-brands fa-youtube",
                accentColor: "#ef4444",
                tags: ["youtube", "google", "tech", "entertainment"]
            },
            // 2. DỊCH VỤ CAPCUT PRO & CANVA PRO (Công cụ đồ họa & video AI hot nhất)
            {
                id: "service-capcut-canva",
                platform: "sponsor",
                slot: ["article-mid", "sidebar", "article-bottom"],
                badge: "Công Cụ AI Hot",
                title: "Tài Khoản CapCut Pro & Canva Pro Bản Quyền",
                desc: "Mở khóa toàn bộ template VIP, hiệu ứng AI thông minh, xóa phông 1 chạm và xuất video 4K 60fps siêu nét.",
                price: "Chỉ từ 45.000₫",
                ctaText: "Nhận Ưu Đãi Ngay",
                link: "https://zalo.me/", // Hoặc kênh liên hệ của Admin
                icon: "fa-wand-magic-sparkles",
                accentColor: "#00f2fe",
                tags: ["ai", "video", "design", "tech"]
            },
            // 3. ĐẶC QUYỀN GEMINI ADVANCED & GOOGLE ONE 18 THÁNG
            {
                id: "service-gemini-pro",
                platform: "sponsor",
                slot: ["feed", "sidebar", "article-bottom"],
                badge: "Deal Độc Quyền",
                title: "Gemini Advanced 18 Tháng — Trọn Bộ Đặc Quyền Google One Pro",
                desc: "Bộ nhớ đám mây 2TB, context 1.000.000 tokens, tạo ảnh Imagen 3 không giới hạn và tặng kèm YouTube Premium Lite.",
                price: "45.000₫ / 18 tháng",
                ctaText: "Khám Phá Ngay",
                link: "tech/gemini-pro-18-thang-jio/",
                icon: "fa-robot",
                accentColor: "#a855f7",
                tags: ["google", "ai", "gemini", "tech"]
            },
            // 4. TIẾP THỊ LIÊN KẾT: ĐÈN TREO MÀN HÌNH CHỐNG MỎI MẮT
            {
                id: "tiktok-desklight",
                platform: "tiktok",
                slot: ["sidebar", "article-bottom"],
                badge: "Góc Setup Dev",
                title: "Đèn Treo Màn Hình Chống Mỏi Mắt Xiaomi Mijia",
                desc: "Chiếu sáng góc hẹp chống chói màn hình, điều khiển núm xoay không dây 2.4GHz sang trọng cho góc làm việc.",
                price: "689.000₫",
                originalPrice: "890.000₫",
                discount: "-22%",
                ctaText: "Mua Trên TikTok Shop",
                link: "https://www.tiktok.com/",
                icon: "fa-tiktok",
                accentColor: "#00f2fe"
            },
            // 5. TIẾP THỊ LIÊN KẾT: BÀN PHÍM CƠ CHO DÂN LẬP TRÌNH & ĐỒ HỌA
            {
                id: "shopee-keychron",
                platform: "shopee",
                slot: ["sidebar"],
                badge: "Shopee Deal",
                title: "Bàn Phím Cơ Không Dây Keychron K2 Pro QMK/VIA",
                desc: "Layout 75%, Switch Gateron Pro hot-swap, gõ êm mượt tối ưu cho Developer & Content Creator.",
                price: "1.890.000₫",
                originalPrice: "2.350.000₫",
                discount: "-20%",
                ctaText: "Săn Deal Trên Shopee",
                link: "https://shopee.vn/",
                icon: "fa-bag-shopping",
                accentColor: "#ee4d2d"
            }
        ]
    },

    // 5. Cấu hình Bình luận Giscus (GitHub Discussions)
    comments: {
        enabled: true,
        repo: "leanhminh2104/leanhminh2104.github.io",
        repoId: "R_kgDOPJsGaQ",
        category: "General",
        categoryId: "", // Tự động nhận diện sau khi cài Giscus App
        mapping: "pathname",
        theme: "dark_dimmed",
        lang: "vi"
    }
};
