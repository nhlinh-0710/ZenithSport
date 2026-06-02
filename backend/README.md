# Backend PHP + MySQL cho Zenith Sport

Yêu cầu: XAMPP (Apache + PHP 8+ + MySQL)

## Cài đặt

1. Copy toàn bộ thư mục `backend/` vào htdocs của XAMPP:
   ```
   C:\xampp\htdocs\zenith-sport\backend\
   ```

2. Khởi động Apache và MySQL từ XAMPP Control Panel.

3. Tạo database và chạy schema:
   ```bash
   mysql -u root < backend/schema.sql
   ```

4. Seed dữ liệu mẫu:
   ```bash
   php backend/seed/seed.php
   ```

5. Truy cập:
   - Frontend: http://localhost:3000
   - API: http://localhost:8080/zenith-sport/backend/api/products.php
   - PHPMyAdmin: http://localhost/phpmyadmin (db: zenith_sport)

## Tài khoản demo
- Email: demo@zenith.vn
- Mật khẩu: demo123

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/products.php | Danh sách sản phẩm |
| GET | /api/products.php?id=1 | Chi tiết sản phẩm |
| POST | /api/auth.php | Login/Register (action: login|register) |
| GET | /api/orders.php | Đơn hàng của user |
| POST | /api/orders.php | Tạo đơn hàng mới |
| GET | /api/cart.php | Giỏ hàng |
| POST | /api/cart.php | Thêm vào giỏ |
| PUT | /api/cart.php | Cập nhật số lượng |
| DELETE | /api/cart.php | Xóa khỏi giỏ |
| POST | /api/contact.php | Gửi liên hệ |
