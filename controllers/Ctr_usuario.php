<?php
// controllers/Ctr_usuario.php

require_once '../models/conexion.php';
require_once '../models/Usuario.php';

class CtrUsuario {

    private $usuarioModel;
    private $conexion; 

     public function __construct() {
        // Crear una instancia de la clase Conexion
        $this->conexion = new Conexion();
        $this->usuarioModel = new Usuario($this->conexion->conectar());
        //session_start();
    }

    // Método para manejar el inicio de sesión
    public function login($correo, $contraseña) {
        try {
            // Autenticar el usuario y obtener el ID
            $userId = $this->usuarioModel->autenticarUsuario($correo, $contraseña);

            if ($userId) {
                 session_start();
                // Guarda el ID en la sesión
                $_SESSION['user_id'] = $userId;
                echo "success";  // Responde con "success" si la autenticación es correcta
            } else {
                // Responde con mensaje de error si las credenciales son incorrectas
                echo "Usuario o contraseña incorrecta.";
            }
        } catch (Exception $e) {
            echo "Error al autenticar usuario: " . $e->getMessage();
        }
    }

    // Método para manejar el registro de usuarios
    public function registrar($nombres, $apellido_paterno, $apellido_materno, $correo, $telefono, $usuario, $contrasenia) {
        try {
            // Llamar al método registrarUsuario del modelo para insertar los datos en la base de datos
            $resultado = $this->usuarioModel->registrarUsuario($nombres, $apellido_paterno, $apellido_materno, $correo, $telefono, $usuario, $contrasenia);

            if ($resultado === 'success') {
                echo 'Registro exitoso';
            } else {
                echo $resultado;  // Muestra el mensaje de error si ocurrió algún problema
            }
        } catch (Exception $e) {
            echo "Error al registrar usuario: " . $e->getMessage();
        }
    }
}

// Maneja la solicitud POST de inicio de sesión
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion']) && $_POST['accion'] === 'login') {
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];
    $conexion = new Conexion(); // Asegúrate de que estás creando una conexión válida
    $controller = new CtrUsuario($conexion);
    $controller->login($correo, $contraseña);
}
?>
