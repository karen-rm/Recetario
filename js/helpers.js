function obtenerRecetas(callback) {
  $.ajax({
    url: "../controllers/ctr_receta.php?action=obtenerRecetas",
    method: "GET",
    dataType: "json",
    success: function (data) {
      callback(null, data);
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener las recetas:", error);
      callback(error, null);
    },
  });
}
window.obtenerRecetas = obtenerRecetas;

function mostrarRecetasVolver(recetas) {
  const contenedor = document.getElementById("contenedor-recetas"); // Usando getElementById
  contenedor.innerHTML = ""; // Limpiar el contenedor

  recetas.forEach((receta) => {
    const tarjeta = `
      <div class="tarjeta shadow-sm">
        <img src="img_u/${receta.imagen_url}" class="img-fluid" alt="${receta.titulo}">
        <i class="bi bi-heart-fill" data-id="${receta.id_receta}"></i>
        <div class="cardBody">
          <h3>${receta.titulo}</h3>
          <div class="opciones">
            <span class="tres-puntos">...</span>
            <div class="menu-opciones">
              <button class="editar" data-id="${receta.id_receta}">Editar</button>
              <button class="eliminar" data-id="${receta.id_receta}" data-titulo="${receta.titulo}">Eliminar</button>
              <button class="publicar">Publicar</button>
            </div>
          </div>
        </div>
      </div>
    `;

    contenedor.innerHTML += tarjeta; // Añadir la tarjeta generada al contenedor
  });

  // Función para mostrar/ocultar menú de opciones
  $(".tres-puntos").on("click", function (event) {
    $(".menu-opciones").hide();
    $(this).next(".menu-opciones").toggle();
    event.stopPropagation();
  });

  // Cierra los menús al hacer clic fuera
  $(document).on("click", function () {
    $(".menu-opciones").hide();
  });
}
window.mostrarRecetasVolver = mostrarRecetasVolver;
export function configurarBotonEditar() {
  $("#contenedor-recetas").on("click", ".editar", function () {
    const recetaId = $(this).data("id"); // Obtén el ID de la receta
    console.log(`Botón Editar presionado para la receta con ID: ${recetaId}`);
    //mostrarFormularioEditar();
    recuperarRecetaInfo(recetaId);
  });
}
