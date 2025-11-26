<?php

class GameController 
{
    public static function create () {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $name = $_POST['username'] ?? '';
            $ataque = $_POST['ataque'] ?? '';
            $defensa = $_POST['defensa'] ?? '';
            $imagen = $_FILES['imagen'] ?? '';
            $tipo = $_POST['tipo'] ?? '';

            Game::save($name, $ataque, $defensa, $imagen, $tipo);
            header('Location: ../index.php');
            exit();            
        } 
        include_once '../views/login.php';
    }
}
