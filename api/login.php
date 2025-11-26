<?php
header('Content-Type: application/json');
session_start();
require_once __DIR__ . '/../admin/models/User.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

$user = User::getByEmail($data['email']);

if ($user && password_verify($data['password'], $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['nombre'] = $user['nombre'];
    echo json_encode(['success' => true, 'message' => 'Login correcto']);
} else {
    echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
}
