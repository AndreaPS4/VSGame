<?php
include_once '../models/Card.php';
class GameController 
{
    public static function create  ()    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $name = $_POST['name'] ?? '';
            $ataque = $_POST['attack'] ?? '';
            $defense = $_POST['defense'] ?? '';
            $image = $_FILES['file'] ?? '';
            $type = $_POST['type'] ?? '';

            Card::save($name, $ataque, $defensa, $image, $type);
            header('Location: ../index.php');
            exit();            
        } 
        include_once '../views/login.php';
    }
    
}
