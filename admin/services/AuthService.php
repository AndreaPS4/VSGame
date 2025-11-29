<?php

class AuthService
{
    public static function check(): bool
    {
        SessionService::start();

        return isset($_SESSION['admin']);
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

    public static function logout(string $username, string $password): void
    {
        SessionService::destroy();
    }
}
