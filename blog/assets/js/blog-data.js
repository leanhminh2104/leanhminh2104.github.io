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

    // 4. Cấu hình Quảng cáo & Mạng liên kết Đa Nguồn (Shopee, TikTok, AdSense, Sponsor)
    ads: {
        enabled: true,
        // Google AdSense Publisher ID (khi có thì điền vào đây)
        adsensePublisherId: "",
        
        // Danh sách quảng cáo & thẻ Affiliate tự động theo slot hoặc ID
        banners: [
            // 1. Banner tài trợ trang chủ (Feed)
            {
                id: "banner-hosting",
                platform: "sponsor",
                slot: "feed",
                badge: "Tài trợ",
                title: "Cloud VPS & Server Tốc Độ Cao Cho Lập Trình Viên",
                desc: "Hạ tầng NVMe SSD siêu tốc, băng thông không giới hạn, tối ưu hóa cho Laravel, NodeJS & Docker.",
                ctaText: "Xem Ưu Đãi 50%",
                link: "https://github.com/leanhminh2104",
                icon: "fa-server",
                accentColor: "#38bdf8"
            },
            // 2. Affiliate Shopee (Phụ kiện / Đồ công nghệ)
            {
                id: "shopee-keychron",
                platform: "shopee",
                slot: "article-bottom",
                badge: "Shopee Deal",
                title: "Bàn Phím Cơ Không Dây Keychron K2 Pro QMK/VIA",
                desc: "Layout 75%, Switch Gateron Pro hot-swap, kết nối Bluetooth 5.1 & Type-C, gõ êm mượt tối ưu cho Developer.",
                price: "1.890.000₫",
                originalPrice: "2.350.000₫",
                discount: "-20%",
                ctaText: "Săn Deal Trên Shopee",
                link: "https://shopee.vn/",
                icon: "fa-bag-shopping",
                accentColor: "#ee4d2d"
            },
            // 3. Affiliate TikTok Shop (Góc Setup / Đồ công nghệ)
            {
                id: "tiktok-desklight",
                platform: "tiktok",
                slot: "sidebar",
                badge: "TikTok Shop",
                title: "Đèn Treo Màn Hình Chống Mỏi Mắt Xiaomi Mijia",
                desc: "Chiếu sáng góc hẹp không gây lóa màn hình, điều khiển núm xoay không dây 2.4GHz sang trọng.",
                price: "689.000₫",
                originalPrice: "890.000₫",
                discount: "-22%",
                ctaText: "Mua Trên TikTok Shop",
                link: "https://www.tiktok.com/",
                icon: "fa-tiktok",
                accentColor: "#00f2fe"
            },
            // 4. Khóa học / Dịch vụ Dev (Giữa bài viết)
            {
                id: "banner-course",
                platform: "sponsor",
                slot: "article-mid",
                badge: "Đề xuất",
                title: "Khóa Học Thiết Kế Hệ Thống & Microservices Thực Chiến",
                desc: "Nâng cao tư duy kiến trúc, tối ưu SQL Query và xây dựng hệ thống chịu tải hàng triệu request.",
                ctaText: "Khám Phá Ngay",
                link: "https://github.com/leanhminh2104",
                icon: "fa-graduation-cap",
                accentColor: "#c084fc"
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
