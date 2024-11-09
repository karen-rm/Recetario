<?php
header('Content-Type: application/json');
require '../models/conexion.php';
require '../models/Receta.php';
require '../models/Usuario.php';

class RecetaController {
    private $conexion;
    private $recetaModel;
    private $usuarioModel;

    public function __construct() {
        try {
            $this->conexion = new Conexion();
            $this->recetaModel = new Receta($this->conexion->conectar());
            $this->usuarioModel = new Usuario($this->conexion->conectar());
            session_start();
        } catch (Exception $e) {
            echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
            exit();
        }
    }

    public function obtenerRecetasUsuario() {
        try {
            $usuario_id = $this->usuarioModel->obtenerIdUsuario();
            if ($usuario_id) {
                $recetas = $this->recetaModel->obtenerRecetasPorUsuario($usuario_id);
                echo json_encode($recetas);
            } else {
                echo json_encode(["error" => "Usuario no autenticado o ID de usuario no disponible"]);
            }
        } catch (Exception $e) {
            echo json_encode(["error" => "Error al obtener recetas: " . $e->getMessage()]);
        }
    }
}

$controller = new RecetaController();
$controller->obtenerRecetasUsuario();
?>
