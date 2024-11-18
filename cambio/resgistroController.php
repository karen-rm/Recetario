<?php
// Incluir el archivo de conexión a la base de datos
require_once '../models/conexion.php';

// Incluir el archivo del modelo
require_once '../models/Usuario.php';

// Recibir los datos del formulario enviados por AJAX
$nombres = $_POST['nombre'];
$apellido_paterno = $_POST['apellido_paterno'];
$apellido_materno = $_POST['apellido_materno'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$usuario = $_POST['usuario'];
$contrasenia = $_POST['contraseña'];

// Encriptar la contraseña antes de enviarla a la base de datos
$contrasenia_encriptada = password_hash($contrasenia, PASSWORD_DEFAULT);

// Crear una instancia del modelo y pasarle la conexión

$registroModel = new CtrUsuario($conexion);

// Llamar al método registrarUsuario del modelo para insertar los datos en la base de datos
$resultado = $registroModel->registrar($nombres, $apellido_paterno, $apellido_materno, $correo, $telefono, $usuario, $contrasenia_encriptada);

// Devolver la respuesta
echo $resultado;  // Puede devolver 'success' o el mensaje de error si ocurrió algún problema
?>
