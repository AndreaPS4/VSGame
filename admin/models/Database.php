<?php

use Exception;
use mysqli;

class Connection
{
    public static function conn(): mysqli
    {
        // Cargamos la configuración
        $config = require __DIR__ . '/../config/database.php';

        $conn = new mysqli(
            $config['DB_HOST'],
            $config['DB_USER'],
            $config['DB_PASS'],
            $config['DB_NAME'],
            $config['DB_PORT']
        );

        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        $conn->set_charset("utf8");
        return $conn;
    }
}
