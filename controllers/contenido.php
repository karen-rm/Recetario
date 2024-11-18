<?php
$opcion = $_GET['opcion'] ?? '';

// if ($opcion === 'login') {
//     include '../view/login.php'; // Ruta al archivo de login
// } elseif ($opcion === 'register') {
//     include '../view/registro.php'; // Ruta al archivo de registro
// } else {
//     echo 'Opción no válida';
// }


switch ($opcion) {
    case 'login':
        include '../view/login.php';
        break;
    case 'register':
        include '../view/registro.php';
        break;
	case 'inicio':
        include '../view/home.php';
        break;
	case 'mis-recetas':
		include '../view/Mis_recetas.php';
		break;

    case 'favoritos':
		include '../view/favoritos.php';
		break;
    default:
        include '../view/home.php'; 
        break;
   
}
?>
