import { mostrarRecetas, obtenerRecetas } from './helpers.js';

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

  // Cerrar el modal al hacer clic fuera de él 
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none'; 
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
                <input type="text" class="form-control" name="ingrediente" placeholder="Ingrediente" required>
              </div>
              <div class="col">
                <p></p>
                <input type="number" class="form-control" name="cantidad" placeholder="Cantidad"  required>
              </div>
              <div class="col">
              <p></p>
                <select class="form-control" name="select_medida" required>
                  <option value="unidad" selected> unidad </option>
                  <option value="cucharada"> cucharada </option>
                  <option value="cucharadita"> cucharadita </option>
                  <option value="media cucharada"> media cucharada</option>
                  <option value="cuarto"> cuarto </option>
                  <option value="kilo"> kilo </option>
                  <option value="medio"> medio </option>
                  <option value="lata"> lata </option>
                  <option value="litro"> litro </option>
                  <option value="paquete"> paquete </option>
                  <option value="mililitro"> mililitro </option>
                  <option value="botella"> botella </option>
                  <option value="pieza"> pieza </option>
                  <option value="piezas"> piezas </option>
                  <option value="pizca"> pizca </option>
                  <option value="taza"> taza </option>
                  <option value="unidades"> unidades </option>
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
      //console.log('enviando img');
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

           // Actualizar la lista de recetas
            obtenerRecetas((error, recetas) => {
                if (error) {
                    console.error("Error al actualizar recetas:", error);
                    return;
                }

                // Vuelve a mostrar las recetas actualizadas
                mostrarRecetas(recetas);

                // Opcional: Forzar la recarga de la imagen recién subida
                const recetaImagen = document.querySelector(
                    `img[src="img_u/${response.imagen_url}"]`
                );
                if (recetaImagen) {
                    recetaImagen.src = `img_u/${response.imagen_url}?t=${new Date().getTime()}`;
                }
            });

        },
        error: function (xhr, status, error) {
          console.error('Error en la solicitud AJAX: ', status, error);
          console.log('Respuesta del servidor: ', xhr.responseText); // Añadir esta línea para depurar
          alert(
            'Error en la solicitud AJAX img. Por favor, revise la consola para más detalles.'
          );
        },
      });
    }

    // Función para obtener los ingredientes
    function guardarIngredientes(id_receta) {
    const ingredientes = []; // Arreglo para almacenar los ingredientes

    // Seleccionamos todos los contenedores de ingredientes
    const ingredientesRows = document.querySelectorAll('#ingredientes-container .ingrediente');

    // Recorremos cada fila de ingredientes
    ingredientesRows.forEach((row) => {
        const ingrediente = row.querySelector('[name="ingrediente"]').value.trim();
        const cantidad = row.querySelector('[name="cantidad"]').value.trim();
        const medida = row.querySelector('[name="select_medida"]');
        const medidaValor = medida.value.trim(); // Obtenemos el valor seleccionado del select

        // Validamos si los campos tienen datos antes de agregar
        if (ingrediente && cantidad && medidaValor) {
            ingredientes.push({ ingrediente, cantidad, medidaValor });
        }
    });

    //console.log('Ingredientes:', ingredientes);

    // Crear el objeto que incluye el id_receta
    const dataToSend = {
        id_receta,  // Incluimos el id_receta
        ingredientes // Incluimos el arreglo de ingredientes
    };

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(dataToSend);
    

    // Enviar la solicitud AJAX
    $.ajax({
        url: '../Recetario/controllers/ctr_ingrediente.php?action=agregarIngrediente',
        type: 'POST',
        data: jsonData,               // Enviar los datos como JSON
        contentType: 'application/json', // Indicar que el contenido es JSON
        dataType: 'json',             // Esperar respuesta JSON
        success: function (response) {
            console.log('Respuesta del servidor:', response);
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud AJAX:', status, error);
            console.log('Respuesta del servidor:', xhr.responseText); // Depurar la respuesta
            alert('Error en la solicitud AJAX ingredientes. Por favor, revise la consola para más detalles.');
        }
    });
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

          //console.log('ID de la receta:', idReceta); // Esto es solo para depuración

          // Ahora puedes utilizar el idReceta para otras funciones
          guardarIngredientes(idReceta);
          enviarImagen(idReceta); // Pasa el idReceta a la función enviarImagen
          

          // Limpiar el formulario
          $('#formReceta')[0].reset(); // Limpiar el formulario usando jQuery

          document.getElementById('contenedor_form_agregar').style.display =
            'none';
          document.getElementById('btn_agregar').style.display = 'flex';

         /* obtenerRecetas((error, data) => {
        if (error) {
            console.error("Error al refrescar:", error);
            return;
        }
        mostrarRecetas(data);
    });*/

          // Aquí podrías redirigir a otra página si es necesario
        } else {
          alert(response.message); // Mostrar mensaje de error
        }
      },
      error: function (xhr, status, error) {
        console.error('Error en la solicitud AJAX: ', status, error);
        console.log('Respuesta del servidor: ', xhr.responseText); // Añadir esta línea para depurar
        alert(
          'Error en la solicitud AJAX en agregar receta. Por favor, revise la consola para más detalles .'
        );
      },
    });
  });
});
