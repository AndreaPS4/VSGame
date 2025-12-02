<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>crear usuario</title>
    <link rel="stylesheet" href="../../../assets/css/header.css">

</head>

<body>
    <?php include 'header.php'; ?>

    <h1>Añadir usuario</h1>
    <form method="post">
        <label>
            usuario:
            <input type="text" name="username">
        </label>

        <label>
            contraseña:
            <input type="password" name="password">
        </label>

        <label>
            email:
            <input type="email" name="email">
        </label>
        <button type="submit">registar usuario</button>
    </form>
</body>

</html>