<?php
session_start(); // Asegúrate de iniciar la sesión
require_once '../models/conexion.php';
require_once '../models/Usuario.php';

// Validar que los datos han sido recibidos correctamente
if (isset($_POST['correo'], $_POST['contraseña'])) {
    // Recibir los datos del formulario
    $correo = filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL);
    $contrasenia = trim($_POST['contraseña']);

    // Crear una instancia de la conexión
    $conexion = (new Conexion())->conectar();

    // Crear una instancia del modelo y pasarle la conexión
    $registroModel = new Usuario($conexion);

    // Llamar al método autenticarUsuario del modelo para verificar los datos
    $resultado = $registroModel->autenticarUsuario($correo, $contrasenia);

    // Verificar el resultado y devolver la respuesta
    if ($resultado === true) {
        // setcookie('user_logged_in', 'true', time() + 3600, '/'); 
        echo "success";  // Éxito en la autenticación
    } else {
        echo "Error al autenticar usuario.";  // Enviar mensaje de error en caso de fallo
    }
} else {
    echo "Datos incompletos.";
}
