<?php

require '../models/conexion.php';
require '../models/Ingrediente.php';


header('Content-Type: application/json');


class IngredienteController
{
  private $conexion;
  private $ingredienteModel;


  public function __construct()
  {
    try {
      $this->conexion = new Conexion();
      $this->ingredienteModel = new Ingrediente($this->conexion->conectar());
    } catch (Exception $e) {
      echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
      exit();
    }
  }


  public function agregarIngrediente()
  {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

      // Obtiene los datos JSON de la solicitud
      $jsonData = file_get_contents("php://input");
      $data = json_decode($jsonData, true);  // Decodificamos el JSON recibido

      // Verificamos que existan los datos necesarios

      $id_receta = $data['id_receta'];  // ID de la receta
      $ingredientes = $data['ingredientes'];  // Array de ingredientes


      $resultado = ["status" => "success", "message" => "Ingredientes guardados"];
      foreach ($ingredientes as $ingrediente) {
        $nombre = $ingrediente['ingrediente'];
        $cantidad = $ingrediente['cantidad'];
        $unidad = $ingrediente['medidaValor'];

        // Si ocurre un error al guardar, actualizar el resultado
        if (!$this->ingredienteModel->agregarIngrediente($id_receta, $nombre, $cantidad, $unidad)) {
          $resultado = ["status" => "error", "message" => "Error al guardar los ingredientes"];
          break; // Salimos del bucle si hay un error
        }
      }

      // Envía una única respuesta JSON al finalizar
      echo json_encode($resultado);
    }
  }

  public function obtenerIngredientes()
{
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $id_receta = $_GET['id_receta'];
        $ingredientes = $this->ingredienteModel->obtenerIngredientes($id_receta);

        if ($ingredientes === false) {
            echo json_encode(["error" => "No se encontraron ingredientes"]);
            return;
        }

        // Verifica si $ingredientes es un array antes de codificarlo
        if (is_array($ingredientes)) {
            echo json_encode($ingredientes);
        } else {
            echo json_encode(["error" => "Error en la respuesta de ingredientes"]);
        }
    }
}

}

$controller = new IngredienteController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (isset($_GET['action']) && $_GET['action'] === 'obtenerIngredientes') {
    $controller->obtenerIngredientes();
  }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_GET['action'])) {
    switch ($_GET['action']) {
      case 'agregarIngrediente':
        $controller->agregarIngrediente();
        break;
      default:
        echo json_encode(['error' => 'Acción no reconocida']);
        break;
    }
  }
}
