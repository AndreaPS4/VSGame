<?php
header('Content-Type: application/json');
session_start();
require_once __DIR__ . '/../admin/models/Game.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'No estás logueado']);
    exit;
}

$user_id = $_SESSION['user_id'];
$puntos = $data['puntos'] ?? 0;

$result = Game::saveScore($user_id, $puntos);

if ($result) {
    echo json_encode(['success' => true, 'message' => 'Puntuación guardada']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar puntuación']);
}
