<?php
require_once __DIR__ . '/../config/database.php';
setCORS();

$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDB();

    if ($method === 'POST') {
        $input = jsonInput();
        $name    = $input['name'] ?? '';
        $email   = $input['email'] ?? '';
        $subject = $input['subject'] ?? '';
        $message = $input['message'] ?? '';

        if (!$name || !$email || !$message) jsonError('Missing required fields');

        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $subject, $message]);

        jsonOutput(['success' => true, 'message' => 'Cảm ơn bạn đã liên hệ!'], 201);

    } else {
        jsonError('Method not allowed', 405);
    }

} catch (Exception $e) {
    jsonError('Server error: ' . $e->getMessage(), 500);
}
