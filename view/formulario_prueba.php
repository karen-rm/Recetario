<?php
// Incluir el archivo de conexión
require '../models/conexion.php';

// Verificar si el formulario ha sido enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recuperar datos del formulario, incluido el ID del usuario
    $id_usuario = $_POST['id_usuario'];
    $titulo = $_POST['titulo'];
    $instrucciones = $_POST['instrucciones'];
    $tiempo_preparacion = $_POST['tiempo_preparacion'];
    $estado = $_POST['estado'];

    // Manejo de la imagen
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
        $nombre_imagen = $_FILES['imagen']['name'];
        $ruta_destino = '../img_u/' . $nombre_imagen;

        // Mover la imagen a la carpeta 'uploads'
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta_destino)) {
            // Insertar los datos en la base de datos
            $sql = "INSERT INTO recetas (id_usuario, titulo, imagen_url, instrucciones, tiempo_preparacion, estado) 
                    VALUES (:id_usuario, :titulo, :imagen_url, :instrucciones, :tiempo_preparacion, :estado)";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
            $stmt->bindParam(':titulo', $titulo);
            $stmt->bindParam(':imagen_url', $ruta_destino);
            $stmt->bindParam(':instrucciones', $instrucciones);
            $stmt->bindParam(':tiempo_preparacion', $tiempo_preparacion);
            $stmt->bindParam(':estado', $estado);

            if ($stmt->execute()) {
                echo "Receta insertada exitosamente.";
            } else {
                echo "Error al insertar la receta en la base de datos.";
            }
        } else {
            echo "Error al subir la imagen.";
        }
    } else {
        echo "No se ha seleccionado ninguna imagen o hubo un error al subirla.";
    }
}
?>