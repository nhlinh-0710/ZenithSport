<?php
require_once __DIR__ . '/../config/database.php';
setCORS();

$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDB();

    // GET  /api/orders.php              -> list my orders
    // POST /api/orders.php              -> create new order

    if ($method === 'GET') {
        $userId = requireAuth();
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        $orders = $stmt->fetchAll();

        foreach ($orders as &$order) {
            $stmt = $pdo->prepare("SELECT * FROM order_items WHERE order_id = ?");
            $stmt->execute([$order['id']]);
            $items = $stmt->fetchAll();

            foreach ($items as &$item) {
                $item['product'] = [
                    'id'    => $item['product_id'],
                    'name'  => $item['product_name'],
                    'image' => $item['product_image'],
                    'price' => (int)$item['price'],
                ];
            }

            $order['items'] = $items;
            $order['total'] = (int)$order['total'];
            $order['address'] = [
                'fullName' => $order['address_full_name'],
                'phone'    => $order['address_phone'],
                'street'   => $order['address_street'],
                'ward'     => $order['address_ward'],
                'district' => $order['address_district'],
                'city'     => $order['address_city'],
            ];
        }

        jsonOutput(['orders' => $orders]);

    } elseif ($method === 'POST') {
        $userId = requireAuth();
        $input = jsonInput();

        $items  = $input['items'] ?? [];
        $total  = $input['total'] ?? 0;
        $addr   = $input['address'] ?? [];
        $pm     = $input['paymentMethod'] ?? 'COD';

        if (empty($items)) jsonError('Cart is empty');

        // Generate order ID
        $orderId = 'ZS' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));

        $pdo->beginTransaction();
        try {
            $stmt = $pdo->prepare("INSERT INTO orders (id, user_id, total, status, address_full_name, address_phone, address_street, address_ward, address_district, address_city, payment_method) VALUES (?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $orderId, $userId, $total,
                $addr['fullName'] ?? '', $addr['phone'] ?? '',
                $addr['street'] ?? '', $addr['ward'] ?? '',
                $addr['district'] ?? '', $addr['city'] ?? 'TP. Hồ Chí Minh',
                $pm,
            ]);

            $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity, size, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            foreach ($items as $item) {
                $stmt->execute([
                    $orderId,
                    $item['product']['id'],
                    $item['product']['name'],
                    $item['product']['image'],
                    $item['product']['price'],
                    $item['quantity'],
                    $item['size'] ?? '',
                    $item['color'] ?? '',
                ]);
            }

            $pdo->commit();
            jsonOutput(['success' => true, 'order' => ['id' => $orderId, 'status' => 'pending']], 201);

        } catch (Exception $e) {
            $pdo->rollBack();
            throw $e;
        }

    } else {
        jsonError('Method not allowed', 405);
    }

} catch (Exception $e) {
    jsonError('Server error: ' . $e->getMessage(), 500);
}
