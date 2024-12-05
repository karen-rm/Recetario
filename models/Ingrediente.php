<?php
// En Receta.php, ajusta la ruta de la siguiente manera
require_once __DIR__ . '/conexion.php';

class Ingrediente
{
    private $conexion; // este atributo se usara para almacenar la conexion de bd 
    private $id_ingresiente;
    private $id_receta;
    private $nombre;
    private $cantidad;

    public function __construct($conexion)
    {  // este metodo es el constructor 
        $this->conexion = $conexion;
    }


    public function agregarIngrediente($id_receta, $nombre, $cantidad, $unidad)
    {
        // Consulta SQL para insertar el ingrediente en la tabla 'ingredientes', ahora incluyendo la unidad
        $sql = "INSERT INTO ingredientes (id_receta, ingrediente, cantidad, unidad)
            VALUES (:id_receta, :ingrediente, :cantidad, :unidad)";

        // Preparar la consulta
        $stmt = $this->conexion->prepare($sql);

        // Vincular los parámetros de la consulta
        $stmt->bindParam(':id_receta', $id_receta);
        $stmt->bindParam(':ingrediente', $nombre);
        $stmt->bindParam(':cantidad', $cantidad);
        $stmt->bindParam(':unidad', $unidad);  // Vinculamos la unidad

        // Ejecutar la consulta y verificar si fue exitosa
        if ($stmt->execute()) {
            return true;  // Retorna true si la inserción fue exitosa
        } else {
            return false; // Retorna false si hubo un error
        }
    }

    public function actualizarIngrediente($id_ingrediente, $id_receta, $nombre, $cantidad, $unidad)
{
    // Consulta SQL para actualizar el ingrediente en la tabla 'ingredientes'
    $sql = "UPDATE ingredientes 
            SET ingrediente = :ingrediente, cantidad = :cantidad, unidad = :unidad 
            WHERE id_ingrediente = :id_ingrediente AND id_receta = :id_receta";

    // Preparar la consulta
    $stmt = $this->conexion->prepare($sql);

    // Vincular los parámetros de la consulta
    $stmt->bindParam(':id_ingrediente', $id_ingrediente);
    $stmt->bindParam(':id_receta', $id_receta);
    $stmt->bindParam(':ingrediente', $nombre);
    $stmt->bindParam(':cantidad', $cantidad);
    $stmt->bindParam(':unidad', $unidad);

    // Ejecutar la consulta y verificar si fue exitosa
    if ($stmt->execute()) {
        return true;  // Retorna true si la actualización fue exitosa
    } else {
        return false; // Retorna false si hubo un error
    }
}

    public function eliminarIngrediente($id_ingrediente)
{
    $sql = "DELETE FROM ingredientes WHERE id_ingrediente = :id_ingrediente";
    $stmt = $this->conexion->prepare($sql);
    $stmt->bindParam(':id_ingrediente', $id_ingrediente);

    return $stmt->execute();
}


    public function obtenerIngredientes($id_receta)
    {
        $sql = "SELECT ingrediente, cantidad, unidad FROM ingredientes WHERE id_receta = :id_receta";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bindParam(':id_receta', $id_receta);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    

}
