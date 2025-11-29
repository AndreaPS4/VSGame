<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>listar usuarios</title>
</head>

<body>
    <?php include 'header.php'; ?>

    <h1>Uusuarios</h1>

    <table>
        <tr>
            <th>Id</th>
            <th>Usuario</th>
            <th>Email</th>
        </tr>
        <?php foreach ($users as $user) { ?>
            <tr>
                <td><?= $user['id'] ?></td>
                <td><?= $user['username'] ?></td>
                <td><?= $user['email'] ?></td>
            </tr>
        <?php } ?>
    </table>
</body>

</html>