<?php
require_once '../models/conexion.php';
require_once '../models/loginModel.php';

$newloginModel = new loginModel($conexion);

if (isset($_POST['correo']) && isset($_POST['contraseña'])) {
    $email_user = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    try {
        // Autenticar el usuario
        $autenticado = $newloginModel->autenticarUsuario($email_user, $contraseña);

        if ($autenticado) {
            // Redireccionar al dashboard o a la página principal
            header("Location: ../index.html");
            exit();
        } else {
            echo '<script type="text/javascript">
            alert("Usuario no encontrado.");
            window.location.href = "../view/login.php"; // Cambia esta ruta a tu página de inicio de sesión
          </script>';      
            exit();
        }
    } catch (Exception $e) {
        echo "Error al autenticar usuario: " . $e->getMessage();
    }
}
?>

