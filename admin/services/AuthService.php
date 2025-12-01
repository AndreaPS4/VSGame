<?php

class AuthService
{
    public static function check(): bool
    {
        SessionService::start();

        return isset($_SESSION['admin']);
    }

    public static function middleware(): void
    {
        if (! self::check()) {
            header('Location: /admin/login');
            exit();
        }
    }

    public static function login(string $username, string $password): bool
    {
        if ($username === 'admin' && $password === 'admin') {
            SessionService::start();
            $_SESSION['admin'] = [
                'name' => 'Admin',
            ];

            return true;
        }

        return false;
    }

    public static function logout(): void
    {
        SessionService::destroy();
    }
}
