<?php
require_once __DIR__ . '/../config/database.php';
setCORS();

$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getDB();

    if ($method === 'POST') {
        $input = jsonInput();
        $action = $input['action'] ?? '';

        // ----- LOGIN -----
        if ($action === 'login') {
            $email    = $input['email'] ?? '';
            $password = $input['password'] ?? '';

            if (!$email || !$password) jsonError('Missing email or password');

            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password'])) {
                jsonError('Invalid email or password', 401);
            }

            $token = generateToken();
            $stmt = $pdo->prepare("UPDATE users SET token = ? WHERE id = ?");
            $stmt->execute([$token, $user['id']]);

            jsonOutput([
                'user' => [
                    'id'    => (int)$user['id'],
                    'name'  => $user['name'],
                    'email' => $user['email'],
                    'phone' => $user['phone'],
                ],
                'token' => $token,
            ]);
        }

        // ----- REGISTER -----
        elseif ($action === 'register') {
            $name     = $input['name'] ?? '';
            $email    = $input['email'] ?? '';
            $phone    = $input['phone'] ?? '';
            $password = $input['password'] ?? '';

            if (!$name || !$email || !$password) jsonError('Missing required fields');

            $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $check->execute([$email]);
            if ($check->fetch()) jsonError('Email already exists', 409);

            $hashed = password_hash($password, PASSWORD_BCRYPT);
            $token  = generateToken();

            $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password, token) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$name, $email, $phone, $hashed, $token]);

            $userId = (int)$pdo->lastInsertId();

            jsonOutput([
                'user' => [
                    'id'    => $userId,
                    'name'  => $name,
                    'email' => $email,
                    'phone' => $phone,
                ],
                'token' => $token,
            ], 201);
        }

        // ----- GET PROFILE -----
        elseif ($action === 'profile') {
            $userId = requireAuth();
            $stmt = $pdo->prepare("SELECT id, name, email, phone FROM users WHERE id = ?");
            $stmt->execute([$userId]);
            $user = $stmt->fetch();
            if (!$user) jsonError('User not found', 404);

            $stmt = $pdo->prepare("SELECT * FROM addresses WHERE user_id = ?");
            $stmt->execute([$userId]);
            $user['addresses'] = $stmt->fetchAll();

            jsonOutput(['user' => $user]);
        }

        // ----- UPDATE PROFILE -----
        elseif ($action === 'update') {
            $userId = requireAuth();
            $name  = $input['name'] ?? '';
            $email = $input['email'] ?? '';
            $phone = $input['phone'] ?? '';

            $stmt = $pdo->prepare("UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?");
            $stmt->execute([$name, $email, $phone, $userId]);

            jsonOutput(['success' => true, 'user' => ['id' => $userId, 'name' => $name, 'email' => $email, 'phone' => $phone]]);
        }

        // ----- ADD ADDRESS -----
        elseif ($action === 'add_address') {
            $userId = requireAuth();
            $stmt = $pdo->prepare("INSERT INTO addresses (user_id, full_name, phone, street, ward, district, city) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $userId,
                $input['fullName'] ?? '',
                $input['phone'] ?? '',
                $input['street'] ?? '',
                $input['ward'] ?? '',
                $input['district'] ?? '',
                $input['city'] ?? 'TP. Hồ Chí Minh',
            ]);
            jsonOutput(['success' => true, 'id' => (int)$pdo->lastInsertId()], 201);
        }

        // ----- LOGOUT -----
        elseif ($action === 'logout') {
            $userId = requireAuth();
            $stmt = $pdo->prepare("UPDATE users SET token = NULL WHERE id = ?");
            $stmt->execute([$userId]);
            jsonOutput(['success' => true]);
        }

        else {
            jsonError('Invalid action', 400);
        }

    } else {
        jsonError('Method not allowed', 405);
    }

} catch (Exception $e) {
    jsonError('Server error: ' . $e->getMessage(), 500);
}
