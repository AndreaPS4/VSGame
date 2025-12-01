<?php

class Connection
{
    public static function conn(): mysqli
    {
        // Cargamos la configuración
        require __DIR__ . '/../config/database.php';

        $conn = new mysqli(
            $config['database']['host'],
            $config['database']['user'],
            $config['database']['pass'],
            $config['database']['database'],
            $config['database']['port']
        );

        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        $conn->set_charset("utf8");
        return $conn;
    }
}
