$(document).ready(function () {
  // esta línea asegura que el código dentro de la función se ejecute una vez que el documento HTML haya terminado de cargarse completamente
  // Llamada AJAX para obtener las recetas
  $.ajax({
    url: '/Recetario/controllers/ctr_receta.php?action=obtenerRecetas', // El archivo PHP del controlador
    method: 'GET', //  aqui defino el método HTTP que se utilizará para la solicitud
    dataType: 'json', // aqui indico el tipo de datos que se espera recibir del servidor
    success: function (data) {
      mostrarRecetas(data);
      configurarBotonEditar();
    },
    error: function (xhr, status, error) {
      console.error('Error al obtener las recetas:', error);
    },
  });

  function mostrarRecetas(recetas) {
    const contenedor = $('#contenedor-recetas');
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
          $(`.bi.bi-heart-fill[data-id="${recetaIdSeleccionada}"]`).removeClass(
            'text-danger'
          ); // Cambiar a gris
        }
      });
    });
  }
  window.mostrarRecetas = mostrarRecetas;

  function inicializarFavoritos() {
    $.ajax({
      url: '/Recetario/controllers/ctr_receta.php?action=obtenerFavoritos',
      method: 'GET',
      success: function (response) {
        if (typeof response === 'string') {
          response = JSON.parse(response);
        }
        const favoritos = response.favoritos || [];
        if (favoritos.length === 0) {
          console.warn('No hay favoritos para este usuario.');
          return;
        }
        favoritos.forEach((id_receta) => {
          $('#contenedor-recetas')
            .find(`.bi.bi-heart-fill[data-id="${id_receta}"]`)
            .addClass('text-danger');
        });
      },
      error: function (xhr, status, error) {
        console.error('Error al inicializar favoritos:', error);
      },
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
        console.error('Error al alternar favoritos:', error);
        callback(false);
      },
    });
  }

  function eliminarReceta(idReceta) {
    $.ajax({
      url: '/Recetario/controllers/ctr_receta.php?action=eliminarReceta',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id_receta: idReceta }),
      success: function (response) {
        if (typeof response === 'string') {
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
        console.error('Error al eliminar la receta:', error);
      },
    });
  }

  function configurarBotonEditar() {
    $('#contenedor-recetas').on('click', '.editar', function () {
      const recetaId = $(this).data('id'); // Obtén el ID de la receta
      console.log(`Botón Editar presionado para la receta con ID: ${recetaId}`);
      estadoReceta.setEditing(true, recetaId); // Guardar el ID en el estado global
      recuperarRecetaInfo(recetaId);
    });
  }

  window.estadoReceta = {
  isEditing: false,
  recetaId: null,
  setEditing(isEdit, id = null) {
    this.isEditing = isEdit;
    this.recetaId = id;
  },
  getEditing() {
    return this.isEditing;
  },
  getRecetaId() {
    return this.recetaId;
  },
};

