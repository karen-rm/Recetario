<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Recetas</title>

    <!-- Cargar jQuery antes de Bootstrap -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="css/Mis_recetas.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Sofia:wght@400;600&display=swap" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<?php include 'router/navbarInicio.php'; ?>

<div id="contenedor-recetas" class="recetas-container"></div>

<!-- Botón de prueba para agregar receta -->
<div class="container-fluid">
    <!-- Div donde se cargará el formulario agregar -->
    <div id="contenedor_form_agregar"  class="hidden" >
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="registro-content">
    <span class="cerrar-btn">
      <i class="bi bi-x"></i>
    </span>
                <div class="encabezado">
                    <h2>Agregar receta</h2>
                    <p>Rellena todos los campos con la información solicitada.</p>
                </div>
                <hr>
                <form id="formReceta">
                    <div class="mb-3">
                        <label for="titulo">Título de la receta</label>
                        <input type="text" class="form-control" id="titulo" name="titulo" required pattern="[A-Za-z\s]+" title="Solo se permiten letras">
                    </div>

                    <div class="mb-3">
                        <label>Ingredientes</label>
                        <div id="ingredientes-container">
                            <div class="row ingrediente">
                                <div class="col">
                                    <input type="text" class="form-control" name="ingrediente"  placeholder="Ingrediente" required >
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" name="cantidad" placeholder="Cantidad" required >
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-danger eliminar-ingrediente" disabled>
                                        <i class="bi bi-x"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button type="button" id="agregarIngrediente" class="btn btn-link">
                            <i class="bi bi-plus"></i> Agregar ingrediente
                        </button>
                    </div>

                    <div class="mb-3">
                        <label for="instrucciones">Instrucciones</label>
                        <textarea class="form-control" id="instrucciones" name="instrucciones" rows="4" required></textarea>
                    </div>

                    <div class="row mb-3">
                        <div class="col">
                            <label for="tiempo">Tiempo de preparación</label>
                            <input type="number" class="form-control" id="tiempo" name="tiempo" required min="1">

                        </div>
                        <div class="col">
                            <br><br>
                            <p>minutos.</p>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="img">Selecccione una imagen </label>
                        <br>
                        <input type="file" class="input_img" name="imagen" id="imagen" accept="image/*"  required>
                    </div>


                    <button id="insertar_receta" type="submit" class="btn btn-primary">Guardar receta</button>
                </form>
            </div>
        </div>

    </div>
    <!-- Botón para agregar recta -->
    <button id="btn_agregar_receta" class="btn btn-outline-secondary rounded-circle p-3 lh-1 p-0 d-flex justify-content-center align-items-center" style="width: 50px; height: 50px;" type="button"
            name="mostrarFormulario" value="Mostrar Formulario">
        <i class="bi bi-plus"></i>
    </button>
</div>

<!-- Scripts -->
<script src="js/Mis_recetas.js"></script>
<script src="js/agregarReceta.js"></script>
</body>
</html>
