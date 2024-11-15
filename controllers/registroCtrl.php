<?php
require_once '../models/conexion.php';
require_once '../models/Usuario.php';

// Validar que los datos han sido recibidos correctamente
if (isset($_POST['nombre'], $_POST['apellido_paterno'], $_POST['apellido_materno'], $_POST['correo'], $_POST['telefono'], $_POST['usuario'], $_POST['contraseña'])) {
    // Recibir los datos del formulario
    $nombres = $_POST['nombre'];
    $apellido_paterno = $_POST['apellido_paterno'];
    $apellido_materno = $_POST['apellido_materno'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $usuario = $_POST['usuario'];
    $contrasenia = $_POST['contraseña'];

    // Crear una instancia de la conexión
    $conexion = (new Conexion())->conectar();
    
    // Crear una instancia del modelo y pasarle la conexión
    $registroModel = new Usuario($conexion);

    // Llamar al método registrarUsuario del modelo para insertar los datos en la base de datos
    $resultado = $registroModel->registrarUsuario($nombres, $apellido_paterno, $apellido_materno, $correo, $telefono, $usuario, $contrasenia);

    // Verificar el resultado y devolver la respuesta
    if ($resultado) {
        echo "success";  // Éxito en el registro
    } else {
        echo "Error al registrar usuario.";  // Enviar mensaje de error en caso de fallo
    }
} 


?>