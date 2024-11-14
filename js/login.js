document.addEventListener("DOMContentLoaded", function () { 
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Previene el envío del formulario por defecto

        // Crear un objeto FormData con los datos del formulario
        const formData = new FormData(this);
        formData.append("accion", "login");

        // Realizar la solicitud AJAX al controlador
        fetch("../Recetario/controllers/Ctr_usuario.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.trim() === "success") {
                // Cambiar la URL sin recargar la página para pasar el valor a $page
                window.history.pushState({}, "", "index.php?page=Iniciosesion");
				 location.reload();
                
            } else {
                // Mostrar mensaje de error si las credenciales son incorrectas
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data
                });
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
