


<div class="container-fluid">
    <section class="busqueda">
        <div class="tittleBusqueda">
            <h1>¿Listo para más experiencias <br> deliciosas?</h1>
        </div>
        <div class="inputBusqueda">
            <h5 class="inputTittle">Descubra recetas modernas e innovadoras</h5>
            <input class="form-control" name="busqueda" id="busqueda" type="text" placeholder="Buscar recetas">
        </div>
        <div class="buttonBusqueda">
            <button type="button" class="btn" id="agrega">Agrega</button>
            <button type="button" class="btn" id="busca">Busca</button>
        </div>
    </section>

    <section class="recetasDestacadas">
         <h2 style="color: #264653;">Recetas destacadas</h2>
        <p>Prueba nuestras recetas de moda</p>

        <div class="recetasCards">
            <!-- Las recetas se cargarán aquí dinámicamente -->
        </div>
    </section>
    <section class="consejos">
        <h2 style="color: #264653;">Consejos de Cocina</h2>
        <p>Mejora tus habilidades culinarias</p>
        <div class="cardConsejos">
            <div class="cardConsejo">
                <img src="../images/utensilios.jpeg" class="card-img-top" alt="Filete en cama de verduras ">
                <div class="cardText">
                    <h6>Habilidades con cuchillos 101</h6>
                    <p>Maestro del arte del manejo de cuchillos <br>
                        para eficientizar la cocina</p>
                </div>
            </div>
            <div class="cardConsejo" style="background-color: #264653;">
                <img src="../images/utensilios2.jpeg" class="card-img-top" alt="Filete en cama de verduras ">
                <div class="cardText">
                    <h6>Combinacion de sabores</h6>
                    <p>Descubre una gran variedad de <br>
                        combinaciones de sabores para tus platillos</p>
                </div>
            </div>
        </div>
    </section>
    <section class="reseñas">
        <h2 style="color: #264653;">Reseñas de Usuarios</h2>
        <p>Ve lo que dice nuestra comunidad</p>
        <div class="cardReseñas">
            <div class="cardReseña">
                <div class="reseñaTittle">
                    <div class="user">
                        <img src="../images/user.png" alt="userPicture">
                        <p>Elena</p>
                    </div>
                    <div class="estrellas">
                        <img src="../images/estrellas.png" alt="starsPicture">
                    </div>
                </div>
                <div class="cardText">
                    <h6>Recetas asombrosas, simples de seguir <br>
                        y resultados deliciosos</h6>
                </div>
            </div>
            <div class="cardReseña">
                <div class="reseñaTittle">
                    <div class="user">
                        <img src="../images/user.png" alt="userPicture">
                        <p>Fernando</p>
                    </div>
                    <div class="estrellas">
                        <img src="../images/estrellas.png" alt="starsPicture">
                    </div>
                </div>
                <div class="cardText">
                    <h6>Gran variedad de platillos perfecto para <br>
                        experimentar</h6>
                </div>
            </div>
            <div class="cardReseña">
                <div class="reseñaTittle">
                    <div class="user">
                        <img src="../images/user.png" alt="userPicture">
                        <p>Gabriela</p>
                    </div>
                    <div class="estrellas">
                        <img src="../images/estrellas.png" alt="starsPicture">
                    </div>
                </div>
                <div class="cardText">
                    <h6>Increible presentacion e intrucciones faciles</h6>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Recipes</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
        </ul>
    </footer>
</div>

<script src="./js/ObtenerRecetasPublicasHome.js"></script>