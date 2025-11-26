<?php
include_once '../controllers/UserController.php';
include_once '../controllers/GameController.php';
include_once '../controllers/CardController.php';

$action = $_GET['action'] ?? 'login';

switch ($action) {
    case 'user':
        require_once __DIR__ . '/../controllers/UserController.php';
        UserController::register();
        break;

     case 'create':
        require_once __DIR__ . '/../controllers/GameController.php';
    default: 

    require_once __DIR__ . '/../src/controllers/AuthController.php';
    AuthController::login();
        break;
}
