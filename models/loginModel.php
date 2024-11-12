<?php
class LoginModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function autenticarUsuario($correo, $contrasenia) {
        try {
            // Preparar la consulta SQL
            $sql = "SELECT * FROM usuarios WHERE correo = :correo LIMIT 1";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
            $stmt->execute();

            $usuarioBD = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verificar si el usuario existe y si la contraseña es correcta
            if ($usuarioBD && password_verify($contrasenia, $usuarioBD['contrasenia'])) {
                // La contraseña es correcta
                return true;
            } else {
                // Las credenciales son incorrectas
                return false;
            }
        } catch (PDOException $e) {
            throw new Exception("Error al autenticar el usuario: " . $e->getMessage());
        }
    }
}
?>
