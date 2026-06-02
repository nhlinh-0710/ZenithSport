<?php
// ============================================================
// Seed data for Zenith Sport
// Run: php backend/seed/seed.php
// ============================================================

require_once __DIR__ . '/../config/database.php';

echo "Seeding database...\n";

$pdo = getDB();

// Truncate all tables
$pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
foreach (['order_items', 'orders', 'cart_items', 'reviews', 'contacts', 'addresses', 'products', 'users'] as $table) {
    $pdo->exec("TRUNCATE TABLE $table");
}
$pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

// ============================================================
// Demo user
// ============================================================
$demoPassword = password_hash('demo123', PASSWORD_BCRYPT);
$pdo->prepare("INSERT INTO users (id, name, email, phone, password, token) VALUES (1, 'Nguyễn Văn A', 'demo@zenith.vn', '0912345678', ?, ?)")
    ->execute([$demoPassword, 'demo-token-' . bin2hex(random_bytes(16))]);

$pdo->prepare("INSERT INTO addresses (user_id, full_name, phone, street, ward, district, city) VALUES (1, 'Nguyễn Văn A', '0912345678', '123 Nguyễn Huệ', 'Phường Bến Nghé', 'Quận 1', 'TP. Hồ Chí Minh')")
    ->execute();

echo "  Users: OK\n";

