$(document).ready(function () {
 
  loadPageWithStyles('./view/inicio.php', './css/home.css');
  
  loadNavbar();

  $(document).on('click', '.nav-item a', function (event) {
    event.preventDefault();
    var opcion = $(this).data('opcion'); // Usar data-opcion para identificar la opción
    cargarContenido(opcion);
  });
  
});

function loadNavbar() {
  // Verificar si el usuario está autenticado
  console.log("entra");
  
  // Cargar el navbar de inicio de sesión y registro
  $('#navbar-container').load('./components/navbar.php', function () {
    // Cargar los estilos para el navbar de visitante (no autenticado)
    var link = $('<link/>', {
      rel: 'stylesheet',
      type: 'text/css',
      href: './css/navbar.css',
    }).appendTo('head');
  });
   
}



// Función para cargar la página y sus estilos
function loadPageWithStyles(url, cssFilePath) {
  $('#main-container').load(url, function () {
    // Verificar si la hoja de estilo ya existe
    if (!$("link[href='" + cssFilePath + "']").length) {
      $('<link>')
        .attr('rel', 'stylesheet')
        .attr('type', 'text/css')
        .attr('href', cssFilePath)
        .appendTo('head');
    }
  });
}

function cargarContenido(opcion) {
  $.ajax({
    url: './controllers/contenido.php',
    type: 'GET',
    data: { opcion: opcion },
    success: function (data) {
      // Cargar el contenido en el contenedor principal
      $('#main-container').html(data);

      // Eliminar cualquier hoja de estilo previamente cargada (si es necesario)
      $('#dynamic-style').remove();

      // Agregar la hoja de estilos correspondiente de forma dinámica
      var styleSheet = '';
      if (opcion === 'login') {
        styleSheet = './css/loginStyles.css'; // Ruta de la hoja de estilos para login
      } else if (opcion === 'register') {
        styleSheet = './css/registroStyles.css'; // Ruta de la hoja de estilos para registro
      } else if (opcion === 'home') {
        styleSheet = './css/home.css'; // Ruta de la hoja de estilos para home
      } else if (opcion === 'inicio') {
        styleSheet = './css/index.css'; // Ruta de la hoja de estilos para home
      } else if (opcion === 'mis-recetas') {
        styleSheet = './css/Mis_recetas.css'; // Ruta de la hoja de estilos para home
      }  else if (opcion === 'favoritos') {
        styleSheet = './css/favoritos.css'; // Ruta de la hoja de estilos para home
      }

      console.log('Cargando CSS:', styleSheet);
      

      if (styleSheet) {
        // Crear un nuevo elemento <link> para la hoja de estilos
        var link = $('<link>', {
          rel: 'stylesheet',
          type: 'text/css',
          href: styleSheet,
          id: 'dynamic-style', // Agregar un id único para eliminarla más tarde si es necesario
        });
        // Agregar la hoja de estilos al <head>
        $('head').append(link);
      }
    },
    error: function (xhr, status, error) {
      console.error('Error:', status, error);
    },
  });
}




