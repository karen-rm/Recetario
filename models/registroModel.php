<?php
class RegistroModel {
    private $conexion;

    // Constructor, recibe la conexión de la base de datos
    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // Función para registrar el usuario en la base de datos
    public function registrarUsuario($nombres, $apellido_paterno, $apellido_materno, $correo, $telefono, $usuario, $contrasenia) {
        try {
            // Comenzar una transacción
            $this->conexion->beginTransaction();

            // Insertar el usuario en la tabla 'usuarios'
            $stmt = $this->conexion->prepare("INSERT INTO usuarios (usuario, correo, contrasenia) VALUES (?, ?, ?)");
            $stmt->execute([$usuario, $correo, password_hash($contrasenia, PASSWORD_DEFAULT)]);

            // Obtener el ID del usuario insertado
            $id_usuario = $this->conexion->lastInsertId();

            // Insertar los datos personales en la tabla 'datos_personales'
            $stmt = $this->conexion->prepare("INSERT INTO datos_personales (id_usuario, nombres, apellido_paterno, apellido_materno, num_telefonico) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$id_usuario, $nombres, $apellido_paterno, $apellido_materno, $telefono]);

            // Confirmar la transacción
            $this->conexion->commit();

            return 'success';  // Devolver el éxito del registro
        } catch (PDOException $e) {
            // Si hay un error, revertir la transacción
            $this->conexion->rollBack();
            return "Error al registrar: " . $e->getMessage();
        }
    }
}
?>
