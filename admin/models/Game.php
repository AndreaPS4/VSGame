<?php
require_once __DIR__ . '/Database.php';

class Game 
{
    public static function save ($puntuacion, string $ataque, string $defensa) : bool {
        $conn = Connection::conn();
        $query = "INSERT INTO cartas (puntuacion, ataque, defensa) VALUES (?,?,?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('iss', $puntuacion, $ataque, $defensa);
        return $stmt->execute();
    }
}