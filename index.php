<?php
// Define la página por defecto
$page = isset($_GET['page']) ? $_GET['page'] : 'home'; // Página predeterminada

// Define la ruta del archivo a cargar según la página
switch ($page) {
    case 'Inicio':
        include 'view/home_sinsesion.html';
        break;
    case 'registro':
        include 'view/login.php';
        break;
	case 'Mis_recetas':
	include 'view/Mis_recetas';
    default:
        include 'view/home_sinsesion.html'; 
        break;
}
?>

