export function recuperarRecetaInfo(recetaId) {
  console.log('Estoy dentro de editarRecetas.js');
  $.ajax({
    url: '../Recetario/controllers/ctr_receta.php?action=obtenerReceta',
    type: 'POST',
    data: { id_receta: recetaId },
    dataType: 'json',
    success: function (response) {
      if (response.success) {
        const receta = response.receta;

        // Llenar el formulario con los datos de la receta
        $('#titulo').val(receta.titulo);
        $('#instrucciones').val(receta.instrucciones);
        $('#tiempo').val(receta.tiempo_preparacion);

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
            console.log('Eliminar ingrediente', ing);
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





/*export function actualizarRecetaInfo(){
   $('#btn_guardar').on('click', function () {
  const recetaId = $(this).data('id'); // ID de la receta a actualizar
  const jsonData = {
    id_receta: recetaId,
    titulo: $('#titulo').val(),
    instrucciones: $('#instrucciones').val(),
    tiempo_preparacion: $('#tiempo_preparacion').val(),
    estado: $('#estado').val(),
  };

  $.ajax({
    url: '../Recetario/controllers/ctr_receta.php?action=editarReceta',
    type: 'POST',
    data: JSON.stringify(jsonData),
    contentType: 'application/json',
    success: function (response) {
      if (response.success) {
        alert('Receta actualizada exitosamente.');
        // Actualizar la lista de recetas
        obtenerRecetas(); // Asume que tienes esta función
        $('#contenedor_form_agregar').hide();
        $('#btn_agregar').show();
      } else {
        alert(response.message);
      }
    },
    error: function () {
      alert('Error al actualizar la receta.');
    },
  });
});
 
}*/
