<?php
header('Content-Type: application/json');
session_start();

if (isset($_SESSION['user_id'], $_SESSION['nombre'])) {
    echo json_encode([
        'logged_in' => true,
        'user_id' => $_SESSION['user_id'],
        'nombre' => $_SESSION['nombre']
    ]);
} else {
    echo json_encode([
        'logged_in' => false
    ]);
}
