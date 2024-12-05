<div class="container mt-3">
  <?php include '../components/carousel.php'; ?>
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
    <div class="recetasCards">
        <!-- Las recetas se cargarán aquí dinámicamente -->
    </div>
</section>
<script type="module" src="./js/ObtenerRecetasPublicasSesion.js"></script>