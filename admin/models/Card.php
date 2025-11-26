<?php
require_once __DIR__ . '/Database.php';

class Card
 {
    public static function insert(string $nombre, string $ataque, string $defensa , string $imagen, string $poderEspecial, string $tipo) :bool {
        $conn = Connection::conn();
        $query = "INSERT INTO usuarios (nombre, ataque, defensa, imagen, poderEspecial, tipo) VALUES (?,?,?,?,?,?)";
         
        $stmt = $conn->prepare($query);
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bind_param('ssssss', $nombre, $ataque, $defensa, $poderEspecial, /**imagen */ $tipo);
        return $stmt->execute();
    }

    public static function selectAll() :array {
        $conn = Connection::conn();
        $query = "SELECT * FROM cartas ORDER BY DESC nombre";
        $stmt = $conn->prepare($query);
        return $stmt->fetch_assoc();
    }

    public static function deletePorId(int $id) : bool {
       $query = "DELETE FROM cartas WHERE id  = ?";
       $stmt = $conn->prepare($query);
    }
 }