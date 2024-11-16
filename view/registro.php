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
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>

<body>

<div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="container-form " style="background-color: #D9D9D9;">

        <div class="d-flex justify-content-end "><span class="cerrar-btn" onclick="window.history.back();">&times;</span></div>
        <h1 class="text-center">Registrarte</h1>
        <p class="text-center text-muted fs-3">Es rápido y fácil.</p>
        <hr>

        <!--Formulario-->
        <form id="registroForm" method="POST">
            <div class="form-group">
                <label class="font-weight-bold" for="nombre">Nombre(S)</label>
                <input type="text" class="form-control form-control-md" id="nombre" name="nombre" maxlength="30" placeholder="Ingresa tu Nombre">
                <div class="invalid-feedback" id="mensaje-nombre"></div>
            </div>
            <div class="form-group">
                <label class="font-weight-bold" for="apellido_paterno">Apellido Paterno</label>
                <input type="text" class="form-control form-control-md" id="apellido_paterno" name="apellido_paterno" maxlength="30" placeholder="Ingresa tu Apellido Paterno">
                <div class="invalid-feedback" id="mensaje-apellidoPaterno"></div>
            </div>
            <div class="form-group">
                <label class="font-weight-bold" for="apellido_materno">Apellido Materno</label>
                <input type="text" class="form-control form-control-md" id="apellido_materno" name="apellido_materno" maxlength="30" placeholder="Ingresa tu Apellido Materno">
                <div class="invalid-feedback" id="mensaje-apellidoMaterno"></div>
            </div>
            <div class="form-group">
                <label class="font-weight-bold" for="correo">Correo electrónico</label>
                <input type="email" class="form-control form-control-md" id="correo" name="correo" maxlength="30" placeholder="Ingresa tu Correo electrónico">
                <div class="invalid-feedback" id="mensaje-correo"></div>
            </div>
            <div class="form-group">
                <label class="font-weight-bold" for="telefono">Número de teléfono</label>
                <input type="tel" class="form-control form-control-md" id="telefono" name="telefono" maxlength="10" placeholder="Ingresa tu Número de teléfono +52">
                <div class="invalid-feedback" id="mensaje-telefono"></div>
            </div>
            <div class="form-group">
                <label class="font-weight-bold" for="usuario">Usuario</label>
                <input type="text" class="form-control form-control-md" id="usuario" name="usuario" maxlength="30" placeholder="ingresa Nombre de Usuario" autocomplete="new-user">
                <div class="invalid-feedback" id="mensaje-usuario"></div>
            </div>
            <div class="form-group">
                <label class="font-weight-bold" for="contraseña">Contraseña</label>
                <input type="password" class="form-control form-control-md" id="contraseña" name="contraseña" maxlength="30" placeholder="Ingresa tu Contraseña" autocomplete="new-password">
                <div class="invalid-feedback" id="mensaje-contraseña"></div>
            </div>
            <button type="submit" id="orange" class="text-white btn btn-sm btn-block">Registrarte</button>
        </form>
    </div>
</div> <!-- Fin modal registro -->
<script type="text/javascript" src="../resources/css/bootstrap/js/bootstrap.bundle.js"></script>
<script src="/js/registro.js"></script>
</body>

</html>