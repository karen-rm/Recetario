<?php
// Configuración de la base de datos
$host = "localhost"; 
$usuario = "root";
$contraseña = "";
$base_de_datos = "recetario";

try {
    $dsn = "mysql:host=$host;dbname=$base_de_datos;charset=utf8";
    $conexion = new PDO($dsn, $usuario, $contraseña);

    // Habilitar el manejo de errores con excepciones
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conexion;
} catch (PDOException $e) {
    die("Error al conectar a la base de datos: " . $e->getMessage());
}
?>