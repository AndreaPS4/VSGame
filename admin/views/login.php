<?php include 'header.php'; ?>

<div class="login-container">
    <h2>Iniciar sesión</h2>

    <form method="POST">
        <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input type="text" name="username" id="usuario" required>
        </div>

        <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" name="password" id="password" required>
        </div>

        <button type="submit">Iniciar sesión</button>
    </form>

    <?php
    if ($error) {
        echo '<p class="error">' . htmlspecialchars($error) . '</p>';
    }
    ?>
</div>