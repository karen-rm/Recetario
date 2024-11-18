<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido</title>
  <!-- Incluir Bootstrap CSS -->
  <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
  <!-- Incluir tu propio archivo de estilos -->
  <link rel="stylesheet" href="css/index.css">
  <!-- Tipografía Poppins -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <!-- Iconos Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Iconos Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
  <?php include 'router/navbarInicio.php'; ?>

  <div class="container mt-3">
    <?php include 'components/carousel.php'; ?>
  </div>

  <section>
    <div class="container d-flex justify-content-between mt-5">
      <div class="comidas-box">
        <i class="fas fa-coffee"></i>
        <h4>Desayunos</h4>
      </div>
      <div class="comidas-box">
        <i class="fas fa-utensils"></i>
        <h4>Entradas</h4>
      </div>
      <div class="comidas-box">
        <i class="fas fa-drumstick-bite"></i>
        <h4>Platos Fuertes</h4>
      </div>
      <div class="comidas-box">
        <i class="fas fa-ice-cream"></i>
        <h4>Postres</h4>
      </div>
      <div class="comidas-box">
        <i class="fas fa-glass-martini-alt"></i>
        <h4>Bebidas</h4>
      </div>
    </div>
  </section>


  <section class="container mt-5">
    <h2>Destacado</h2>
    <div class="d-flex justify-content-between">
      <div class="recetas-destacadas">
        <img src="" alt="">
        <h4></h4>
      </div>
      <div class="recetas-destacadas">
        <img src="" alt="">
        <h4></h4>
      </div>
      <div class="recetas-destacadas">
        <img src="" alt="">
        <h4></h4>
      </div>
    </div>

  </section>
</body>

</html>