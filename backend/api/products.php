<?php
require_once __DIR__ . '/../config/database.php';
setCORS();

$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDB();

    // GET /api/products.php          -> list all products
    // GET /api/products.php?id=X      -> single product with reviews
    // GET /api/products.php?category=X -> filter by category
    // GET /api/products.php?brand=X    -> filter by brand
    // GET /api/products.php?search=X   -> search by name

    if ($method === 'GET') {
        $id          = $_GET['id'] ?? null;
        $category    = $_GET['category'] ?? null;
        $brand       = $_GET['brand'] ?? null;
        $search      = $_GET['search'] ?? null;

        if ($id) {
            // Single product
            $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$id]);
            $product = $stmt->fetch();

            if (!$product) jsonError('Product not found', 404);

            $product['images']  = $product['images'] ? json_decode($product['images'], true) : [$product['image']];
            $product['details'] = $product['details'] ? json_decode($product['details'], true) : [];
            $product['sizes']   = json_decode($product['sizes'], true);
            $product['colors']  = json_decode($product['colors'], true);
            $product['isNew']   = (bool)$product['is_new'];
            $product['isSale']  = (bool)$product['is_sale'];
            $product['originalPrice'] = $product['original_price'];

            // Reviews
            $stmt = $pdo->prepare("SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC");
            $stmt->execute([$id]);
            $product['reviews'] = $stmt->fetchAll();

            // Related
            $stmt = $pdo->prepare("SELECT * FROM products WHERE category = ? AND id != ? LIMIT 4");
            $stmt->execute([$product['category'], $id]);
            $product['related'] = $stmt->fetchAll();

            jsonOutput(['product' => $product]);

        } else {
            // List
            $sql = "SELECT * FROM products WHERE 1=1";
            $params = [];

            if ($category && $category !== 'Tất cả') {
                $sql .= " AND category = ?";
                $params[] = $category;
            }
            if ($brand && $brand !== 'Tất cả') {
                $sql .= " AND brand = ?";
                $params[] = $brand;
            }
            if ($search) {
                $sql .= " AND (name LIKE ? OR category LIKE ? OR brand LIKE ?)";
                $q = "%$search%";
                $params[] = $q; $params[] = $q; $params[] = $q;
            }

            $sql .= " ORDER BY id ASC";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $products = $stmt->fetchAll();

            foreach ($products as &$p) {
                $p['sizes']  = json_decode($p['sizes'], true);
                $p['colors'] = json_decode($p['colors'], true);
                $p['isNew']  = (bool)$p['is_new'];
                $p['isSale'] = (bool)$p['is_sale'];
                $p['originalPrice'] = $p['original_price'];
            }

            jsonOutput(['products' => $products, 'total' => count($products)]);
        }

    } else {
        jsonError('Method not allowed', 405);
    }

} catch (Exception $e) {
    jsonError('Server error: ' . $e->getMessage(), 500);
}
