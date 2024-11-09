<?php
// models/loginModel.php

class loginModel {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function autenticarUsuario($correo, $contraseña) {
        try {
            // Prepara la consulta para obtener la contraseña encriptada y el identificador
            $stmt = $this->conexion->prepare("SELECT id_usuario, contrasenia FROM usuarios WHERE correo = :correo");
            $stmt->bindParam(':correo', $correo);
            $stmt->execute();

            // Verifica si el usuario existe
            if ($stmt->rowCount() > 0) {
                $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

                // Verifica la contraseña ingresada con la almacenada
               if ($contraseña === $usuario['contrasenia']) {
    // Retorna el identificador del usuario
    return $usuario['id_usuario'];
}

            }
            return false; // Autenticación fallida
        } catch (PDOException $e) {
            throw new Exception("Error en la autenticación: " . $e->getMessage());
        }
    }
}
?>
