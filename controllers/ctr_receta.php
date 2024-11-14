<?php

require '../models/conexion.php';
require '../models/Receta.php';
require '../models/Usuario.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start(); 

header('Content-Type: application/json');

class RecetaController {
    private $conexion;
    private $recetaModel;
    private $usuarioModel;

    public function __construct() {
        try {
            $this->conexion = new Conexion();
            $this->recetaModel = new Receta($this->conexion->conectar());
            $this->usuarioModel = new Usuario($this->conexion->conectar());
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
		 exit();
    }

    public function agregarReceta() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id_usuario = $this->usuarioModel->obtenerIdUsuario(); 
            if ($id_usuario) {
                $jsonData = file_get_contents("php://input");
                $data = json_decode($jsonData, true);

                $titulo = $data['titulo'] ?? null;
                $instrucciones = $data['instrucciones'] ?? null;
                $tiempo = $data['tiempo'] ?? null;

                $receta = new Receta(
                    $this->conexion,
                    $id_usuario, 
                    $titulo,
                    $instrucciones,
                    $tiempo,
                    $estado = "privado"
                );

                $this->recetaModel->guardarReceta($receta);
                $id_receta = $receta->obtener_idReceta();

                echo json_encode([
                    'success' => true,
                    'message' => 'Datos insertados correctamente, el id_usuario es: ' . $id_usuario,
                    'id_receta' => $id_receta
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al insertar datos de la receta']);
            }
        }
    }

    public function cargarImagen() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
                $nombreImagen = $_FILES['imagen']['name'];
                $id_receta = $_POST['id_receta'];
                $carpetaDestino = '../img_u/';
                $rutaCompleta = $carpetaDestino . $nombreImagen;

                if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaCompleta)) {
                    $imagen_url = $rutaCompleta;

                    $receta = new Receta($this->conexion, null, null, null, null, null);
                    if ($receta->insertarImagen($id_receta, $imagen_url)) {
                        echo json_encode(['success' => true, 'message' => 'Imagen cargada correctamente', 'ruta' => $rutaCompleta]);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Error al actualizar la receta con la imagen.']);
                    }
                } else {
                    echo json_encode(['success' => false, 'message' => 'Hubo un error al subir el archivo.']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'No se ha enviado ninguna imagen o hubo un error.']);
            }
        }
    }
}

$controller = new RecetaController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] === 'obtenerRecetas') {
        $controller->obtenerRecetasUsuario();
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['action']) && $_GET['action'] === 'agregarReceta') {
        $controller->agregarReceta();
    }
}
