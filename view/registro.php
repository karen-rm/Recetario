<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido al registro</title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../css/registroStyles.css">
    <!-- Tipografía Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>

<body>
    <?php include '../router/navbar.php'; ?> 
    <!-- Modal registro -->
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="container-form" style="background-color: #D9D9D9;">
            <div class="d-flex justify-content-end"> <span class="cerrar-btn">&times;</span> </div>
            <h3 class="text-center">Registrarte</h3>
            <p class="text-center text-muted" style="font-size: 0.875rem;">Es rápido y fácil.</p>
            <hr>
            <form>
                <div class="form-group">
                    <label class="font-weight-bold" for="nombre">Nombre(S)</label>
                    <input type="text" class="form-control form-control-sm" id="nombre" placeholder="Nombre" required>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="apellido">Apellido(S)</label>
                    <input type="text" class="form-control form-control-sm" id="apellido" placeholder="Apellido" required>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="correo">Correo electrónico</label>
                    <input type="email" class="form-control form-control-sm" id="correo" placeholder="Correo electrónico" required>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="telefono">Número de teléfono</label>
                    <input type="tel" class="form-control form-control-sm" id="telefono" placeholder="Número de teléfono" required>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="usuario">Usuario</label>
                    <input type="text" class="form-control form-control-sm" id="usuario" placeholder="Usuario" required autocomplete="new-user">
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="contraseña">Contraseña</label>
                    <input type="password" class="form-control form-control-sm" id="contraseña" placeholder="Contraseña" required autocomplete="new-password">
                </div>
                <button type="submit" id="blue" class="text-white btn btn-primary btn-sm btn-block">Registrarme</button>
            </form>
        </div>
    </div> <!-- Fin modal registro -->
    <script type="text/javascript" src="../resources/css/bootstrap/js/bootstrap.bundle.js"></script>
</body>

</html>
