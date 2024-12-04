import { recuperarRecetaInfo } from './editarReceta.js';

export function obtenerRecetas(callback) {
  console.log('Obteniendo recetas'); 
  $.ajax({
    url: '/Recetario/controllers/ctr_receta.php?action=obtenerRecetas',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      callback(null, data);
    },
    error: function (xhr, status, error) {
      console.error('Error al obtener las recetas:', error);
      callback(error, null);
    },
  });
}

export function mostrarRecetas(recetas) {
  const contenedor = $('#contenedor-recetas');
  contenedor.empty(); // Limpiar el contenedor

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
                                <button class="editar" data-id="${receta.id_receta}">Editar</button>
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
  $('.tres-puntos').on('click', function (event) {
    $('.menu-opciones').hide(); 
    $(this).next('.menu-opciones').toggle();
    event.stopPropagation(); 
  });

   // Cierra los menús al hacer clic fuera
  $(document).on('click', function () {
    $('.menu-opciones').hide(); 
  });

  inicializarFavoritos();

        let idReceta = null;
        $('.eliminar').on('click', function () {
            idReceta = $(this).data('id'); 
            const tituloReceta = $(this).data('titulo');
            $('#modalRecetaTitulo').text(`"${tituloReceta}"`); 
            $('#confirmModal').modal('show');
        });

        $('#confirmDeleteBtn').on('click', function () {
            if (idReceta) {
                eliminarReceta(idReceta);
                $('#confirmModal').modal('hide');
            }
        });


        let recetaIdSeleccionada = null;
        $('.bi-heart-fill').on('click', function () {
            const id_receta = $(this).data('id');
            const icono = $(this);
            if (icono.hasClass('text-danger')) {
                recetaIdSeleccionada = id_receta;
                $('#confirmModalFavoritos').modal('show');
            } else {
                toggleFavorito(id_receta, function (success) {
                    if (success) {
                        icono.addClass('text-danger'); 
                        $('#aceptarFavoritos').modal('show');
                    }
                });
            }
        });
    
        // Confirmar eliminación de favoritos
        $('#confirmDeleteFavoritoBtn').on('click', function () {
            toggleFavorito(recetaIdSeleccionada, function (success) {
                if (success) {
                    $('#confirmModalFavoritos').modal('hide');
                    $(`.bi.bi-heart-fill[data-id="${recetaIdSeleccionada}"]`).removeClass('text-danger'); // Cambiar a gris
                }
            });
        });
}

function inicializarFavoritos() {
        $.ajax({
            url: '/Recetario/controllers/ctr_receta.php?action=obtenerFavoritos',
            method: 'GET',
            success: function (response) {
                if (typeof response === "string") {
                    response = JSON.parse(response);
                }
                const favoritos = response.favoritos || [];
                if (favoritos.length === 0) {
                    console.warn("No hay favoritos para este usuario.");
                    return;
                }
                favoritos.forEach(id_receta => {
                    $('#contenedor-recetas')
                        .find(`.bi.bi-heart-fill[data-id="${id_receta}"]`)
                        .addClass('text-danger');
                });
            },
            error: function (xhr, status, error) {
                console.error("Error al inicializar favoritos:", error);
            }
        });
    }

    // Función para alternar el estado de favoritos
    function toggleFavorito(id_receta, callback) {
        $.ajax({
            url: '/Recetario/controllers/ctr_receta.php?action=toggleFavorito',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id_receta: id_receta }),
            success: function (response) {
                if (typeof response === 'string') {
                    response = JSON.parse(response);
                }
                callback(response.success);
            },
            error: function (xhr, status, error) {
                console.error("Error al alternar favoritos:", error);
                callback(false);
            }
        });
    }

    function eliminarReceta(idReceta) {
        $.ajax({
            url: '/Recetario/controllers/ctr_receta.php?action=eliminarReceta',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id_receta: idReceta }),
            success: function (response) {
                if (typeof response === "string") {
                    response = JSON.parse(response);
                }
                if (response.success) {
                    // alert(response.message || 'Receta eliminada correctamente.');
                    $(`.eliminar[data-id="${idReceta}"]`).closest('.tarjeta').remove();
                } else {
                    alert(response.message || 'Error al eliminar la receta.');
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al eliminar la receta:", error);
            }
        });
    }

export function configurarBotonEditar() {
  $('#contenedor-recetas').on('click', '.editar', function () {
    const recetaId = $(this).data('id'); // Obtén el ID de la receta
    console.log(`Botón Editar presionado para la receta con ID: ${recetaId}`);
    recuperarRecetaInfo(recetaId); 
  });
}


export const estadoReceta = {
  isEditing: false,
  setEditing(isEdit) {
    this.isEditing = isEdit;
  },
  getEditing() {
    return this.isEditing;
  },
};



