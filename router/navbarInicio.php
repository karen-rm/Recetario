<?php
$nav = <<<HTML
    <style>
        nav {
            border-bottom: 1px solid #8B8484;
        }
        .navbar-nav {
            margin-left: auto;
        }
        .btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .search-bar {
            flex-grow: 1;
            position: relative;
            margin: 0 20px; /* Márgenes a los lados para centrar */
        }
        .search-bar input {
            width: 100%;
            padding-left: 2.5rem;
            padding-right: 2.5rem;
        }
        .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    </style>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light p-3">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="dropdown">
                    <button class="btn rounded-circle fas fa-user fa-lg" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a class="dropdown-item" href="index.php?page=Mis_recetas">Mis recetas</a></li>
                        <li><a class="dropdown-item" href="#">Favoritas</a></li>
                        <li><a class="dropdown-item" href="#">Configuración</a></li>
                    </ul>
                </div>
                <form class="d-flex search-bar">
                    <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
                    <span class="fas fa-search search-icon"></span>
                </form>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="index.php?page=registro">Iniciar Sesión</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
HTML;
echo $nav;
?>

