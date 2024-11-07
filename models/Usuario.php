<?php
class Usuario {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function verificarCredenciales($correo, $contraseña) {
        // Consulta SQL para verificar usuario y contraseña
        $query = "SELECT * FROM usuarios WHERE correo = :correo AND contraseña = :contraseña";
        $stmt = $this->conexion->prepare($query);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':contraseña', $contraseña);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return true;
        }
        return false;
    }
}

?>
