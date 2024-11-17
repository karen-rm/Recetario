<?php
// Define la página por defecto
$page = isset($_GET['page']) ? $_GET['page'] : 'home';
// Define la ruta del archivo a cargar según la página
switch ($page) {
    case 'Inicio':
        include 'view/home_sinsesion.php';
        break;
    case 'registro':
        include 'view/login.php';
        break;
    case 'Iniciosesion':
        include 'view/home_sesion.php';
        break;
    case 'Mis_recetas':
        include 'view/Mis_recetas.php';
        break;
    case 'registrarse':
        include 'view/registro.php';
        break;
    default:
        include 'view/home_sinsesion.php';
        break;
}
?>