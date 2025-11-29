<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>listar usuarios</title>
    <link rel="stylesheet" href="/assets/css/cardsList.css">
</head>

<body>
    <?php include 'header.php'; ?>

    <h1>Cartas</h1>

    <table>
        <tr>
            <th>Id</th>
            <th>ataque</th>
            <th>defensa</th>
            <th>imagen</th>
            <th>tipo</th>
        </tr>

        <?php foreach ($cards as $card) { ?>
            <tr>
                <td><?= $card['nombre'] ?></td>
                <td><?= $card['ataque'] ?></td>
                <td><?= $card['defensa'] ?></td>
                <td> <img src="<?= $card['imagen'] ?>" alt="<?= $card['nombre'] ?>"></td>
                <td><?= $card['tipo'] ?></td>

            </tr>
        <?php } ?>
    </table>
</body>

</html>