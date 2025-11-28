<?php
require_once __DIR__ . '/Database.php';

class Card
{
    public static function insert(string $nombre, string $ataque, string $defensa, string $imagen, string $poderEspecial, string $tipo): bool
    {
        $conn = Connection::conn();
        $query = "INSERT INTO usuarios (nombre, ataque, defensa, imagen, poderEspecial, tipo) VALUES (?,?,?,?,?,?)";
        $stmt = $conn->prepare($query);
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["imagen"]["name"]);
        move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file);
        $imagen = $target_file;
        $stmt->bind_param('ssssss', $nombre, $ataque, $defensa, $imagen, $poderEspecial,  $tipo);
        return $stmt->execute();
    }

    public static function selectAll(): array
    {
        $conn = Connection::conn();
        $query = "SELECT * FROM cartas ORDER BY nombre DESC";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function deletePorId(int $id): bool
    {
        $conn = Connection::conn();
        $query = "DELETE FROM cartas WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
