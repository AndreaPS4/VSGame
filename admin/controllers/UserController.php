<?php

require_once __DIR__ . '/../models/User.php';

Class UserController {
    public static function create() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $name = $_POST['username'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            User::create($name, $email, $password);
            header('Location' , '../index.php');
            exit();
        } 
        
        include_once '../views/login.php';
    }

    public static function edit () {
        
    }
}