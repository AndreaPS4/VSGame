<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../admin/models/User.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username'], $data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

$username = $data['username'];
$email = $data['email'];
$password = $data['password'];

$result = User::create($username, $email, $password);

if ($result) {
    echo json_encode(['success' => true, 'message' => 'Usuario registrado']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al registrar']);
}
