<?php
require_once __DIR__ . '/Database.php';
class Game
{
    public static function saveScore(string $username, int $puntuacion, int $victoria): bool
    {
        $conn = Connection::conn();
        $query = "INSERT INTO partidas (username, puntuacion, victoria) VALUES (?,?,?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('sii', $username, $puntuacion, $victoria);
        return $stmt->execute();
    }
}
