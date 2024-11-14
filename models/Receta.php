<?php
// En Receta.php, ajusta la ruta de la siguiente manera
require_once __DIR__ . '/conexion.php';

class Receta {
    private $conexion; // este atributo se usara para almacenar la conexion de bd 
    private $id_receta; 
    private $usuario;
    private $titulo; 
    private $imagen_url; 
    private $instrucciones; 
    private $tiempo; 
    private $estado; 

 public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerRecetasPorUsuario($usuario_id) { // este metodo recibe como parametro el id de un usuario, se utiliza para recuperar las recetas de un usario al que se paso como parametro
        $sql = "SELECT * FROM recetas WHERE id_usuario = :usuario_id"; // define una consulta SQL como una cadena
        $stmt = $this->conexion->prepare($sql); // quí se prepara la consulta SQL usando la conexión almacenada en $this->conexion, el método prepare devuelve un objeto de declaración (statement) 
        $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);//se vincula el valor de $usuario_id al marcador de posición :usuario_id en la consulta SQL, esto asegura que el valor sea tratado como entero
        $stmt->execute(); // se ejecuta la consulta
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // devuelve todos los resultados de la consulta como un array asociativo, donde las claves son los nombres de las columnas
    }


    public function obtener_idReceta(){
        return $this->id_receta; 
    }

  public function agregarReceta($id_usuario, $titulo, $imagen, $instrucciones, $tiempo, $estado) {
        //echo 'Entre al modelo agregarreceta';
        
        $sql = "INSERT INTO recetas (id_usuario, titulo, imagen_url, instrucciones, tiempo_preparacion, estado) 
                    VALUES (:id_usuario, :titulo, :imagen_url, :instrucciones, :tiempo_preparacion, :estado)";
            $stmt = $this->conexion->prepare($sql);
            $stmt->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
            $stmt->bindParam(':titulo', $titulo);
            $stmt->bindParam(':imagen_url', $imagen);
            $stmt->bindParam(':instrucciones', $instrucciones);
            $stmt->bindParam(':tiempo_preparacion', $tiempo);
            $stmt->bindParam(':estado', $estado);

            // Ejecuta la consulta y verifica el resultado
            if ($stmt->execute()) {
                return true;  // Retorna true si la inserción fue exitosa
            } else {
                return false; // Retorna false si hubo un error
            }
    }    

}
?>
