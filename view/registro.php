<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido al registro</title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/style_registro.css">
    <!--iconos-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!--Tipografia poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>

<body>
<!--
    <?php include '../router/navbar.php'; ?> -->
    
    <!--Modal registro-->
    <div class="d-flex justify-content-center align-items-center">
        <div class="registro-content">
            <span class="cerrar-btn">&times;</span>
            <div class="encabezado">
                <h2>Registrarte</h2>
                <p>Es rápido y fácil.</p>
            </div>
            <hr>
            <form>
                <div class="row mb-3">
                    <div class="col">
                        <input type="text" class="form-control" id="nombre" placeholder="Nombre" required>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="apellido" placeholder="Apellido" required>
                    </div>
                </div>

                <div class="mb-3">
                    <input type="email" class="form-control" id="correo" placeholder="Correo electrónico" required>
                </div>

                <div class="mb-3">
                    <input type="tel" class="form-control" id="telefono" placeholder="Número de teléfono" required>
                </div>

                <div class="row mb-3">
                    <div class="col">
                        <input type="text" class="form-control" id="usuario" placeholder="Usuario" required autocomplete="new-user">
                    </div>
                    <div class="col">
                        <input type="password" class="form-control" id="contraseña" placeholder="Contraseña" required autocomplete="new-password">
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Registrarme</button>
            </form>
        </div>
    </div>
    <!--Fin modal registro-->

    </div>

    <script type="text/javascript" src="../resources/css/bootstrap/js/bootstrap.bundle.js"></script>
</body>

</html>