$(document).ready(function() { 
    const Favoritos = {
        agregarFavorito: function (idReceta) {
            $.ajax({
                url: '/Recetario/controllers/ctr_receta.php?action=agregarFavorito',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ id_receta: idReceta }),
                success: function (response) {
                    console.log("El response es:" ,response);
                    
                    if (response.success) {
                        console.log('Receta agregada a favoritos.');
                    } else {
                        console.error(response.message || 'Error al agregar a favoritos 1.');
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error al agregar a favoritos 2:", error);
                }
            });
        },

        verificarEstadoFavorito: function (idReceta, callback) {
            $.ajax({
                url: '/Recetario/controllers/ctr_receta.php?action=verificarFavorito',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ id_receta: idReceta }),
                success: function (response) {
                    callback(response.enFavoritos); // true si está en favoritos
                },
                error: function (xhr, status, error) {
                    console.error('Error al verificar favoritos:', error);
                }
            });
        },
    
        toggleFavorito: function (idReceta, callback) {
            // Alterna entre agregar o quitar una receta de favoritos
            $.ajax({
                url: '/Recetario/controllers/ctr_receta.php?action=toggleFavorito',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ id_receta: idReceta }),
                success: function (response) {
                    callback(response); // Llama al callback con la respuesta
                },
                error: function (xhr, status, error) {
                    console.error('Error al alternar favoritos:', error);
                }
            });
        }
    };
});
