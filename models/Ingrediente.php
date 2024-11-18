<?php
// En Receta.php, ajusta la ruta de la siguiente manera
require_once __DIR__ . '/conexion.php';

class Ingrediente {
    private $conexion; // este atributo se usara para almacenar la conexion de bd 
    private $id_ingresiente; 
    private $id_receta; 
    private $nombre; 
    private $cantidad; 

    public function __construct($conexion, $id_receta, $nombre, $cantidad) {  // este metodo es el constructor 
        $this->conexion = $conexion;
        $this->id_receta = $id_receta;
        $this->nombre = $nombre;
        $this->cantidad = $cantidad;
    }

    public function obtener_id_ingrediente(){
        return $this->id_ingresiente; 
    }

      public function agregarIngrediente($ingrediente) {
      // Consulta SQL con los nombres correctos de las columnas y valores
      $sql = "INSERT INTO ingredientes (id_receta, nombre, cantidad)
              VALUES (:id_receta, :nombre, :cantidad)"; 
              
      $stmt = $this->conexion->prepare($sql);

      // Obtener los atributos del objeto Ingrediente pasado como parámetro
      $stmt->bindParam(':id_receta', $ingrediente->id_receta);
      $stmt->bindParam(':nombre', $ingrediente->nombre);
      $stmt->bindParam(':cantidad', $ingrediente->cantidad);

      // Ejecuta la consulta y verifica el resultado
      if ($stmt->execute()) {
          return true;  // Retorna true si la inserción fue exitosa
      } else {
          return false; // Retorna false si hubo un error
      }
  }

}
?>
