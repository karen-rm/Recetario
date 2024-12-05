$(document).ready(function () {
 
  loadPageWithStyles('./view/inicio.php', './css/home.css');
  
  loadNavbar();

 $(document).on('click', '.nav-item a', function (event) {
    event.preventDefault();
    var opcion = $(this).data('opcion'); // Usar data-opcion para identificar la opción
    cargarContenido(opcion);
  });
  
});

async function loadNavbar() {
  // Verificar si el usuario está autenticado
  // console.log("entra");
  
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
async function loadPageWithStyles(url, cssFilePath) {
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
async function inicializarMisRecetas() {
  // Llama al backend para obtener las recetas
  $.ajax({
    url: '/Recetario/controllers/ctr_receta.php?action=obtenerRecetas',
    method: 'GET',
    dataType: 'json',
    success: function (recetas) {
      mostrarRecetas(recetas); // Renderiza las recetas obtenidas
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener las recetas:", error);
    },
  });
}
async function cargarContenido(opcion) {
  $.ajax({
    url: './controllers/contenido.php',
    type: 'GET',
    data: { opcion: opcion },
    success: function (data) {
      $('#main-container').html(data);

      // Eliminar cualquier hoja de estilo previamente cargada
      $('link[data-dynamic-style]').remove();

      // Lista de hojas de estilo a cargar
      let stylesheets = []; // Inicializa un array vacío

      // Selección de estilos según la opción
      if (opcion === 'login') {
        stylesheets = ['./css/loginStyles.css'];
      } else if (opcion === 'register') {
        stylesheets = ['./css/registroStyles.css'];
      } else if (opcion === 'home') {
        stylesheets = ['./css/home.css'];
      } else if (opcion === 'inicio') {
        stylesheets = ['./css/index.css'];
      } else if (opcion === 'mis-recetas') {
        // Aquí carga múltiples estilos
        stylesheets = ['./css/Mis_recetas.css', './css/form_agregar_receta.css'];
      } else if (opcion === 'favoritos') {
        stylesheets = ['./css/favoritos.css'];
      }

      // console.log('Cargando CSS:', stylesheets);

      // Agregar cada hoja de estilo al head
      stylesheets.forEach(function (styleSheet) {
        $('<link>', {
          rel: 'stylesheet',
          type: 'text/css',
          href: styleSheet,
          'data-dynamic-style': true // Atributo para identificar estilos dinámicos
        }).appendTo('head');
      });
      if (opcion === 'mis-recetas') {
        inicializarMisRecetas();
        $.getScript('./js/agregarReceta.js', function () {
          inicializarAgregarReceta();
        });
      }else if (opcion === 'inicio') {
        cargarRecetasPublicasSesion();
      }
    },
    error: function (xhr, status, error) {
      console.error('Error:', status, error);
    },
  });
}





