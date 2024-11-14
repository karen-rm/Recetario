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
                $data = json_decode($jsonData, true); // true convierte JSON a un array asociativo
                

                $titulo = $data['titulo'] ?? null;
                $instrucciones = $data['instrucciones'] ?? null;
                $tiempo = $data['tiempo'] ?? null;
                $imagen = $data['imagen'] ?? null; 

               /* $response['titulo'] = $titulo;
                $response['instrucciones'] = $instrucciones;
                $response['tiempo'] = $tiempo;
                $response['imagen'] = $imagen;
                echo json_encode($response);*/

                $imagen_completa = '../img_u/' . $imagen;
                $estado="privado";  

                // Suponiendo que tienes un método para guardar la receta
                if($this->recetaModel->agregarReceta($id_usuario, $titulo, $imagen_completa, $instrucciones, $tiempo, $estado)){
                    echo json_encode(array('success' => true, 'message' => 'Datos insertados correctamente, el id_usuario es: '. $id_usuario));
                }else{
                   echo json_encode(array('success' => false, 'message' => 'Datos no insertados correctamente, el id_usuario es: '. $id_usuario));
                }

                //echo json_encode(array('success' => true, 'message' => 'Datos insertados correctamente, el id_usuario es: '. $id_usuario));
               
            }else {
                echo json_encode(array('success' => false, 'message' => 'Error al insertar datos de la receta'));
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
