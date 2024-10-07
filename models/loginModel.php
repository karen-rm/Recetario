<?php
class loginModel
{
    private $db;

    public function __construct($dbConnection)
    {
        $this->db = $dbConnection;
    }

    public function autenticarUsuario($usuario, $contrasenia)
{
    try {
        // Preparar la consulta SQL
        $sql = "SELECT * FROM usuarios WHERE correo = :correo LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':correo', $usuario, PDO::PARAM_STR);
        $stmt->execute();

        $usuarioBD = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si el usuario existe
        if ($usuarioBD && password_verify($contrasenia, $usuarioBD['contrasenia'])) {
            // El usuario está autenticado
            return true;
        } else {
            // Credenciales incorrectas
            return false;
        }
    } catch (PDOException $e) {
        throw new Exception("Error al autenticar el usuario: " . $e->getMessage());
    }
}

}