// Acceder globalmente
console.log(window.estadoReceta.getEditing());


  function recuperarRecetaInfo(recetaId) {
    console.log(recetaId); 
    //console.log('Estoy dentro de editarRecetas.js con id'.recetaId);

    $.ajax({
      url: '../Recetario/controllers/ctr_receta.php?action=obtenerReceta',
      type: 'POST',
      data: { id_receta: recetaId },
      dataType: 'json',
      success: function (response) {
        if (response.success) {
          const receta = response.receta;

          $('#titulo').val(receta.titulo);
          $('#instrucciones').val(receta.instrucciones);
          $('#tiempo').val(receta.tiempo_preparacion);

          // Limpiar el contenedor de la imagen y el párrafo de la ruta antes de agregar nuevos elementos
          $('#contenedor_img').empty();

          // Mostrar el nombre de la imagen si existe y agregar el párrafo y el botón
          if (receta.imagen_url) {
            $('#contenedor_img').append(
              `<p id="ruta-imagen">Imagen seleccionada: ${receta.imagen_url}</p>`
            );

            // Crear y agregar el botón para cambiar la imagen
            const botonCambiarImagen = `
            <div class="col">
              <button type="button" id="btn_cambiarImg" class="btn btn-link">Cambiar imagen</button>
            </div>
          `;
            $('#contenedor_img').append(botonCambiarImagen);

            console.log($('#imagen').length); // Verifica si el elemento existe

            // Mostrar el input de imagen solo si se hace clic en el botón
            $('#btn_cambiarImg').click(function () {
              $('#img_titulo').show();
              //$('#imagen').show(); // Mostrar el input de imagen
              document.getElementById('imagen').disabled = false;
              $('#ruta-imagen').hide(); // Ocultar el párrafo con la ruta de la imagen
              $(this).hide(); // Ocultar el botón después de hacer clic
            });

            // Ocultar el input de imagen inicialmente
            $('#img_titulo').hide();
            //$('#imagen').hide();
            document.getElementById('imagen').disabled = true;
          } else {
            // Si no hay imagen, solo mostrar el input y ocultar el párrafo
            $('#imagen').show();
            $('#ruta-imagen').hide();
          }

          // Mostrar el formulario/modal de edición
          document.getElementById('contenedor_form_agregar').style.display =
            'flex';
          document.getElementById('insertar_receta').textContent =
            'Guardar cambios';
          document.querySelector('h2').textContent = 'Editar receta';
          $('.menu-opciones').hide();

          cargarIngredientes(recetaId);
        } else {
          alert(response.message);
        }
      },
      error: function () {
        alert('Error al recuperar los datos de la receta.');
      },
    });
  }

  function cargarIngredientes(id_receta) {
  console.log('Estoy dentro de cargarIngredientes');
  
  $.ajax({
    url: `../Recetario/controllers/ctr_ingrediente.php?action=obtenerIngredientes&id_receta=${id_receta}`,
    type: 'GET',
    dataType: 'json',
    success: function (ingredientes) {
      console.log('Respuesta del servidor:', ingredientes);

      // Verifica si la respuesta es un array
      if (Array.isArray(ingredientes)) {
        const container = document.getElementById('ingredientes-container');
        container.innerHTML = ''; // Limpiar el contenedor antes de cargar los ingredientes

        // Lista de opciones posibles para el select
        const opcionesUnidad = [
          'unidad',
          'cucharada',
          'cucharadita',
          'media cucharada',
          'cuarto',
          'kilo',
          'medio',
          'lata',
          'litro',
          'paquete',
          'mililitro',
          'botella',
          'pieza',
          'piezas',
          'pizca',
          'taza',
          'unidades',
        ];

        // Iterar sobre los ingredientes y crear la estructura de cada fila
        ingredientes.forEach((ing, index) => {
          // Crear la estructura de la fila de ingrediente
          const ingredienteRow = document.createElement('div');
          ingredienteRow.classList.add('row', 'ingrediente');
          ingredienteRow.setAttribute('data-id-ingrediente', ing.id_ingrediente); // Agregar el ID como un atributo

          // Crear la primera columna (input para ingrediente)
          const colIngrediente = document.createElement('div');
          colIngrediente.classList.add('col');
          colIngrediente.innerHTML = `<input type="text" class="form-control" name="ingrediente" value="${ing.ingrediente}" placeholder="Ingrediente" pattern="[A-Za-zÀ-ÿ\s]+" title="Solo se permiten letras" required>`;

          // Crear la segunda columna (input para cantidad)
          const colCantidad = document.createElement('div');
          colCantidad.classList.add('col');
          colCantidad.innerHTML = `<input type="number" class="form-control" name="cantidad" value="${ing.cantidad}" placeholder="Cantidad" pattern="\\d+" title="Solo se permiten números" required>`;

          // Crear la tercera columna (select para unidad de medida)
          const colSelect = document.createElement('div');
          colSelect.classList.add('col');
          const selectMedida = document.createElement('select');
          selectMedida.classList.add('form-control');
          selectMedida.name = 'select_medida';
          selectMedida.required = true;

          // Agregar las opciones al select y marcar la opción correspondiente
          opcionesUnidad.forEach((opcion) => {
            const option = document.createElement('option');
            option.value = opcion;
            option.textContent = opcion;
            if (ing.unidad === opcion) {
              option.selected = true;
            }
            selectMedida.appendChild(option);
          });
          colSelect.appendChild(selectMedida);

          // Crear la última columna (botón de eliminar)
          const colBoton = document.createElement('div');
          colBoton.classList.add('col-auto');
          const botonEliminar = document.createElement('button');
          botonEliminar.type = 'button';
          botonEliminar.classList.add('btn', 'btn-danger', 'eliminar-ingrediente');
          botonEliminar.innerHTML = '<i class="bi bi-x"></i>';

          // Desactivar el botón solo si es el primer ingrediente
          if (index === 0) {
            botonEliminar.disabled = true;
          }

          // Asignar el evento de eliminación al botón
          botonEliminar.addEventListener('click', function () {
            const idIngrediente = ingredienteRow.getAttribute('data-id-ingrediente');
            console.log('Eliminar ingrediente con ID:', idIngrediente);
            // Eliminar la fila del contenedor
            container.removeChild(ingredienteRow);
          });

          colBoton.appendChild(botonEliminar);

          // Agregar las columnas a la fila
          ingredienteRow.appendChild(colIngrediente);
          ingredienteRow.appendChild(colCantidad);
          ingredienteRow.appendChild(colSelect);
          ingredienteRow.appendChild(colBoton);

          // Agregar la fila al contenedor
          container.appendChild(ingredienteRow);
        });
      } else {
        console.error('La respuesta no es un array:', ingredientes);
      }
    },
    error: function (xhr, status, error) {
      console.error('Error al cargar ingredientes:', status, error);
    },
  });
}
});
