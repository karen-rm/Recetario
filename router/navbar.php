<?php

$nav = <<<HTML
    <style>
        nav {
            border-bottom: 1px solid #8B8484;
        }
        .navbar-nav {
            margin-left: auto; 
        }

        .custom-btn {
            background-color: #F4A261;
            color: white;
            border: none;
            padding: 8px 20px; /* Ajusta el tamaño del botón si es necesario */
            font-weight: bold;
        }

        .custom-btn:hover {
            background-color: #e3924f; /* Color ligeramente más oscuro en hover */
            color: white;
        }

        /* Ajusta la separación entre los botones */
        .navbar .nav-item {
            margin-right: 15px; /* Espacio entre los botones */
        }

    </style>
    <header class="shadow ">
        <nav class="navbar navbar-expand-lg navbar-light p-3 shadow ">
       
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
    
        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <!-- Botón personalizado con margen -->
                    <a class="btn custom-btn me-3" href="javascript:void(0)"  data-page="Inicio">Inicio</a>
                </li>
                <li class="nav-item">
                    <!-- Botón personalizado con margen -->
                    <a class="btn custom-btn" href="javascript:void(0)" data-page="registro">Iniciar Sesión</a>
                </li>
            </ul>
        </div>
    </div>
        </nav>
    </header>
HTML;

echo $nav;
