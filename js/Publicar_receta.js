$(document).ready(function() {
    // Función para publicar una receta
    function publicarReceta(idReceta) {
        $.ajax({
            url: '../controllers/ctr_receta.php',
            method: 'POST',
            data: {
                action: 'publicar',
                id_receta: idReceta
            },
            success: function(response) {
                alert('Receta publicada con éxito');
                // Opcional: recargar las recetas después de publicar
                location.reload();
            },
            error: function(xhr, status, error) {
                console.error("Error al publicar la receta:", error);
            }
        });
    }
});
