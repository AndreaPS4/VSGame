
<?php

include_once __DIR__ . '/services/SessionService.php';
include_once __DIR__ . '/services/AuthService.php';

$path = explode('?', $_SERVER['REQUEST_URI'])[0];
$method = $_SERVER['REQUEST_METHOD'];

switch ($path) {
    case '/admin':
        AuthService::middleware();
        include 'views/index.php';
        break;
    case '/admin/users':
        AuthService::middleware();
        include __DIR__ .  '/controllers/UserController.php';
        UserController::list();
        break;
    case '/admin/users/create':
        AuthService::middleware();
        include __DIR__ .  '/controllers/UserController.php';
        UserController::create();
        break;
    case '/admin/users/edit':
        AuthService::middleware();
        include __DIR__ .  '/controllers/UserController.php';
        UserController::edit($_GET['id'] ?? $_POST['id']);
        break;
    case '/admin/users/delete':
        AuthService::middleware();
        include __DIR__ .  '/controllers/UserController.php';
        UserController::delete($_GET['id'] ?? $_POST['id']);
        break;
    case '/admin/cards':
        AuthService::middleware();
        include __DIR__ .  '/controllers/CardController.php';
        CardController::list();
        break;
    case '/admin/cards/create':
        AuthService::middleware();
        include __DIR__ .  '/controllers/CardController.php';
        CardController::create();
        break;
    case '/admin/login':
        include __DIR__ .  '/controllers/AuthController.php';
        AuthController::login();
        break;
    case '/admin/logout':
        AuthService::middleware();
        include __DIR__ .  '/controllers/AuthController.php';
        AuthController::logout();
        break;
    default:
        include 'views/error_404.php';
}
?>

