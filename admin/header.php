<?php if (AuthService::check()) { ?>

    <header>
        <nav>
            <ul>
                <li><a href="/admin">Inicio</a></li>
                <li><a href="/admin/cards/create">Crear Carta</a></li>
                <li><a href="/admin/cards">lista de Cartas</a></li>
                <li><a href="/admin/users/create">Crear usuario</a></li>
                <li><a href="/admin/users">lista de usuarios</a></li>
            </ul>
        </nav>
    </header>

<?php } ?>