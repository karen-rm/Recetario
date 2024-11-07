<?php

$carousel = <<<HTML

  <div id="customCarousel" class="carousel slide" data-bs-ride="carousel" style="max-height: 400px;">
    <ol class="carousel-indicators">
      <li data-bs-target="#customCarousel" data-bs-slide-to="0" class="active"></li>
      <li data-bs-target="#customCarousel" data-bs-slide-to="1"></li>
      <li data-bs-target="#customCarousel" data-bs-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100 img-fluid rounded" src="../resources/images/comida-1.jpg" alt="First slide" style="max-height: 400px; object-fit: cover;">
        <div class="carousel-caption d-none d-md-block" style="background-color: rgba(0, 0, 0, 0.6); padding: 10px; border-radius: 10px;">
          <h5>Pollo al curry con manzana</h5>
        </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100 img-fluid rounded" src="../resources/images/comida-2.jpg" alt="Second slide" style="max-height: 400px; object-fit: cover;">
        <div class="carousel-caption d-none d-md-block" style="background-color: rgba(0, 0, 0, 0.6); padding: 10px; border-radius: 10px;">
          <h5>Pollo al curry con manzana</h5>
        </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100 img-fluid rounded" src="../resources/images/comida-3.jpg" alt="Third slide" style="max-height: 400px; object-fit: cover;">
        <div class="carousel-caption d-none d-md-block" style="background-color: rgba(0, 0, 0, 0.6); padding: 10px; border-radius: 10px;">
          <h5>Pollo al curry con manzana</h5>
        </div>
      </div>
    </div>
  </div>
HTML;

echo $carousel;

?>

