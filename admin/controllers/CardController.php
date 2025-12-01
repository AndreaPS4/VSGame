<?php

include_once __DIR__ . '/../models/Card.php';

class CardController
{
    public static function list()
    {
        $cards = Card::selectAll();

        include __DIR__ . '/../views/cards/list.php';
    }

    public static function create()
    {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'POST') {
            $nombre = $_POST['name'] ?? '';
            $ataque = $_POST['attack'] ?? '';
            $defensa = $_POST['defense'] ?? '';
            $imagen = $_FILES['image'] ?? null;
            $tipo = $_POST['type'] ?? '';

            Card::create($nombre, $ataque, $defensa, $imagen, $tipo);

            header('Location: /admin/cards');
            exit();
        }

        include __DIR__ . '/../views/cards/create.php';
    }
}
