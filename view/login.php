<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido al login</title>
    <!--Css y js de bootstrap-->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
    <!--icono importado via cdn-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!--Tipografia poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!--Tipografia Sofia-->
    <link href="https://fonts.googleapis.com/css2?family=Sofia:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/loginStyles.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
  <!-- incluir navbar -->
    <?php include 'router/navbar.php'; ?>

    <div class="container-fluid">
        <div class="row" style="height: 85vh;">
            <div class="col-1 d-block d-md-none"></div>
            <section class="col-7 d-none d-md-block my-auto">
                <div class="row align-items-center">
                    <div class="col-7"><h1 class="display-1 my-auto font-italic text-center" id="sofia">+ Recetas</h1></div>
                    <div class="col-5"><img src="resources/images/lasaña.png" alt="imagen de lasaña" width="50%px">  </div>
                </div>
                <h3 class="font-weight-normal text-center">Comparte, cocina y disfruta en <br> cada receta.</h3>
            </section>
            <section class="col-10 col-md-5 my-auto">
                <div class="container-form">
                    <form method="POST" id="loginForm">
                        <h1 class="text-center">Login</h1>
                        <div class="form-group">
                            <label class="font-weight-bold" for="email">Email</label>
                            <input type="email" class="form-control" name="correo" id="email" placeholder="Ingresa tu email">
                        </div>
                        <div class="form-group">
                            <label class="font-weight-bold" for="contraseña">Contraseña</label>
                            <input type="password" class="form-control" name="contraseña" id="contraseña" placeholder="Ingresa tu contraseña">
                        </div>
                        <button type="submit" id="orange" name="action" class="btn btn-lg btn-block">Iniciar Sesión</button>
                        <a href="" class="nav-link text-dark text-left">¿Olvidaste tu contraseña?</a>
                        <hr>
                        <a type="button" id="blue" class="btn btn-lg btn-block text-white" href="./registro.php">Crear cuenta</a>
                    </form>
                </div>
            </section>
            <div class="col-1 d-block d-md-none"></div>
        </div>
    </div>
	 <script type="text/javascript" src="js/login.js"></script>
</body>

</html>