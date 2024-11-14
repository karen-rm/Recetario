<?php

//require '../models/conexion.php';
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
            //$this->recetaModel = new Receta($this->conexion->conectar());
            $this->usuarioModel = new Usuario($this->conexion->conectar());
            //session_start();
        } catch (Exception $e) {
            echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
            exit();
        }
    }

    /*public function obtenerRecetasUsuario() {
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
    }*/

   


    public function agregarReceta(){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
             // Obtén el JSON de la solicitud y decodifícalo
            
            $id_usuario = $this->usuarioModel->obtenerIdUsuario(); 
            if($id_usuario){

                $jsonData = file_get_contents("php://input");
                $data = json_decode($jsonData, true); // `true` convierte JSON a un array asociativo
                 

                // Crea el objeto receta usando los datos decodificados
                // Extraer los valores de los datos decodificados
                $titulo = $data['titulo'] ?? null;
                $instrucciones = $data['instrucciones'] ?? null;
                $tiempo = $data['tiempo'] ?? null;

                $response['titulo'] = $titulo;
                $response['instrucciones'] = $instrucciones;
                $response['tiempo'] = $tiempo;
                echo json_encode($response);

                $receta = new Receta(
                $this->conexion,
                $id_usuario, 
                $titulo,
                $instrucciones,
                $tiempo,
                $estado="privado");

                // Suponiendo que tienes un método para guardar la receta
                $this->recetaModel->guardarReceta($receta);

                $id_receta = $receta->obtener_idReceta(); 

                

                echo json_encode(array(
                'success' => true,
                'message' => 'Datos insertados correctamente, el id_usuario es: ' . $id_usuario,
                'id_receta' => $id_receta
                ));

                  
                
            }else {
                echo json_encode(array('success' => false, 'message' => 'Error al insertar datos de la receta'));
            }
            
          
        }
         
    }


    /*public function cargarImagen() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
            // Obtener el nombre original del archivo
            $nombreImagen = $_FILES['imagen']['name'];
            $id_receta = $_POST['id_receta']; // Obtener el id_receta que se pasó en el formulario

            // Definir la carpeta donde se almacenará
            $carpetaDestino = '../img_u/'; // Cambia 'uploads/' por la ruta de tu carpeta
            

            // Crear la ruta completa
            $rutaCompleta = $carpetaDestino . $nombreImagen;

            // Mover el archivo a la carpeta destino
            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaCompleta)) {
                
                
                $// Aquí se define la URL completa para la imagen
                $imagen_url = $rutaCompleta;

                // Crear una instancia de Receta con la conexión
                $conexion = new Conexion(); // Asegúrate de tener tu clase de conexión correctamente instanciada
                $receta = new Receta($conexion, null, null, null, null, null); // Solo la conexión es necesaria para acceder a los métodos

                // Llamar al método insertarImagen con el id_receta y la url de la imagen
                if ($receta->insertarImagen($id_receta, $imagen_url)) {
                    echo json_encode(array('success' => true, 'message' => 'Imagen cargada correctamente', 'ruta' => $rutaCompleta));
                } else {
                    echo json_encode(array('success' => false, 'message' => 'Error al actualizar la receta con la imagen.'));
                } 
               
                echo json_encode(array('success' => true, 'message' => 'Imagen cargada correctamente', 'ruta' => $rutaCompleta));
            } else {
                echo json_encode(array('success' => false, 'message' => 'Hubo un error al subir el archivo.'));
            }
        } else {
            echo json_encode(array('success' => false, 'message' => 'No se ha enviado ninguna imagen o hubo un error.'));
        }
    }
}*/


    
}

$controller = new RecetaController();
//$controller->obtenerRecetasUsuario();
//$controller->agregarReceta(); 

$controller = new RecetaController();
if (isset($_GET['action']) && $_GET['action'] === 'agregarReceta') {
    $controller->agregarReceta();
}


?>
