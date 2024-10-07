<?php

$nav = '
    <style>
    nav{
    border-bottom: 1px solid rgb(32, 31, 31);
    }
  </style>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light ">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>     
            <div class="collapse navbar-collapse " id="navbarSupportedContent">
              <ul class="navbar-nav ">
                <li class="nav-item">
                  <a class="nav-link" href="#">Inicio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Recetas</a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="../view/login.php">Iniciar Sesión</a>
                  </li>
                <li class="nav-item">
                  <a class="nav-link" href="../view/registro.php">Registrarse</a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0 ml-auto">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn" type="submit">
                    <i class="fas fa-search text-dark"></i>
                  </button>
              </form>
            </div>
          </nav>
    </header>
';
echo $nav;
?>