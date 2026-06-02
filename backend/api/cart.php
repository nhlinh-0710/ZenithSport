<?php
require_once __DIR__ . '/../config/database.php';
setCORS();

$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDB();
    $userId = requireAuth();

    // GET  /api/cart.php         -> list cart items
    // POST /api/cart.php         -> add item to cart
    // PUT  /api/cart.php         -> update quantity
    // DELETE /api/cart.php?id=X  -> remove item

    if ($method === 'GET') {
        $stmt = $pdo->prepare("SELECT ci.*, p.name as product_name, p.image as product_image, p.price
                               FROM cart_items ci
                               JOIN products p ON ci.product_id = p.id
                               WHERE ci.user_id = ?
                               ORDER BY ci.created_at ASC");
        $stmt->execute([$userId]);
        $items = $stmt->fetchAll();

        $formatted = [];
        foreach ($items as $item) {
            $formatted[] = [
                'product' => [
                    'id'    => (int)$item['product_id'],
                    'name'  => $item['product_name'],
                    'image' => $item['product_image'],
                    'price' => (int)$item['price'],
                ],
                'quantity' => (int)$item['quantity'],
                'size'     => $item['size'],
                'color'    => $item['color'],
            ];
        }

        $totalItems = array_sum(array_column($items, 'quantity'));
        $totalPrice = array_sum(array_map(fn($i) => $i['price'] * $i['quantity'], $items));

        jsonOutput(['items' => $formatted, 'totalItems' => $totalItems, 'totalPrice' => $totalPrice]);

    } elseif ($method === 'POST') {
        $input = jsonInput();
        $productId = $input['productId'] ?? 0;
        $size      = $input['size'] ?? '';
        $color     = $input['color'] ?? '';
        $quantity  = $input['quantity'] ?? 1;

        if (!$productId) jsonError('Missing productId');

        // Check if exists
        $stmt = $pdo->prepare("SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ? AND size = ? AND color = ?");
        $stmt->execute([$userId, $productId, $size, $color]);
        $existing = $stmt->fetch();

        if ($existing) {
            $stmt = $pdo->prepare("UPDATE cart_items SET quantity = quantity + ? WHERE id = ?");
            $stmt->execute([$quantity, $existing['id']]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO cart_items (user_id, product_id, quantity, size, color) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$userId, $productId, $quantity, $size, $color]);
        }

        jsonOutput(['success' => true], 201);

    } elseif ($method === 'PUT') {
        $input = jsonInput();
        $productId = $input['productId'] ?? 0;
        $size      = $input['size'] ?? '';
        $color     = $input['color'] ?? '';
        $quantity  = $input['quantity'] ?? 1;

        if ($quantity <= 0) {
            $stmt = $pdo->prepare("DELETE FROM cart_items WHERE user_id = ? AND product_id = ? AND size = ? AND color = ?");
            $stmt->execute([$userId, $productId, $size, $color]);
        } else {
            $stmt = $pdo->prepare("UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ? AND size = ? AND color = ?");
            $stmt->execute([$quantity, $userId, $productId, $size, $color]);
        }

        jsonOutput(['success' => true]);

    } elseif ($method === 'DELETE') {
        $productId = $_GET['productId'] ?? 0;
        $size      = $_GET['size'] ?? '';
        $color     = $_GET['color'] ?? '';

        $stmt = $pdo->prepare("DELETE FROM cart_items WHERE user_id = ? AND product_id = ? AND size = ? AND color = ?");
        $stmt->execute([$userId, $productId, $size, $color]);

        jsonOutput(['success' => true]);

    } else {
        jsonError('Method not allowed', 405);
    }

} catch (Exception $e) {
    jsonError('Server error: ' . $e->getMessage(), 500);
}
