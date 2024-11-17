$(document).ready(function () {
    // Cargar la página por defecto al iniciar
    $.ajax({
        url: 'content.php',
        method: 'GET',
        data: { page: 'Inicio' }, // Por defecto, cargar la página "Inicio"
        success: function (response) {
            $('#main-content').html(response); // Cargar el contenido inicial
        },
        error: function (xhr, status, error) {
            console.error(`Error al cargar la página predeterminada: ${error}`);
        }
    });

    // Manejar clics en los enlaces con data-page
    $(document).on('click', 'a[data-page]', function (e) {
        e.preventDefault();

        const page = $(this).data('page'); // Obtener la página solicitada
        console.log(`Cargando página: ${page}`);

        $.ajax({
            url: 'content.php',
            method: 'GET',
            data: { page: page },
            success: function (response) {
                $('#main-content').fadeOut(200, function () {
                    $(this).html(response).fadeIn(200); // Reemplaza y muestra el contenido nuevo
                });
            },
            error: function (xhr, status, error) {
                console.error(`Error al cargar la página: ${error}`);
            }
        });
    });
});
