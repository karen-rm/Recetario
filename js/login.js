$(document).ready(function () {
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
  
      const correo = $("#correo");
      const contraseña = $("#contraseña");
  
      // Verificar si los campos están vacíos
      if (isFieldEmpty(correo) || isFieldEmpty(contraseña)) {
        showError("Por favor, complete todos los campos");
        return;
      }
  
      // Crear el objeto FormData con los datos
      const formData = new FormData(event.target);
      formData.append("accion", "login");
  
      // Realizar la solicitud AJAX al controlador
      fetch("controllers/autenticarCtrl.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          if (data.trim() === "success") {
            // Cambiar la URL sin recargar la página para pasar el valor a $page
            window.history.pushState({}, "", "index.php?page=Iniciosesion");
            location.reload();
          } else {
            // Mostrar mensaje de error genérico
            showError(data);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  
    // Función para validar inputs de formulario
    function validateInput(event) {
      const input = $(event.target);
      const mensajeId = input.attr("id") === "correo" ? "#mensaje-correo" : "#mensaje-contraseña";
  
      if (isFieldEmpty(input)) {
        input.removeClass("is-valid").addClass("is-invalid");
        $(mensajeId).text("Este campo es obligatorio.");  // Mensaje de error cuando el campo está vacío
      } else {
        input.removeClass("is-invalid").addClass("is-valid");
        $(mensajeId).text(""); // Limpiar el mensaje si el campo es válido
      }
    }
  
    // Manejo formulario de registro
    $("#loginForm").submit(handleFormSubmit);
  
    // Manejo de inputs de formulario
    $(".form-control").on("input", validateInput);
  });
  