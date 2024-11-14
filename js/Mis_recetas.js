$(document).ready(function () {
  // esta línea asegura que el código dentro de la función se ejecute una vez que el documento HTML haya terminado de cargarse completamente
  // Llamada AJAX para obtener las recetas
  /*$.ajax({
      url: '../Recetario/controllers/ctr_receta.php', // El archivo PHP del controlador
      method: 'GET', //  aqui defino el método HTTP que se utilizará para la solicitud
      dataType: 'json', // aqui indico el tipo de datos que se espera recibir del servidor
      success: function (data) {
        mostrarRecetas(data);
      },
      error: function (xhr, status, error) {
        console.error('Error al obtener las recetas:', error);
      },
    });

    function mostrarRecetas(recetas) {
      const contenedor = $('#contenedor-recetas');
      contenedor.empty(); // Limpiar el contenedor

      recetas.forEach((receta) => {
        const tarjeta = `
                  <div class="tarjeta">
                      <img src="img_u/${receta.imagen_url}" alt="${receta.titulo}">
                      <h3>${receta.titulo}</h3>
                      <div class="opciones">
                          <span class="tres-puntos">...</span>
                          <div class="menu-opciones">
                              <button class="editar">Editar</button>
                              <button class="eliminar">Eliminar</button>
                              <button class="publicar">Publicar</button>
                          </div>
                      </div>
                  </div>
              `;
        contenedor.append(tarjeta);
      });

      // Función para mostrar/ocultar menú de opciones
      $('.tres-puntos').on('click', function () {
        $(this).next('.menu-opciones').toggle();
      });
    }*/

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

  $('#formReceta').on('submit', function (event) {
    event.preventDefault();
    console.log('Obteniendo datos ... ');

    // Crear el objeto con los datos del formulario
    const postData = {
      titulo: $('#titulo').val(),
      instrucciones: $('#instrucciones').val(),
      tiempo: $('#tiempo').val(),
    };

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(postData);
    console.log('Datos enviados en JSON:', jsonData);

    // Enviar los datos del formulario al servidor
    $.ajax({
      url: '../Recetario/controllers/ctr_receta.php?action=agregarReceta',
      type: 'POST',
      data: jsonData,
      contentType: 'application/json', // Especifica el tipo de contenido
      dataType: 'json',
      success: function (response) {
        // Manejar la respuesta del servidor
        if (response.success) {
          alert(response.message); // Mostrar mensaje de éxito

          // Si la respuesta es exitosa, proceder con la carga de la imagen
          //cargarImagen(response.id_receta);

          //Si la respuesta es exitosa, proceder con la carga de los ingredientes

          //refrescar el contenido
        } else {
          alert(response.message); // Mostrar mensaje de error
        }
      },
      error: function (xhr, status, error) {
        console.error('Error en la solicitud AJAX: ', status, error);
        alert(
          'Error en la solicitud AJAX. Por favor, revise la consola para más detalles.'
        );
      },
    });
  });

  /*// Función para cargar la imagen
  function cargarImagen(idReceta) {
    const formData = new FormData();
    formData.append('imagen', $('#imagen')[0].files[0]);
    formData.append('id_receta', idReceta); // Agregar el id_receta para asociar la imagen con la receta

    $.ajax({
      url: '../Recetario/controllers/ctr_receta.php?action=cargarImagen',
      type: 'POST',
      data: formData,
      processData: false, // Evita que jQuery procese los datos
      contentType: false, // No enviar el contentType
      dataType: 'json',
      success: function (response) {
        // Manejar la respuesta de la carga de la imagen
        if (response.success) {
          alert(response.message); // Mostrar mensaje de éxito
        } else {
          alert(response.message); // Mostrar mensaje de error
        }
      },
      error: function (xhr, status, error) {
        console.error('Error en la solicitud AJAX de imagen: ', status, error);
        alert('Error en la carga de la imagen. Revisa la consola.');
      },
    });
  }*/

  //Función para enviar los datos al ctrlReceta para agegar receta con sus ingredientes
  /*$('#formReceta').on('submit', function (event) {
    event.preventDefault();
    console.log('Obteniendo datos ... ');

    // Obtener los datos del formulario con un objeto FromData para tambien recuprar la img

    // Crear un objeto con los datos
    const postData = {
      titulo: $('#titulo').val(),
      instrucciones: $('#instrucciones').val(),
      tiempo: $('#tiempo').val(),
    };

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(postData);
    console.log('Datos enviados en JSON:', jsonData);

    //crear un objeto con la imagen
    const formData = new FormData();
    formData.append('imagen', $('#imagen')[0].files[0]);

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

    $.ajax({
      url: '../Recetario/controllers/ctr_receta.php?action=agregarReceta',
      type: 'POST',
      data: formData,
      processData: false, // Evita que jQuery procese los datos
      contentType: false, // Evita que jQuery establezca el tipo de contenido
      dataType: 'json',
      success: function (response) {
        // Manejar la respuesta del servidor
        if (response.success) {
          alert(response.message); // Mostrar mensaje de éxito
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
  });*/
});
