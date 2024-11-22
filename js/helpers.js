export function obtenerRecetas(callback) {
    $.ajax({
        url: '/Recetario/controllers/ctr_receta.php?action=obtenerRecetas',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            callback(null, data);
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener las recetas:", error);
            callback(error, null);
        }
    });
}

export function mostrarRecetas(recetas) {
    const contenedor = $('#contenedor-recetas');
    contenedor.empty(); // Limpiar el contenedor

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
