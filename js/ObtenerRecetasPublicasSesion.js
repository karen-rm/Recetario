function cargarRecetasPublicasSesion() {
    $(document).ready(function () {
        $.ajax({
            url: '/Recetario/controllers/ctr_receta.php?action=recetasPublicasSesion',
            method: 'GET',
            dataType: 'json',
            success: function (recetas) {
                console.log('Recetas públicas recibidas:', recetas);
                let recetasHtml = '';
                recetas.forEach((receta) => {
                    recetasHtml += `
            <div class="card" style="width: 18rem;">
                <img src="${receta.imagen_url}" class="card-img-top" alt="${receta.titulo}">
                <div class="card-body" style="background-color: #264653; color: white;">
                    <h5 class="card-title">${receta.titulo}</h5>
                    <p class="card-text">${receta.tiempo_preparacion || 'Tiempo desconocido'} Minutos</p>
                </div>
            </div>`;
                });
                $('.recetasCards').html(recetasHtml);
            },
            error: function (error) {
                console.error('Error al cargar las recetas públicas:', error);
            },
        });
    });
}

window.cargarRecetasPublicasSesion = cargarRecetasPublicasSesion;
