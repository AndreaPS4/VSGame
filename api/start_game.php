<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../admin/models/Card.php';

session_start();

if (empty($_SESSION['user_id'])) {
    header("HTTP/1.1 401 Unauthorized");
    echo json_encode(['succes' => false]);
    exit();
}

$cartas = Card::selectAll();
echo json_encode(['success' => true, 'cartas' => $cartas]);
