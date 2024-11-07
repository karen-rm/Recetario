<?php
class Usuario {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function verificarCredenciales($correo, $contraseña) {
        // Consulta para verificar el usuario en la base de datos
        $query = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
        $stmt = $this->conexion->prepare($query);
        
        // Encriptar la contraseña antes de compararla con la base de datos
        $hashedPassword = md5($contraseña);  // Usa el mismo método que al guardar la contraseña
        
        // Ejecutar la consulta
        $stmt->bind_param("ss", $correo, $hashedPassword);
        $stmt->execute();
        $resultado = $stmt->get_result();

        return $resultado->num_rows > 0; // Devuelve true si hay coincidencia
    }
}
?>
