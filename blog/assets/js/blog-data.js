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
        name: "leanhminh",
        title: "Lê Anh Minh — Blog",
        tagline: "Chia sẻ về Lập trình, Công nghệ & Cuộc sống",
        author: "Lê Anh Minh",
        github: "https://github.com/leanhminh2104",
        facebook: "https://facebook.com/",
        email: "contact@leanhminh.dev",
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

    // 4. Cấu hình Quảng cáo & Mạng liên kết (AdSense, Sponsor, Affiliate)
    ads: {
        enabled: true,
        // Google AdSense Publisher ID (thay thế khi tài khoản được duyệt)
        adsensePublisherId: "ca-pub-1234567890123456",
        // Mẫu Banner tài trợ hiển thị đẹp mắt (Fallback hoặc Sponsor trực tiếp)
        banners: [
            {
                id: "banner-hosting",
                slot: "feed",
                badge: "Tài trợ",
                title: "Cloud VPS & Máy Chủ Tốc Độ Cao Cho Lập Trình Viên",
                desc: "Hạ tầng NVMe SSD siêu tốc, băng thông không giới hạn, tối ưu hóa cho Laravel, NodeJS & Docker.",
                ctaText: "Xem Ưu Đãi 50%",
                link: "https://github.com/leanhminh2104",
                icon: "fa-server",
                accentColor: "#38bdf8"
            },
            {
                id: "banner-course",
                slot: "article",
                badge: "Gợi ý",
                title: "Khóa Học Clean Architecture & Microservices",
                desc: "Nâng cao tư duy thiết kế hệ thống, tối ưu SQL Query và xây dựng API triệu người dùng.",
                ctaText: "Khám Phá Ngay",
                link: "https://github.com/leanhminh2104",
                icon: "fa-graduation-cap",
                accentColor: "#c084fc"
            }
        ]
    }
};
