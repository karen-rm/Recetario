<?php
// En Receta.php, ajusta la ruta de la siguiente manera
require_once __DIR__ . '/conexion.php';

class Receta {
    private $conexion; // este atributo se usara para almacenar la conexion de bd 

    public function __construct($conexion) {  // este metodo es el constructor 
        $this->conexion = $conexion;
    }

    public function obtenerRecetasPorUsuario($usuario_id) { // este metodo recibe como parametro el id de un usuario, se utiliza para recuperar las recetas de un usario al que se paso como parametro
        $sql = "SELECT * FROM recetas WHERE id_usuario = :usuario_id"; // define una consulta SQL como una cadena
        $stmt = $this->conexion->prepare($sql); // quí se prepara la consulta SQL usando la conexión almacenada en $this->conexion, el método prepare devuelve un objeto de declaración (statement) 
        $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);//se vincula el valor de $usuario_id al marcador de posición :usuario_id en la consulta SQL, esto asegura que el valor sea tratado como entero
        $stmt->execute(); // se ejecuta la consulta
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // devuelve todos los resultados de la consulta como un array asociativo, donde las claves son los nombres de las columnas
    }
}
?>
