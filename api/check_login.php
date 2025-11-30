<?php
header('Content-Type: application/json');
session_start();

if (isset($_SESSION['user_id'], $_SESSION['username'])) {
    echo json_encode([
        'logged_in' => true,
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username']
    ]);
} else {
    echo json_encode([
        'logged_in' => false
    ]);
}
