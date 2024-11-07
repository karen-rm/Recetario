<?php
session_start();
require '../models/conexion.php';
require '../models/Usuario.php';

class LoginController {
    private $usuarioModel;

    public function __construct($conexion) {
        $this->usuarioModel = new Usuario($conexion);
    }

    public function iniciarSesion($correo, $contraseña) {
        if ($this->usuarioModel->verificarCredenciales($correo, $contraseña)) {
            // Si las credenciales son válidas, iniciar sesión
            $_SESSION['usuario'] = $correo;
            header("Location: ../view/home.html");  // Asegúrate de que esta ruta es correcta
            exit();
        } else {
            // Si las credenciales son inválidas, redirigir al login con error
            header("Location: ../view/login.php?error=1");
            exit();
        }
    }
}

// Verificar si se envió la solicitud de inicio de sesión
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    // Crear una instancia del controlador y llamar a iniciar sesión
    $loginController = new LoginController($conexion);
    $loginController->iniciarSesion($correo, $contraseña);
}
?>
