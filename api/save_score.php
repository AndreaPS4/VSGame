<?php
header('Content-Type: application/json');

session_start();

if (empty($_SESSION['user_id'])) {
    header("HTTP/1.1 401 Unauthorized");
    echo json_encode(['succes' => false]);
    exit();
}

require_once __DIR__ . '/../admin/models/Game.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = $_SESSION['username'];
$puntuacion = $data['puntuacion'] ?? 0;
$victoria = $data['victoria'];

$result = Game::saveScore($username, $puntuacion, $victoria);

if ($result) {
    echo json_encode(['success' => true, 'message' => 'Puntuación guardada']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar puntuación']);
}
