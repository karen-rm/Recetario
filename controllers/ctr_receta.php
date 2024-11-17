<?php

require '../models/conexion.php';
require '../models/Receta.php';
require '../models/Usuario.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

header('Content-Type: application/json');
header('Content-Type: image/jpeg');

class RecetaController
{
    private $conexion;
    private $recetaModel;
    private $usuarioModel;

    public function __construct()
    {
        try {
            $this->conexion = new Conexion();
            $this->recetaModel = new Receta($this->conexion->conectar());
            $this->usuarioModel = new Usuario($this->conexion->conectar());
        } catch (Exception $e) {
            echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
            exit();
        }
    }

    public function obtenerRecetasUsuario()
    {
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

    public function agregarReceta()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id_usuario = $this->usuarioModel->obtenerIdUsuario();
            if ($id_usuario) {
                $jsonData = file_get_contents("php://input");
                $data = json_decode($jsonData, true); // true convierte JSON a un array asociativo


                $titulo = $data['titulo'] ?? null;
                $instrucciones = $data['instrucciones'] ?? null;
                $tiempo = $data['tiempo'] ?? null;
                //$imagen = $data['imagen'] ?? null; 

                /* $response['titulo'] = $titulo;
                $response['instrucciones'] = $instrucciones;
                $response['tiempo'] = $tiempo;
                $response['imagen'] = $imagen;
                echo json_encode($response);*/

                //$imagen_completa = '../img_u/' . $imagen;
                $estado = "privado";

                // Suponiendo que tienes un método para guardar la receta
                $id_receta = $this->recetaModel->agregarReceta($id_usuario, $titulo, $instrucciones, $tiempo, $estado);
                if ($id_receta) {
                    echo json_encode(array('success' => true, 'id_receta' => $id_receta, 'message' => 'Receta agregada correctamente.'));
                } else {
                    echo json_encode(array('success' => false, 'message' => 'Error al agregar la receta.'));
                }


                //echo json_encode(array('success' => true, 'message' => 'Datos insertados correctamente, el id_usuario es: '. $id_usuario));

            } else {
                echo json_encode(array('success' => false, 'message' => 'Error al insertar datos de la receta'));
            }
        }
    }


    public function agregarImagen() {
    echo "Entrando a agregarImagen";  // Mensaje de depuración

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        echo 'Entramos al controlador y la solicitud es POST';

        // Verificar si el archivo de la imagen ha sido enviado
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
            echo 'Imagen recibida correctamente';

            // Definir la ruta donde se guardará la imagen (asegúrate de que la carpeta tenga permisos de escritura)
            $nombreImagen = $_FILES['imagen']['name']; // Nombre original del archivo
            $rutaImagen = '../img_u/' . $nombreImagen;

            echo "Moviendo archivo a: " . $rutaImagen;

            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaImagen)) {
                echo 'Imagen movida con éxito';

                // Recuperar el id_receta enviado por el cliente
                $id_receta = $_POST['idreceta'];  // Aquí obtenemos el id_receta desde el POST
                echo 'idreceta recibido: ' . $id_receta;

                // Llamar al método que agrega la imagen a la base de datos
                $resultado = $this->recetaModel->agregarImagen($id_receta, $rutaImagen);

                if ($resultado) {
                    echo json_encode(array('success' => true, 'message' => 'Imagen subida y guardada correctamente.', 'idreceta' => $id_receta, 'rutaImagen' => $rutaImagen));
                } else {
                    echo json_encode(array('success' => false, 'message' => 'Error al guardar la imagen en la base de datos.'));
                }
            } else {
                echo json_encode(array('success' => false, 'message' => 'Error al mover la imagen al directorio.'));
            }
        } else {
            // Si no se ha seleccionado ninguna imagen o hubo un error en la carga
            echo json_encode(array('success' => false, 'message' => 'No se ha seleccionado ninguna imagen o hubo un error en la carga.'));
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
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'agregarReceta':
                $controller->agregarReceta();
                break;
            case 'agregarImagen':

                $controller->agregarImagen();
                break;
            default:
                echo json_encode(['error' => 'Acción no reconocida']);
                break;
        }
    }
}
