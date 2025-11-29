<?php

include_once __DIR__ . '/services/SessionService.php';
include_once __DIR__ . '/services/AuthService.php';

$path = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($path) {
    case '/admin/users':
        include __DIR__ .  '/controllers/UserController.php';
        UserController::list();
        break;
    case '/admin/users/create':
        include __DIR__ .  '/controllers/UserController.php';
        UserController::create();
        break;
    case '/admin/login':
        include __DIR__ .  '/controllers/AuthController.php';
        AuthController::login();
        break;
    default:
        include 'views/error_404.php';
}
