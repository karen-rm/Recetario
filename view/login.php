<!-- <link rel="stylesheet" href="css/loginStyles.css"> -->

<div class="container-fluid">
  <div class="row" style="height: 85vh;">
    <div class="col-1 d-block d-md-none"></div>
    <section class="col-7 d-none d-md-block my-auto">
      <div class="row align-items-center">
        <div class="col-7">
          <h1 class="display-1 my-auto font-italic text-center" id="sofia">+ Recetas</h1>
        </div>
        <div class="col-5"><img src="./images/lasaña.png" alt="imagen de lasaña" width="50%px"> </div>
      </div>
      <h3 class="font-weight-normal text-center">Comparte, cocina y disfruta en <br> cada receta.</h3>
    </section>
    <section class="col-12 col-md-5 my-auto d-flex align-items-center justify-content-center">
      <!-- Formulario de inicio de sesión -->
      <div class="container-form">
        <form method="POST" id="loginForm">
          <h1 class="text-center mb-3">Iniciar Sesión</h1>
          <div class="form-group input-group-md">
            <label class="font-weight-bold" for="email">Email</label>
            <input type="email" class="form-control" maxlength="30" name="correo" id="correo" placeholder="Ingresa tu email">
            <div class="invalid-feedback" id="mensaje-correo"></div>
          </div>
          <div class="form-group input-group-md">
            <label class="font-weight-bold" for="contraseña">Contraseña</label>
            <input type="password" class="form-control" maxlength="30" name="contraseña" id="contraseña" placeholder="Ingresa tu contraseña">
            <div class="invalid-feedback" id="mensaje-contraseña"></div>
          </div>
          <button type="submit" id="orange" name="action" class="btn btn-md btn-block">Iniciar Sesión</button>
          <a href="" class="nav-link text-dark text-left">¿Olvidaste tu contraseña?</a>
          <hr>
          <a type="button" id="blue" class="btn btn-md btn-block text-white" href="index.php?page=registrarse">Crear cuenta</a>
        </form>
      </div>
    </section>
    <div class="col-1 d-block d-md-none"></div>
  </div>
</div>
<!-- <script type="text/javascript" src="../js/login.js"></script> -->