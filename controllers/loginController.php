<?php

require_once 'models/loginModel.php';
require_once 'models/conexion.php';

if (isset($_POST['email']) && isset($_POST['contraseña'])) {

    $username = $_POST['email'];
    $password = $_POST['contraseña'];

}
?>
