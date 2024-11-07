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
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../js/registro.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>

<body>
    
    
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="container-form " style="background-color: #D9D9D9;">

            <div class="d-flex justify-content-end"> <span class="cerrar-btn">&times;</span> </div>
            <h3 class="text-center">Registrarte</h3>
            <p class="text-center text-muted" style="font-size: 0.875rem;">Es rápido y fácil.</p>
            <hr>

            <!--Formulario-->
            <form id="registroForm" method="POST" action="ruta_del_servidor.php">
                <div class="form-group">
                    <label class="font-weight-bold" for="nombre">Nombre(S)</label>
                    <input type="text" class="form-control form-control-sm" id="nombre" maxlength="30" placeholder="Nombre" required>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col">
                            <label class="font-weight-bold" for="apellido_paterno">Apellido Paterno</label>
                            <input type="text" class="form-control form-control-sm" id="apellido_paterno" maxlength="30" placeholder="Apellido Paterno" required>
                        </div>
                        <div class="col">
                            <label class="font-weight-bold" for="apellido_materno">Apellido Materno</label>
                            <input type="text" class="form-control form-control-sm" id="apellido_materno" maxlength="30" placeholder="Apellido Materno" required>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="correo">Correo electrónico</label>
                    <input type="email" class="form-control form-control-sm" id="correo" maxlength="30" placeholder="Correo electrónico" required>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="telefono">Número de teléfono</label>
                    <input type="tel" class="form-control form-control-sm" id="telefono" maxlength="10" placeholder="Número de teléfono +52" required>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="usuario">Usuario</label>
                    <input type="text" class="form-control form-control-sm" id="usuario" maxlength="30" placeholder="Usuario" required autocomplete="new-user">
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="contraseña">Contraseña</label>
                    <input type="password" class="form-control form-control-sm" id="contraseña" maxlength="30" placeholder="Contraseña" required autocomplete="new-password">
                </div>
                <button type="submit" id="blue" class="text-white btn btn-primary btn-sm btn-block">Registrarme</button>
            </form>


        </div>
    </div> <!-- Fin modal registro -->
    <script type="text/javascript" src="../resources/css/bootstrap/js/bootstrap.bundle.js"></script>
</body>

</html>
