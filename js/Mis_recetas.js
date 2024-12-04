import { configurarBotonEditar, mostrarRecetas, obtenerRecetas } from './helpers.js';

$(document).ready(function() { // esta línea asegura que el código dentro de la función se ejecute una vez que el documento HTML haya terminado de cargarse completamente
    
    
    obtenerRecetas((error, data) => {
        if (error) {
            console.error("Error al obtener las recetas:", error);
            return;
        }
        mostrarRecetas(data);
        configurarBotonEditar(); 
        

    });

    
    // Llamada AJAX para obtener las recetas
    /*$.ajax({
       url: '/Recetario/controllers/ctr_receta.php?action=obtenerRecetas',// El archivo PHP del controlador
        method: 'GET', //  aqui defino el método HTTP que se utilizará para la solicitud
        dataType: 'json', // aqui indico el tipo de datos que se espera recibir del servidor
        success: function(data) {
            mostrarRecetas(data);
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener las recetas:", error);
        }
    });*/


    /*function mostrarRecetas(recetas) {
        const contenedor = $('#contenedor-recetas');
        contenedor.empty();
        recetas.forEach(receta => {
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
        $('.tres-puntos').on('click', function() {
            $(this).next('.menu-opciones').toggle();
        });

        // Inicializa las recetas que se encuentran en favoritos 
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

    }*/

});