// ============================================================
// Products
// ============================================================
$products = [
    [
        'name' => 'AIR MAX PULSE',
        'category' => 'Giày', 'brand' => 'Nike',
        'price' => 3500000, 'original_price' => 4200000,
        'image' => 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+MAX+PULSE.png',
        'images' => '["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+MAX+PULSE.png"]',
        'description' => 'Giày chạy bộ với đệm Air Max siêu nhẹ, êm ái. Công nghệ đệm khí Nike Air giúp giảm chấn tối đa.',
        'details' => '["Đệm Air Max thế hệ mới","Đế ngoài cao su chống trượt","Thân lưới thoáng khí","Công nghệ đệm khí Nike Air"]',
        'sizes' => '["39","40","41","42","43","44"]',
        'colors' => '["Đen","Trắng","Đỏ"]',
        'is_new' => 1, 'is_sale' => 0, 'rating' => 4.8, 'review_count' => 156,
    ],
    [
        'name' => 'ALPHAFLY 3',
        'category' => 'Giày', 'brand' => 'Nike',
        'price' => 8900000, 'original_price' => null,
        'image' => 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/45fa5e7b-0bd0-42d8-91c4-0015cbf6cb77/ALPHAFLY+3.png',
        'images' => '["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/45fa5e7b-0bd0-42d8-91c4-0015cbf6cb77/ALPHAFLY+3.png"]',
        'description' => 'Giày chạy marathon đỉnh cao với carbon plate và ZoomX foam. Tối ưu cho vận động viên chuyên nghiệp.',
        'details' => '["Carbon plate siêu nhẹ","ZoomX foam đàn hồi cao","Thiết kế khí động học","Trọng lượng siêu nhẹ 185g"]',
        'sizes' => '["40","41","42","43","44"]',
        'colors' => '["Đen","Trắng","Xanh"]',
        'is_new' => 1, 'is_sale' => 0, 'rating' => 4.9, 'review_count' => 89,
    ],
    [
        'name' => 'LEBRON XXII',
        'category' => 'Giày', 'brand' => 'Nike',
        'price' => 5200000, 'original_price' => 6000000,
        'image' => 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5c5e0c9b-f7c8-41e6-88bc-b5534c0d1a3c/LEBRON+XXII.png',
        'images' => '["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5c5e0c9b-f7c8-41e6-88bc-b5534c0d1a3c/LEBRON+XXII.png"]',
        'description' => 'Giày bóng rổ cao cấp với đệm khí Zoom Air kép. Hỗ trợ tối đa cổ chân và bám sân xuất sắc.',
        'details' => '["Zoom Air kép","Đế xoáy chống trượt","Cổ cao bảo vệ mắt cá","Công nghệ Flyknit"]',
        'sizes' => '["40","41","42","43","44","45"]',
        'colors' => '["Đen","Đỏ","Trắng"]',
        'is_new' => 0, 'is_sale' => 1, 'rating' => 4.7, 'review_count' => 234,
    ],
    [
        'name' => 'ÁO THUN DRY-FIT',
        'category' => 'Áo', 'brand' => 'Nike',
        'price' => 650000, 'original_price' => null,
        'image' => 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/98fedc2f-dadc-4cfb-8f88-7f5df16ff9c4/M+NK+DF+ACADEMY+23+TOP.png',
        'images' => '["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/98fedc2f-dadc-4cfb-8f88-7f5df16ff9c4/M+NK+DF+ACADEMY+23+TOP.png"]',
        'description' => 'Áo thun thể thao chất liệu Dry-Fit thấm hút mồ hôi nhanh. Thiết kế ôm vừa vặn, thoáng khí.',
        'details' => '["Công nghệ Dri-FIT","Chất liệu nhẹ thoáng khí","Đường may phẳng","Không bai dão"]',
        'sizes' => '["S","M","L","XL","XXL"]',
        'colors' => '["Đen","Trắng","Xám","Đỏ"]',
        'is_new' => 0, 'is_sale' => 0, 'rating' => 4.6, 'review_count' => 412,
    ],
    [
        'name' => 'QUẦN SHORTS DRI-FIT',
        'category' => 'Quần', 'brand' => 'Nike',
        'price' => 550000, 'original_price' => 700000,
        'image' => 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bbd6b53a-84d4-433c-9e48-a5744267d2cf/M+NK+DF+ACADEMY+23+SHORT.png',
        'images' => '["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bbd6b53a-84d4-433c-9e48-a5744267d2cf/M+NK+DF+ACADEMY+23+SHORT.png"]',
        'description' => 'Quần short thể thao co giãn 4 chiều, nhẹ và thoáng mát. Túi zip an toàn khi vận động.',
        'details' => '["Co giãn 4 chiều","Túi zip an toàn","Dây rút điều chỉnh","Không thấm nước"]',
        'sizes' => '["S","M","L","XL"]',
        'colors' => '["Đen","Xám","Trắng"]',
        'is_new' => 0, 'is_sale' => 1, 'rating' => 4.5, 'review_count' => 189,
    ],
    [
        'name' => 'ÁO KHOÁT WINDRUNNER',
        'category' => 'Áo', 'brand' => 'Nike',
        'price' => 2100000, 'original_price' => null,
        'image' => 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3a4bc71-28ac-4818-9d48-a17b38c13a69/W+NK+TF+GX+UV+JKT.png',
        'images' => '["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3a4bc71-28ac-4818-9d48-a17b38c13a69/W+NK+TF+GX+UV+JKT.png"]',
        'description' => 'Áo khoác chống gió siêu nhẹ, gọn gàng. Chất liệu chống nước, phù hợp cho chạy bộ ngoài trời.',
        'details' => '["Chống gió chống nước","Gập gọn bỏ túi","Khóa kéo YKK","Mũ trùm điều chỉnh"]',
        'sizes' => '["S","M","L","XL","XXL"]',
        'colors' => '["Đen","Trắng","Xanh đậm"]',
        'is_new' => 1, 'is_sale' => 0, 'rating' => 4.7, 'review_count' => 94,
    ],
    [
        'name' => 'BÓNG ĐÁ FLIGHT',
        'category' => 'Phụ kiện', 'brand' => 'Nike',
        'price' => 890000, 'original_price' => null,
        'image' => 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22b9b7c9-4da7-4b7f-8c4a-8c1e9a2b3d4e/FLIGHT+BALL.png',
        'images' => '["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22b9b7c9-4da7-4b7f-8c4a-8c1e9a2b3d4e/FLIGHT+BALL.png"]',
        'description' => 'Bóng đá cao cấp, chuẩn FIFA. Công nghệ bề mặt Aerowtrack giúp ổn định đường bay.',
        'details' => '["Chuẩn FIFA Quality Pro","Bề mặt Aerowtrack","Bọc cao su nhựa tổng hợp","Van khí cao su butyl"]',
        'sizes' => '["5"]',
        'colors' => '["Trắng","Trắng-Đen"]',
        'is_new' => 0, 'is_sale' => 0, 'rating' => 4.8, 'review_count' => 67,
    ],
    [
        'name' => 'TÚI GYM ZENITH 40L',
        'category' => 'Phụ kiện', 'brand' => 'Zenith',
        'price' => 1500000, 'original_price' => 1800000,
        'image' => 'https://i.pinimg.com/736x/e6/72/3c/e6723c000c058ee897b69b8c4f58be6f.jpg',
        'images' => '["https://i.pinimg.com/736x/e6/72/3c/e6723c000c058ee897b69b8c4f58be6f.jpg"]',
        'description' => 'Túi thể thao đa năng 40L. Nhiều ngăn chứa, chống nước, quai đeo chắc chắn.',
        'details' => '["Chất liệu chống nước","Ngăn giày riêng biệt","Quai đeo vai êm","Khoá kéo chống nước"]',
        'sizes' => '["40L"]',
        'colors' => '["Đen","Xám"]',
        'is_new' => 0, 'is_sale' => 1, 'rating' => 4.4, 'review_count' => 128,
    ],
    [
        'name' => 'VỢT TENNIS PRO 27"',
        'category' => 'Phụ kiện', 'brand' => 'Wilson',
        'price' => 3200000, 'original_price' => null,
        'image' => 'https://images.unsplash.com/photo-1617083934555-ac7d4e0d0e4b?auto=format&fit=crop&w=600&q=80',
        'images' => '["https://images.unsplash.com/photo-1617083934555-ac7d4e0d0e4b?auto=format&fit=crop&w=600&q=80"]',
        'description' => 'Vợt tennis chuyên nghiệp, khung carbon siêu nhẹ. Cân bằng hoàn hảo cho cú đánh mạnh.',
        'details' => '["Khung carbon siêu nhẹ 280g","Mặt vợt 645cm²","Cân bằng 320mm","Dây đan chuyên nghiệp"]',
        'sizes' => '["27\\""]',
        'colors' => '["Đen","Trắng-Đỏ"]',
        'is_new' => 1, 'is_sale' => 0, 'rating' => 4.6, 'review_count' => 45,
    ],
    [
        'name' => 'LEGGINGS YOGA PRO',
        'category' => 'Quần', 'brand' => 'Nike',
        'price' => 780000, 'original_price' => null,
        'image' => 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/W+NK+ONE+LEG+FLX+HR+7-8.png',
        'images' => '["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/W+NK+ONE+LEG+FLX+HR+7-8.png"]',
        'description' => 'Quần legging yoga co giãn 4 chiều, eo cao ôm gọn. Chất liệu mềm mại, không phai màu.',
        'details' => '["Eo cao không kẹt","Co giãn 4 chiều","Công nghệ chống mùi","Đường may phẳng"]',
        'sizes' => '["S","M","L","XL"]',
        'colors' => '["Đen","Xám","Xanh"]',
        'is_new' => 0, 'is_sale' => 0, 'rating' => 4.7, 'review_count' => 267,
    ],
    [
        'name' => 'ADIDAS ULTRABOOST 25',
        'category' => 'Giày', 'brand' => 'Adidas',
        'price' => 4800000, 'original_price' => 5500000,
        'image' => 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7c8d5e9f0a1b4c3d8e7f6a5b4c3d2e1f/ULTRABOOST_25.png',
        'images' => '["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7c8d5e9f0a1b4c3d8e7f6a5b4c3d2e1f/ULTRABOOST_25.png"]',
        'description' => 'Giày chạy bộ Ultraboost thế hệ mới với đệm Boost cực êm. Thoải mái cho mọi bước chạy.',
        'details' => '["Đệm Boost nguyên khối","Đế ngoài Continental™","Thân Primeknit","Công nghệ Torsion"]',
        'sizes' => '["39","40","41","42","43","44","45"]',
        'colors' => '["Đen","Trắng","Xám"]',
        'is_new' => 0, 'is_sale' => 1, 'rating' => 4.8, 'review_count' => 345,
    ],
    [
        'name' => 'ADIDAS TRACK TOP',
        'category' => 'Áo', 'brand' => 'Adidas',
        'price' => 1800000, 'original_price' => null,
        'image' => 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d/TRACK+TOP.png',
        'images' => '["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d/TRACK+TOP.png"]',
        'description' => 'Áo khoái thể thao adidas với thiết kế kinh điển. Chất liệu nhẹ, thoải mái cho tập luyện.',
        'details' => '["Chất liệu vải dệt kim","Túi khóa kéo","Cổ đứng","Sọc adidas đặc trưng"]',
        'sizes' => '["S","M","L","XL","XXL"]',
        'colors' => '["Đen","Trắng","Xanh"]',
        'is_new' => 0, 'is_sale' => 0, 'rating' => 4.5, 'review_count' => 178,
    ],
    [
        'name' => 'TAI NGHE THỂ THAO',
        'category' => 'Phụ kiện', 'brand' => 'Beats',
        'price' => 2500000, 'original_price' => null,
        'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        'images' => '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"]',
        'description' => 'Tai nghe thể thao không dây chống nước IPX7. Âm thanh sống động, đeo thoải mái khi tập.',
        'details' => '["Chống nước IPX7","Pin 12 giờ","Bluetooth 5.3","Điều khiển cảm ứng"]',
        'sizes' => '["Một cỡ"]',
        'colors' => '["Đen","Trắng","Đỏ"]',
        'is_new' => 1, 'is_sale' => 0, 'rating' => 4.3, 'review_count' => 92,
    ],
    [
        'name' => 'BÌNH NƯỚC NHIỆT 750ML',
        'category' => 'Phụ kiện', 'brand' => 'Zenith',
        'price' => 350000, 'original_price' => null,
        'image' => 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
        'images' => '["https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80"]',
        'description' => 'Bình nước giữ nhiệt 750ml. Giữ lạnh 24h, giữ nóng 12h. Chất liệu thép không gỉ.',
        'details' => '["Thép không gỉ 304","Giữ lạnh 24h - Giữ nóng 12h","Dung tích 750ml","Nắp chống tràn"]',
        'sizes' => '["750ml"]',
        'colors' => '["Đen","Trắng","Bạc"]',
        'is_new' => 0, 'is_sale' => 0, 'rating' => 4.6, 'review_count' => 201,
    ],
    [
        'name' => 'DÂY NHẢY TỐC ĐỘ',
        'category' => 'Phụ kiện', 'brand' => 'Zenith',
        'price' => 250000, 'original_price' => null,
        'image' => 'https://images.unsplash.com/photo-1591115765373-52077643f9e0?auto=format&fit=crop&w=600&q=80',
        'images' => '["https://images.unsplash.com/photo-1591115765373-52077643f9e0?auto=format&fit=crop&w=600&q=80"]',
        'description' => 'Dây nhảy thể thao chuyên nghiệp có thể điều chỉnh độ dài. Tay cầm chống trượt.',
        'details' => '["Điều chỉnh độ dài","Tay cầm chống trượt","Vòng bi thép","Dây thép bọc PVC"]',
        'sizes' => '["3m"]',
        'colors' => '["Đen","Đỏ","Xanh"]',
        'is_new' => 0, 'is_sale' => 0, 'rating' => 4.4, 'review_count' => 56,
    ],
    [
        'name' => 'GĂNG TAY GYM',
        'category' => 'Phụ kiện', 'brand' => 'Zenith',
        'price' => 180000, 'original_price' => null,
        'image' => 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=600&q=80',
        'images' => '["https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=600&q=80"]',
        'description' => 'Găng tay tập gym chống trượt, bảo vệ lòng bàn tay. Đệm gel giảm áp lực.',
        'details' => '["Đệm gel bảo vệ","Chống trượt silicon","Thoáng khí","Cổ tay điều chỉnh"]',
        'sizes' => '["S","M","L","XL"]',
        'colors' => '["Đen","Đỏ","Xám"]',
        'is_new' => 0, 'is_sale' => 0, 'rating' => 4.3, 'review_count' => 312,
    ],
];

