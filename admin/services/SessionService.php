<?php

class SessionService
{
    public static function start(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public static function destroy(): void
    {
        self::start();

        session_destroy();
    }
}
