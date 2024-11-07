// Cargar `home.html` al cargar la página
$(document).ready(function(){
    $("#content").load("view/login.php");
});

// Función para cargar el contenido de los enlaces
function loadPage(page) {
    $("#content").load(page);
}

// Event listeners para los enlaces de navegación
$(document).on("click", ".nav-link", function(e) {
    e.preventDefault();
    const page = $(this).attr("href");
    loadPage(page);
});
