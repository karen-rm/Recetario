  $(document).ready(function () {
    // esta línea asegura que el código dentro de la función se ejecute una vez que el documento HTML haya terminado de cargarse completamente
    // Llamada AJAX para obtener las recetas
    $.ajax({
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
    }

    // Alternar visibilidad del formulario de agregar receta
    $('#btn_agregar_receta').on('click', function () {
      console.log("Botón presionado"); 
      $('#contenedor_form_agregar').toggleClass('hidden');
    });
    // Ocultar el formulario al hacer clic en el "tache" (cerrar)
    $('.cerrar-btn').on('click', function () {
      $('#contenedor_form_agregar').addClass('hidden');
    });

    // Función para añadir un ingrediente
    document.getElementById("agregarIngrediente").addEventListener("click", function() {
      const container = document.getElementById("ingredientes-container");
      
      // Crear un nuevo campo de ingrediente
      const newIngrediente = document.createElement("div");
      newIngrediente.classList.add("row", "ingrediente");
      
      newIngrediente.innerHTML = `
        <div class="col">
          <p></p>
          <input type="text" class="form-control" name="ingrediente" placeholder="Ingrediente" required>
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
      agregarEventoEliminar(newIngrediente.querySelector(".eliminar-ingrediente"));
    });

    // Función para asignar evento de eliminación a un botón
    function agregarEventoEliminar(button) {
      button.addEventListener("click", function() {
        button.closest(".ingrediente").remove();
      });
    }

    // Asignar el evento de eliminación al botón existente inicialmente
    document.querySelectorAll(".eliminar-ingrediente").forEach(button => {
      agregarEventoEliminar(button);
    });

    //Función para enviar los datos al ctrlReceta para agegar receta con sus ingredientes
    $(".registro-content").on('submit', '#formReceta',function(event){
      event.preventDefault();
      console.log("Formulario enviado");
      
      // Obtener los datos del formulario con un objeto FromData para tambien recuprar la img 

      // Crear un objeto FormData 
      var formData = new FormData(this);
    
      // Acceder a cada campo en el FormData
      for (var [key, value] of formData.entries()) {
          console.log(key, value);
      }
      

    });
    
  });
