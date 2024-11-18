<!-- <nav class="navbar navbar-expand-lg navbar-light p-3">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto">
            <?php if (!isset($_SESSION['user'])): // Si no está logueado 
            ?>
                <li class="nav-item">
                    <a class="btn custom-btn me-3"  data-opcion="register">Registrarme</a>
                </li>
                <li class="nav-item">
                    <a class="btn custom-btn" " data-opcion="login">Iniciar Sesión</a>
                </li>
            <?php else: // Si está logueado 
            ?>
                <li class="nav-item">
                    <a class="btn custom-btn me-3"  data-opcion="profile">Mi Perfil</a>
                </li>
                <li class="nav-item">
                    <a class="btn custom-btn" data-opcion="logout">Cerrar Sesión</a>
                </li>
            <?php endif; ?>
        </ul>
    </div>
</nav> -->



<nav class="navbar navbar-expand-lg navbar-light p-3">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <!-- Botón personalizado con atributo data-opcion -->
                <a class="btn custom-btn me-3" data-opcion="register">Registrarme</a>
            </li>
            <li class="nav-item">
                <!-- Botón personalizado con atributo data-opcion -->
                <a class="btn custom-btn" data-opcion="login">Iniciar Sesión</a>
            </li>
        </ul>
    </div>
</nav>