$(document).ready(function(){
// Alternar visibilidad del formulario de agregar receta
  $('#btn_agregar_receta').on('click', function () {
    console.log('Botón presionado');
    $('#contenedor_form_agregar').toggleClass('hidden');
  });
  // Ocultar el formulario al hacer clic en el "tache" (cerrar)
  $('.cerrar-btn').on('click', function () {
    $('#contenedor_form_agregar').addClass('hidden');
  });

  // Función para añadir un ingrediente
  document
    .getElementById('agregarIngrediente')
    .addEventListener('click', function () {
      const container = document.getElementById('ingredientes-container');

      // Crear un nuevo campo de ingrediente
      const newIngrediente = document.createElement('div');
      newIngrediente.classList.add('row', 'ingrediente');

      newIngrediente.innerHTML = `
        <div class="col">
          <p></p>
          <input type="text" class="form-control"  name="ingrediente" placeholder="Ingrediente" required>
        </div>
        <div class="col">
        <p></p>
          <input type="number" class="form-control" name="cantidad" placeholder="Cantidad" required>
        </div>
        <div class="col-auto">
        <p></p>
          <button type="button" class="btn btn-danger eliminar-ingrediente">
            <i class="bi bi-x"></i>
          </button>
        </div>
      `;

      // Agregar el nuevo ingrediente al contenedor
      container.appendChild(newIngrediente);

      // Asignar el evento de eliminación al nuevo botón
      agregarEventoEliminar(
        newIngrediente.querySelector('.eliminar-ingrediente')
      );
    });

  // Función para asignar evento de eliminación a un botón
  function agregarEventoEliminar(button) {
    button.addEventListener('click', function () {
      button.closest('.ingrediente').remove();
    });
  }

  // Asignar el evento de eliminación al botón existente inicialmente
  document.querySelectorAll('.eliminar-ingrediente').forEach((button) => {
    agregarEventoEliminar(button);
  });
  //Función para enviar los datos al ctrlReceta para agegar receta con sus ingredientes
  $('#formReceta').on('submit', function (event) {
    event.preventDefault();
    //console.log('Obteniendo datos ... ');

        // Función para obtener solo el nombre del archivo seleccionado
    function obtenerNombreImagen(input) {
        if (input.files && input.files[0]) {
            return input.files[0].name; // Obtiene solo el nombre del archivo
        }
        return '';
    }

    // Crear un objeto con los datos
    const postData = {
      titulo: $('#titulo').val(),
      instrucciones: $('#instrucciones').val(),
      tiempo: $('#tiempo').val(),
      imagen: obtenerNombreImagen(document.getElementById('imagen')) // Llama a la función con el elemento de entrada
    };

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(postData);
    //console.log('Datos enviados en JSON:', jsonData);


    $.ajax({
      url: '../Recetario/controllers/ctr_receta.php?action=agregarReceta',
      type: 'POST',
      data: jsonData,
      contentType: 'application/json', // Importante para enviar el FormData correctamente

      dataType: 'json',
      success: function (response) {
        // Manejar la respuesta del servidor
        if (response.success) {
          alert(response.message); // Mostrar mensaje de éxito
          //cargarContenido('Grupos');
          // Aquí podrías redirigir a otra página si es necesario
        } else {
          alert(response.message); // Mostrar mensaje de error
        }
      },
      error: function (xhr, status, error) {
        console.error('Error en la solicitud AJAX: ', status, error);
        console.log('Respuesta del servidor: ', xhr.responseText); // Añadir esta línea para depurar
        alert(
          'Error en la solicitud AJAX. Por favor, revise la consola para más detalles.'
        );
      },
    });
  });




})