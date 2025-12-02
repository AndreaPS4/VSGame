<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>editar usuario</title>
    <link rel="stylesheet" href="../../../assets/css/header.css">
</head>

<body>
    <h1>editar usuario</h1>
    <form method="post">
        <label>
            usuario:
            <input type="text" name="username" value="<?= $user['username'] ?>">
        </label>

        <label>
            email:
            <input type="email" name="email" value="<?= $user['email'] ?>">
        </label>

        <label>
            contraseña:
            <input type="password" name="password">
        </label>
        <button type="submit">guardar</button>
    </form>
</body>

</html>