$(document).ready(function() { // esta línea asegura que el código dentro de la función se ejecute una vez que el documento HTML haya terminado de cargarse completamente
    // Llamada AJAX para obtener las recetas
    $.ajax({
         url: '/Recetario/controllers/ctr_receta.php',// El archivo PHP del controlador
        method: 'GET', //  aqui defino el método HTTP que se utilizará para la solicitud
        dataType: 'json', // aqui indico el tipo de datos que se espera recibir del servidor
        success: function(data) {
            mostrarRecetas(data);
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener las recetas:", error);
        }
    });

    function mostrarRecetas(recetas) {
        const contenedor = $('#contenedor-recetas');
        contenedor.empty();  // Limpiar el contenedor

        recetas.forEach(receta => {
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
        $('.tres-puntos').on('click', function() {
            $(this).next('.menu-opciones').toggle();
        });
    }
});
