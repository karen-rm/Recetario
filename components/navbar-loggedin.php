<nav class="navbar navbar-expand-lg navbar-light p-3">
  <div class="container">
    <!-- Dropdown para el logo -->
    <div class="dropdown">
      <button class="btn rounded-circle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-opcion="logo">
        <img src="./images/logo.png" alt="Logo" width="40" height="40" class="d-inline-block align-text-top rounded-circle">
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><a class="dropdown-item" href="" data-opcion="perfil">Mi perfil</a></li>
        <li><a class="dropdown-item" href="" data-opcion="salir">Salir</a></li>
        <!-- <li><a class="dropdown-item" href="#" data-opcion="configuracion">Configuración</a></li> -->
      </ul>
    </div>

    <!-- Botón para el menú móvil (hamburger) -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" data-opcion="menu">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Menú de navegación colapsable -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Formulario de búsqueda -->
      <form class="d-flex search-bar" data-opcion="buscar">
        <input class="form-control w-100 me-2" type="search" placeholder="Buscar" aria-label="Search" style="width: 250px;">
        <span class="fas fa-search search-icon"></span>
      </form>
      <!-- Enlaces de navegación -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="" data-opcion="inicio">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="" data-opcion="mis-recetas">Mis recetas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="" data-opcion="favoritos">Favoritos</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
