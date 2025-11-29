
<?php

class AuthController
{
    public static function login()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $error = null;

        if ($method === 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];

            if ($username === 'admin' && $password === 'admin') {
                SessionService::start();
                $_SESSION['admin'] = [
                    'name' => 'Admin',
                ];
                header('Location: /admin');
                exit();
            }

            $error = 'Credecnailes incorrectas';
        }

        include __DIR__ . '/../views/login.php';
    }

    public static function logout()
    {
        AuthService::logout();
        header('Location: /admin/login');
        exit();
    }
}
