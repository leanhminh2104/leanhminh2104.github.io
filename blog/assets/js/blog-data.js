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
        
        // Danh sách quảng cáo đa nguồn (Shopee, TikTok Shop, Google Ads, Nhà tài trợ, Custom HTML)
        banners: [
            // 1. TIẾP THỊ LIÊN KẾT SHOPEE AFFILIATE (Đồ công nghệ / Bàn phím / Phụ kiện)
            {
                id: "shopee-keychron",
                platform: "shopee",             // Tự động áp dụng theme Cam Shopee chuẩn nhận diện
                slot: ["article-bottom", "sidebar"], // Vị trí: Cuối bài viết & Sidebar PC
                badge: "Shopee Deal",
                title: "Bàn Phím Cơ Không Dây Keychron K2 Pro QMK/VIA",
                desc: "Layout 75%, Switch Gateron Pro hot-swap, kết nối Bluetooth 5.1 & Type-C, gõ êm mượt tối ưu cho Developer.",
                price: "1.890.000₫",
                originalPrice: "2.350.000₫",
                discount: "-20%",
                ctaText: "Săn Deal Trên Shopee",
                link: "https://shopee.vn/",     // Link tiếp thị liên kết Shopee của bạn
                icon: "fa-bag-shopping",
                accentColor: "#ee4d2d"
            },
            // 2. TIẾP THỊ LIÊN KẾT TIKTOK SHOP (Góc Setup / Đồ công nghệ / Đèn màn hình)
            {
                id: "tiktok-desklight",
                platform: "tiktok",             // Tự động áp dụng viền Neon Cyberpunk Hồng / Cyan
                slot: ["sidebar", "article-bottom"], // Vị trí: Sidebar PC và Cuối bài viết Mobile/PC
                badge: "TikTok Shop",
                title: "Đèn Treo Màn Hình Chống Mỏi Mắt Xiaomi Mijia",
                desc: "Chiếu sáng góc hẹp không gây lóa màn hình, điều khiển núm xoay không dây 2.4GHz sang trọng.",
                price: "689.000₫",
                originalPrice: "890.000₫",
                discount: "-22%",
                ctaText: "Mua Trên TikTok Shop",
                link: "https://www.tiktok.com/", // Link tiếp thị liên kết TikTok của bạn
                icon: "fa-tiktok",
                accentColor: "#00f2fe"
            },
            // 3. QUẢNG CÁO TỰ ĐỘNG GOOGLE ADSENSE
            {
                id: "adsense-responsive",
                platform: "adsense",            // Tự động tải quảng cáo phản hồi của Google
                slot: "article-bottom",
                adSlot: "1234567890",            // Mã Slot trong Google AdSense của bạn
                badge: "Quảng cáo Google"
            },
            // 4. KHÓA HỌC / DỊCH VỤ DEV (Tài trợ giữa bài viết)
            {
                id: "banner-course",
                platform: "sponsor",
                slot: "article-mid",            // Vị trí: Giữa các mục trong bài viết
                badge: "Đề xuất",
                title: "Khóa Học Thiết Kế Hệ Thống & Microservices Thực Chiến",
                desc: "Nâng cao tư duy kiến trúc, tối ưu SQL Query và xây dựng hệ thống chịu tải hàng triệu request.",
                ctaText: "Khám Phá Ngay",
                link: "https://github.com/leanhminh2104",
                icon: "fa-graduation-cap",
                accentColor: "#c084fc"
            },
            // 5. BANNER TRANG CHỦ / FEED (Cloud VPS / Hosting)
            {
                id: "banner-hosting",
                platform: "sponsor",
                slot: "feed",                   // Vị trí: Giữa danh sách bài viết trang chủ
                badge: "Tài trợ",
                title: "Cloud VPS & Server Tốc Độ Cao Cho Lập Trình Viên",
                desc: "Hạ tầng NVMe SSD siêu tốc, băng thông không giới hạn, tối ưu hóa cho Laravel, NodeJS & Docker.",
                ctaText: "Xem Ưu Đãi 50%",
                link: "https://github.com/leanhminh2104",
                icon: "fa-server",
                accentColor: "#38bdf8"
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
