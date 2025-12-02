
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>editar carta</title>
    <link rel="stylesheet" href="../../../assets/css/header.css">
</head>
<body>
    <h1>editar carta</h1>
    <form method="post" enctype="multipart/form-data">
        <label>
            nombre:
            <input type="text" name="name"> 
        </label>

        <label>
            ataque:
            <input type="text" name="attack">
        </label>

        <label>
            defensa:
            <input type="text" name="defense">
        </label>

        <label>
            insertar Imagen:
            <input type="file" name="file">
        </label>

        <label>
            tipo:
            <input type="text" name="type">
        </label>
        <button type="submit">actualizar</button>
    </form>
</body>
</html>
