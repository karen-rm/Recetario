<?php
require_once 'conexion.php'; 

class Usuario {
    private $conexion;
	private $id_usuario;
	private $usuario;
	private $correo;
	private $contrasegna;
    // Constructor, recibe la conexión de la base de datos
    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // Función para autenticar el usuario
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
					 $_SESSION['user_id'] = $usuario['id_usuario']; // Guarda el ID en la sesión
                return $usuario['id_usuario'];
                }
            }
            return false; // Autenticación fallida
        } catch (PDOException $e) {
            throw new Exception("Error en la autenticación: " . $e->getMessage());
        }
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
public function obtenerIdUsuario() {
    if (!$this->id_usuario && isset($_SESSION['user_id'])) {
        $this->id_usuario = $_SESSION['user_id'];
    }
    
    // Agregar mensaje de depuración
    error_log("ID del usuario obtenido: " . $this->id_usuario);
    
    return $this->id_usuario;
}

	public function asignarIdUsuario($id) {
        return $this->id_usuario = $id;
    }
}
?>
