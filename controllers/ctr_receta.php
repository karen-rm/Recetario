<?php
require '../models/conexion.php';
require '../models/Receta.php';

// Iniciar la sesión inicia una nueva sesión o reanuda una sesión existente, utilizan para almacenar información sobre el usuario (como su ID de usuario) 
//que puede ser accedida a través de diferentes páginas durante la navegación
//session_start(); 

//Aquí se asigna a la variable $usuario_id el valor del ID de usuario almacenado en la sesión, se asume que este valor se ha establecido previamente en otra parte de la aplicación (iniciar secion)
//$usuario_id = $_SESSION['user_id'];

//este es una variable que le asigno un id de un usuario previamnete que yo registre, esto con el finn de probar el metodo (obtenerRecetasPorUsuario)
//cuando este funcionando correctamente iniciarsecion por favor borrar estos comentarios y la variable con asignacion por favor :)
// si quieren probar los valores son entre 1 y 2, cada usuario debera de mostrar diferentes recetas.
$usuario_id = 1;
//Se crea una nueva instancia de la clase Receta, pasando la conexión a la base de datos $conexion como argumento, esto permite que el modelo de recetas acceda a la base de datos para realizar consultas.
$recetaModel = new Receta($conexion);

// Recuperar las recetas del usuario
$recetas = $recetaModel->obtenerRecetasPorUsuario($usuario_id);

// Devolver los datos en formato JSON
echo json_encode($recetas);
?>
