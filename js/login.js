$(document).ready(function () {

  console.log("jQuery cargado");
    // Función para mostrar mensajes de error
    function showError(message) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: message,
            confirmButtonText: "Aceptar",
        });
    }

    // Función para verificar si un campo está vacío
    function isFieldEmpty(field) {
        return !field.val().trim();
    }
    

    // Función para manejar el envío del formulario
    function handleFormSubmit(event) {
        event.preventDefault(); // Previene el envío del formulario por defecto
        console.log("Formulario enviado"); // Verifica que la función se ejecuta

        const correo = $("#correo");
        const contraseña = $("#contraseña");

        // Verificar si los campos están vacíos
        if (isFieldEmpty(correo) || isFieldEmpty(contraseña)) {
            console.log("Campos vacíos detectados"); // Indica si hay campos vacíos
            showError("Por favor, complete todos los campos");
            return;
        }

        // Crear el objeto FormData con los datos
        const formData = new FormData(event.target);
        formData.append("accion", "login");

        console.log("Datos enviados:", Array.from(formData.entries())); // Verifica los datos en formData

        // Realizar la solicitud AJAX al controlador
        fetch("./controllers/autenticarCtrl.php", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.text())
        .then((data) => {
            console.log("Respuesta del servidor:", data); // Verifica la respuesta del servidor
            if (data.trim() === "success") {
                loadNavbar();
          // Una vez cargado el navbar, redirigir a la página principal
          // window.location.href = "./view/home.php";
          $('#main-container').load('./view/home.php');
        
            } else {
                // Mostrar mensaje de error genérico
                showError(data); // Muestra el mensaje de error recibido del servidor
            }
        })
        .catch((error) => {
            console.error("Error en la solicitud fetch:", error);
        });
    }

    // Función para validar inputs de formulario
    function validateInput(event) {
        const input = $(event.target);
        const mensajeId = input.attr("id") === "correo" ? "#mensaje-correo" : "#mensaje-contraseña";

        if (isFieldEmpty(input)) {
            input.removeClass("is-valid").addClass("is-invalid");
            $(mensajeId).text("Este campo es obligatorio.");
        } else {
            input.removeClass("is-invalid").addClass("is-valid");
            $(mensajeId).text("");
        }
    }

     function loadNavbar() {
      console.log("Navbar cargado correctamente.");

    // Cargar el navbar de usuario autenticado
    $('#navbar-container').load('./components/navbar-loggedin.php', function() {
      // Cargar los estilos para el navbar de usuario autenticado
      var link = $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: './css/navbar-loggedin.css',
      }).appendTo('head');

   
     
    });
  }

  
    // Manejo formulario de inicio de sesión usando delegación de eventos
    $(document).on("submit", "#loginForm", handleFormSubmit);

    // Manejo de inputs de formulario de forma dinámica
    $(document).on("input", ".form-control", validateInput);


});
