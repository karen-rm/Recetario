<?php
// controllers/loginController.php

require_once '../models/conexion.php';
require_once '../models/loginModel.php';

session_start();
$newloginModel = new loginModel($conexion);

if (isset($_POST['correo']) && isset($_POST['contraseña'])) {
    $email_user = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    try {
        // Autenticar el usuario y obtener el ID
        $userId = $newloginModel->autenticarUsuario($email_user, $contraseña);

        if ($userId) {
            // Guarda el ID en la sesión
            $_SESSION['user_id'] = $userId;

            // Redirecciona al dashboard o página principal
            header("Location: ../view/home_sesion.php");
            exit();
        } else {
            echo '<script type="text/javascript">
                alert("Usuario o contraseña incorrecta.");
                window.location.href = "../view/login.php";
            </script>';
        }
    } catch (Exception $e) {
        echo "Error al autenticar usuario: " . $e->getMessage();
    }
}
?>
