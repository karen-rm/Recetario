$(document).ready(function () {
  const modal = document.getElementById('contenedor_form_agregar');

  // Alternar visibilidad del formulario de agregar receta
  $('#btn_agregar').on('click', function () {
    console.log('Botón presionado');
    document.getElementById('contenedor_form_agregar').style.display = 'flex';
    document.getElementById('btn_agregar').style.display = 'none';
  });
  // Ocultar el formulario al hacer clic en el "tache" (cerrar)
  $('.cerrar-btn').on('click', function () {
    document.getElementById('contenedor_form_agregar').style.display = 'none';
    document.getElementById('btn_agregar').style.display = 'flex';
  });

  // Cerrar el modal al hacer clic fuera de él (en el área borrosa)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none'; // Ocultar el modal
      document.getElementById('btn_agregar').style.display = 'flex';
    }
  });

  // Función para añadir un ingrediente
  document
    .getElementById('btn_agregarIngrediente')
    .addEventListener('click', function () {
      const container = document.getElementById('ingredientes-container');

      // Crear un nuevo campo de ingrediente
      const newIngrediente = document.createElement('div');
      newIngrediente.classList.add('row', 'ingrediente');

      newIngrediente.innerHTML = `
       
              <div class="col">
              <p></p>
                <input type="text" class="form-control" name="ingrediente" placeholder="Ingrediente" pattern="[A-Za-zÀ-ÿ\s]+" title="Solo se permiten letras" required>
              </div>
              <div class="col">
                <p></p>
                <input type="number" class="form-control" name="cantidad" placeholder="Cantidad" pattern="\d+" title="Solo se permiten números" required>
              </div>
              <div class="col">
              <p></p>
                <select class="form-control" name="select_medida" required>
                  <option value="valor1" selected> unidad </option>
                  <option value="valor16"> cucharada </option>
                  <option value="valor2"> cucharadita </option>
                  <option value="valor3"> cuarto de cucharadita </option>
                  <option value="valor4"> cuarto </option>
                  <option value="valor5"> gramo </option>
                  <option value="valor6"> galón </option>
                  <option value="valor7"> libra </option>
                  <option value="valor8"> litro </option>
                  <option value="valor9"> miligramo </option>
                  <option value="valor10"> mililitro </option>
                  <option value="valor11"> onza </option>
                  <option value="valor12"> pieza </option>
                  <option value="valor13"> piezas </option>
                  <option value="valor14"> pizca </option>
                  <option value="valor15"> taza </option>
                  <option value="valor17"> unidades </option>
                </select>
              </div>
              <div class="col-auto">
                <p></p>
                <button type="button"  class="btn btn-danger eliminar-ingrediente"><i class="bi bi-x"></i></button>
              </div>
            </div>`;

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

    function enviarImagen(idreceta) {
      console.log('enviando img');
      // Obtener la imagen desde el input
      const inputImagen = document.getElementById('imagen');

      const imagen = inputImagen.files[0]; // Obtener el archivo seleccionado

      // Crear un objeto FormData para enviar la imagen
      const formData = new FormData();
      formData.append('imagen', imagen); // Agregar la imagen con la clave "imagen"
      formData.forEach((value, key) => {
        console.log(key, value);
      });
       formData.append('idreceta', idreceta); // Agregar el id_receta con la clave "idreceta"

      // Realizar la petición AJAX con jQuery
      $.ajax({
        url: '../Recetario/controllers/ctr_receta.php?action=agregarImagen', // Ruta donde se enviará la solicitud
        type: 'POST',
        data: formData,
        processData: false, // Evitar que jQuery procese los datos
        contentType: false, // Evitar que jQuery establezca un Content-Type incorrecto
        success: function (response) {
          console.log('Imagen subida con éxito:', response);
          alert('Imagen subida correctamente.');
        },
        error: function (xhr, status, error) {
          console.error('Error en la solicitud AJAX: ', status, error);
          console.log('Respuesta del servidor: ', xhr.responseText); // Añadir esta línea para depurar
          alert(
            'Error en la solicitud AJAX. Por favor, revise la consola para más detalles.'
          );
        },
      });
    }

    // Función para obtener los ingredientes
    function obtenerIngredientes() {
      const ingredientes = []; // Arreglo para almacenar los ingredientes

      // Seleccionamos todos los contenedores de ingredientes
      const ingredientesRows = document.querySelectorAll(
        '#ingredientes-container .ingrediente'
      );

      // Recorremos cada fila de ingredientes
      ingredientesRows.forEach((row) => {
        const ingrediente = row
          .querySelector('[name="ingrediente"]')
          .value.trim();
        const cantidad = row.querySelector('[name="cantidad"]').value.trim();
        const medida = row.querySelector('[name="select_medida"]');
        const medidaTexto = medida.selectedOptions[0].text.trim(); // Obtenemos el texto visible

        // Validamos si los campos tienen datos antes de agregar
        if (ingrediente && cantidad && medidaTexto) {
          ingredientes.push({ ingrediente, cantidad, medida: medidaTexto });
        }
      });

      console.log('Ingredientes:', ingredientes);

      // Aquí puedes enviar los datos a tu servidor o procesarlos como necesites
    }

    // Crear un objeto con los datos
    const postData = {
      titulo: $('#titulo').val(),
      instrucciones: $('#instrucciones').val(),
      tiempo: $('#tiempo').val(),
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

          // Recupera el id_receta de la respuesta y guardarlo en una variable
          var idReceta = response.id_receta; // Aquí tienes el id de la receta

          console.log('ID de la receta:', idReceta); // Esto es solo para depuración

          // Ahora puedes utilizar el idReceta para otras funciones
          enviarImagen(idReceta); // Pasa el idReceta a la función enviarImagen
          obtenerIngredientes();

          // Limpiar el formulario
        $('#formReceta')[0].reset();  // Limpiar el formulario usando jQuery

         document.getElementById('contenedor_form_agregar').style.display = 'none';
        document.getElementById('btn_agregar').style.display = 'flex';

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
});
