$(document).ready(function () {
  // esta línea asegura que el código dentro de la función se ejecute una vez que el documento HTML haya terminado de cargarse completamente
  // Llamada AJAX para obtener las recetas
  $.ajax({
    url: "../controllers/ctr_receta.php?action=obtenerRecetas", // El archivo PHP del controlador
    method: "GET", //  aqui defino el método HTTP que se utilizará para la solicitud
    dataType: "json", // aqui indico el tipo de datos que se espera recibir del servidor
    success: function (data) {
      mostrarRecetas(data);
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener las recetas:", error);
    },
  });

  function mostrarRecetas(recetas) {
    const contenedor = $("#contenedor-recetas");
    contenedor.empty();
    recetas.forEach((receta) => {
      const tarjeta = `
                <div class="tarjeta">
                    <img src="img_u/${receta.imagen_url}" alt="${receta.titulo}">
                    <i class="bi bi-heart-fill" data-id="${receta.id_receta}"></i>
                    <div class="cardBody">
                        <h3>${receta.titulo}</h3>
                        <div class="opciones">
                            <span class="tres-puntos">...</span>
                            <div class="menu-opciones">
                                <button class="editar">Editar</button>
                                <button class="eliminar" data-id="${receta.id_receta}" data-titulo="${receta.titulo}">Eliminar</button>
                                <button class="publicar">Publicar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      contenedor.append(tarjeta);
    });

    // Función para mostrar/ocultar menú de opciones
    $(".tres-puntos").on("click", function () {
      $(this).next(".menu-opciones").toggle();
    });

    // Inicializa las recetas que se encuentran en favoritos
    inicializarFavoritos();

    let idReceta = null;
    $(".eliminar").on("click", function () {
      idReceta = $(this).data("id");
      const tituloReceta = $(this).data("titulo");
      $("#modalRecetaTitulo").text(`"${tituloReceta}"`);
      $("#confirmModal").modal("show");
    });

    $("#confirmDeleteBtn").on("click", function () {
      if (idReceta) {
        eliminarReceta(idReceta);
        $("#confirmModal").modal("hide");
      }
    });

    let recetaIdSeleccionada = null;
    $(".bi-heart-fill").on("click", function () {
      const id_receta = $(this).data("id");
      const icono = $(this);
      if (icono.hasClass("text-danger")) {
        recetaIdSeleccionada = id_receta;
        $("#confirmModalFavoritos").modal("show");
      } else {
        toggleFavorito(id_receta, function (success) {
          if (success) {
            icono.addClass("text-danger");
            $("#aceptarFavoritos").modal("show");
          }
        });
      }
    });

    // Confirmar eliminación de favoritos
    $("#confirmDeleteFavoritoBtn").on("click", function () {
      toggleFavorito(recetaIdSeleccionada, function (success) {
        if (success) {
          $("#confirmModalFavoritos").modal("hide");
          $(`.bi.bi-heart-fill[data-id="${recetaIdSeleccionada}"]`).removeClass(
            "text-danger"
          ); // Cambiar a gris
        }
      });
    });
  }
  window.mostrarRecetas = mostrarRecetas;

  function inicializarFavoritos() {
    $.ajax({
      url: "../controllers/ctr_receta.php?action=obtenerFavoritos",
      method: "GET",
      success: function (response) {
        if (typeof response === "string") {
          response = JSON.parse(response);
        }
        const favoritos = response.favoritos || [];
        if (favoritos.length === 0) {
          console.warn("No hay favoritos para este usuario.");
          return;
        }
        favoritos.forEach((id_receta) => {
          $("#contenedor-recetas")
            .find(`.bi.bi-heart-fill[data-id="${id_receta}"]`)
            .addClass("text-danger");
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al inicializar favoritos:", error);
      },
    });
  }

  // Función para alternar el estado de favoritos
  function toggleFavorito(id_receta, callback) {
    $.ajax({
      url: "../controllers/ctr_receta.php?action=toggleFavorito",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ id_receta: id_receta }),
      success: function (response) {
        if (typeof response === "string") {
          response = JSON.parse(response);
        }
        callback(response.success);
      },
      error: function (xhr, status, error) {
        console.error("Error al alternar favoritos:", error);
        callback(false);
      },
    });
  }

  function eliminarReceta(idReceta) {
    $.ajax({
      url: "../controllers/ctr_receta.php?action=eliminarReceta",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ id_receta: idReceta }),
      success: function (response) {
        if (typeof response === "string") {
          response = JSON.parse(response);
        }
        if (response.success) {
          // alert(response.message || 'Receta eliminada correctamente.');
          $(`.eliminar[data-id="${idReceta}"]`).closest(".tarjeta").remove();
        } else {
          alert(response.message || "Error al eliminar la receta.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error al eliminar la receta:", error);
      },
    });
  }
});
