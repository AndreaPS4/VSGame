<?php

include_once __DIR__ . '/../models/User.php';

class UserController
{
    public static function list()
    {
        $users = User::selectAll();

        include __DIR__ . '/../views/users/list.php';
    }

    public static function create()
    {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $email = $_POST['email'];

            User::create($username, $email, $password);

            header('Location: /admin/users');
            exit();
        }

        include __DIR__ . '/../views/users/create.php';
    }

    public static function edit($userId)
    {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $email = $_POST['email'];

            User::edit($userId, $username, $email, $password);

            header('Location: /admin/users');
            exit();
        }

        $user = User::getById($userId);

        include __DIR__ . '/../views/users/edit.php';
    }

    public static function delete($usarioId)
    {
        User::delete($usarioId);
        header('Location: /admin/users');
        exit();
    }
}
