$(document).ready(function () {
    console.log("El archivo login.js se ha cargado correctamente");
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
        console.log("El envío del formulario ha sido interceptado");

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

                    // Actualizar contenido dinámicamente
                    $.ajax({
                        url: "content.php",
                        method: "GET",
                        data: { page: "Iniciosesion" },
                        success: function (response) {
                            $("#main-content").fadeOut(200, function () {
                                $(this).html(response).fadeIn(200);
                            });
                        },
                        error: function () {
                            showError("Error al cargar la página de inicio de sesión.");
                        },
                    });
                } else {
                    // Mostrar mensaje de error devuelto por el servidor
                    showError(data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                showError("Hubo un error al procesar la solicitud.");
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

    // Asociar manejador de envío al formulario
    $("#loginForm").submit(handleFormSubmit);

    // Manejo de validación en tiempo real para los inputs
    $(".form-control").on("input", validateInput);
});
