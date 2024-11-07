$(document).ready(function() {
    // Capturar el evento submit del formulario
    $('#registroForm').submit(function(event) {
        // Evitar que el formulario se envíe de forma tradicional (recargando la página)
        event.preventDefault();
        
        // Obtener los datos del formulario
        var nombre = $('#nombre').val();
        var apellidoPaterno = $('#apellido_paterno').val();
        var apellidoMaterno = $('#apellido_materno').val();
        var correo = $('#correo').val();
        var telefono = $('#telefono').val();
        var usuario = $('#usuario').val();
        var contrasena = $('#contraseña').val();
        
        // Validar los datos
        if (nombre === "" || apellidoPaterno === "" || apellidoMaterno === "" || correo === "" || telefono === "" || usuario === "" || contrasena === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        
        // Crear un objeto con los datos para enviar por AJAX
        var datos = {
            nombre: nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            correo: correo,
            telefono: telefono,
            usuario: usuario,
            contraseña: contrasena
        };
        
        // Enviar los datos usando AJAX
        $.ajax({
            url: '../controllers/resgistroController.php',  // Ruta a tu archivo PHP que procesará el registro
            type: 'POST',
            data: datos,
            success: function(response) {
                // Mostrar un mensaje según la respuesta
                if (response === "success") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'Su registro se completó exitosamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        window.location.href = "../index.php";  // Redirigir a login
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al registrarte. Inténtalo nuevamente.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            error: function(xhr, status, error) {
                // Manejo de errores si la solicitud AJAX falla
                console.error("Error en la solicitud AJAX: ", status, error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de red',
                    text: 'Error al enviar los datos. Inténtalo nuevamente.',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });
});
