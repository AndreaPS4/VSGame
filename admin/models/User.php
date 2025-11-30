<?php
require_once __DIR__ . '/Database.php';

class User
{
    public static function create($username, $email, $password): bool
    {
        $conn = Connection::conn();
        $query = "INSERT INTO usuarios (username, email, password) VALUES (?,?,?)";

        $stmt = $conn->prepare($query);
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bind_param('sss', $username, $email, $hashed_password);

        return $stmt->execute();
    }

    public static function selectAll(): array
    {
        $conn = Connection::conn();
        $query = "SELECT * FROM usuarios ORDER BY id DESC";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function delete(int $usarioId): bool
    {
        $conn = Connection::conn();
        $query = "DELETE FROM usuarios WHERE usuario_id = $usarioId";
        return $conn->query($query);
    }

    public static function edit($usuarioId, $name, $email, $password): bool
    {
        $conn = Connection::conn();
        $query = "UPDATE usuarios SET name = ?, email = ?, password = ? WHERE usuario_id = ? ";


        $stmt = $conn->prepare($query);
        $stmt->bind_param('sssi', $nombre,  $email, $password, $usuarioId);

        return $stmt->execute();
    }
    public static function getByUserName(string $username): array|false|null
    {
        $conn = Connection::conn();
        $query = "SELECT * FROM usuarios WHERE username = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
}
