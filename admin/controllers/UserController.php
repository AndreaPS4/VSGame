<?php

require_once __DIR__ . '../models/User.php';

Class UserController {
    public static function create() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $name = $_POST['username'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            User::insert($name, $email, $password);
            header('Location' , '../index.php');
            exit();
        } 
        
        include_once '../views/login.php';
    }

    public static function edit () {
       if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id  = $_POST['id'];
            $nombre = $_POST['name'];
            $ataque = $_POST['password'];
            $defensa = $_POST['email'];
            $imagen = $_POST['imagen'];
            $tipo = $_POST['tipo'];
            User::edit( $id,  $name, $password, $email);
            header('Location' , '../index.php');
            exit();
        }

        include_once '../views/login.php';
}
}