$stmt = $pdo->prepare("INSERT INTO products (name, category, brand, price, original_price, image, images, description, details, sizes, colors, is_new, is_sale, rating, review_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

foreach ($products as $p) {
    $stmt->execute([
        $p['name'], $p['category'], $p['brand'],
        $p['price'], $p['original_price'],
        $p['image'], $p['images'],
        $p['description'], $p['details'],
        $p['sizes'], $p['colors'],
        $p['is_new'], $p['is_sale'],
        $p['rating'], $p['review_count'],
    ]);
}

echo "  Products: " . count($products) . " OK\n";

// ============================================================
// Reviews
// ============================================================
$reviews = [
    [1, 'Minh Tuấn', 5, 'Giày siêu êm, chạy 10km không mỏi chân. Đệm Air Max thực sự tuyệt vời!', '42', 'Đen'],
    [1, 'Hoàng Nam', 5, 'Mua cho em trai, cháu rất thích. Chất lượng tốt.', '41', 'Trắng'],
    [1, 'Thanh Hà', 4, 'Giày đẹp, đi thoải mái. Giao hàng nhanh.', '39', 'Đỏ'],
    [2, 'Văn Đức', 5, 'Đẳng cấp marathon. Nhẹ đến khó tin!', '42', 'Đen'],
    [2, 'Quốc Anh', 5, 'Carbon plate thật sự tạo khác biệt. Khuyên nên mua.', '43', 'Xanh'],
    [3, 'Đức Mạnh', 5, 'Chơi bóng rổ đỉnh cao. Bám sân tốt, êm chân.', '44', 'Đen'],
    [4, 'Phương Linh', 5, 'Chất vải mát, thấm hút tốt. Mặc gym rất thoải mái.', 'M', 'Đen'],
    [4, 'Minh Anh', 4, 'Áo đẹp, đúng size. Sẽ mua thêm màu khác.', 'L', 'Trắng'],
    [4, 'Huy Hoàng', 4, 'Ổn so với giá tiền. Mặc tập luyện hàng ngày.', 'XL', 'Xám'],
    [10, 'Thảo Nhi', 5, 'Leggings siêu êm, co giãn tốt. Tập yoga thoải mái.', 'M', 'Đen'],
    [10, 'Khánh Huyền', 5, 'Chất vải mềm, lên form đẹp. Rất hài lòng!', 'S', 'Xanh'],
    [11, 'Trung Kiên', 5, 'Ultraboost đỉnh thật sự. Đi bộ cả ngày không mỏi.', '42', 'Đen'],
];

$stmt = $pdo->prepare("INSERT INTO reviews (product_id, user_name, rating, comment, size, color) VALUES (?, ?, ?, ?, ?, ?)");
foreach ($reviews as $r) {
    $stmt->execute($r);
}

echo "  Reviews: " . count($reviews) . " OK\n";

// ============================================================
// Sample orders
// ============================================================
$pdo->prepare("INSERT INTO orders (id, user_id, total, status, address_full_name, address_phone, address_street, address_ward, address_district, address_city, payment_method, created_at) VALUES ('ZSXK4M2P8A', 1, 4800000, 'delivered', 'Nguyễn Văn A', '0912345678', '123 Nguyễn Huệ', 'Phường Bến Nghé', 'Quận 1', 'TP. Hồ Chí Minh', 'COD', '2026-05-10 08:30:00')")->execute();
$pdo->prepare("INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity, size, color) VALUES ('ZSXK4M2P8A', 1, 'AIR MAX PULSE', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+MAX+PULSE.png', 3500000, 1, '42', 'Đen')")->execute();
$pdo->prepare("INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity, size, color) VALUES ('ZSXK4M2P8A', 4, 'ÁO THUN DRY-FIT', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/98fedc2f-dadc-4cfb-8f88-7f5df16ff9c4/M+NK+DF+ACADEMY+23+TOP.png', 650000, 2, 'M', 'Trắng')")->execute();

$pdo->prepare("INSERT INTO orders (id, user_id, total, status, address_full_name, address_phone, address_street, address_ward, address_district, address_city, payment_method, created_at) VALUES ('ZSB7FL9R2C', 1, 4800000, 'shipping', 'Nguyễn Văn A', '0912345678', '123 Nguyễn Huệ', 'Phường Bến Nghé', 'Quận 1', 'TP. Hồ Chí Minh', 'VNPay', '2026-05-22 14:15:00')")->execute();
$pdo->prepare("INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity, size, color) VALUES ('ZSB7FL9R2C', 11, 'ADIDAS ULTRABOOST 25', 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7c8d5e9f0a1b4c3d8e7f6a5b4c3d2e1f/ULTRABOOST_25.png', 4800000, 1, '42', 'Đen')")->execute();

echo "  Orders: 2 OK\n";

echo "\n✅ Seed complete!\n";
echo "   Demo account: demo@zenith.vn / demo123\n";
