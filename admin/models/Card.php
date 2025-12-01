<?php
require_once __DIR__ . '/Database.php';

class Card
{
    public static function create(string $nombre, string $ataque, string $defensa, $imagen, string $tipo): bool
    {
        $conn = Connection::conn();
        $query = "INSERT INTO cartas (nombre, ataque, defensa, imagen, tipo) VALUES (?,?,?,?,?)";
        $stmt = $conn->prepare($query);
        $target_dir = __DIR__ . '/../../assets/img/';
        $target_file = $target_dir . basename($imagen["name"]);
        move_uploaded_file($imagen["tmp_name"], $target_file);
        $imagen = '/assets/img/' . basename($imagen["name"]);
        $stmt->bind_param('sssss', $nombre, $ataque, $defensa, $imagen,  $tipo);
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

    public static function edit(int $id, string $nombre, string $ataque, string $defensa, string $imagen, string $tipo): bool
    {
        $conn = Connection::conn();
        $query = "UPDATE cartas  SET nombre = ?, ataque = ?, defensa = ?, imagen = ?, tipo = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssssss", $nombre, $ataque, $defensa, $imagen, $tipo, $id);
        return $stmt->execute();
    }
}
