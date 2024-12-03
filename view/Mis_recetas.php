<h1>Mis recetas</h1>

  <div id="contenedor-recetas" class="recetas-container"></div>
  <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->




  <!-- Botón para agregar recta -->
  <button id="btn_agregar" class="btn btn-warning rounded-circle" type="button">
    <i class="bi bi-plus"></i>
  </button>


  <!-- Div donde se cargará el formulario agregar -->
  <div id="contenedor_form_agregar" class="content">
    <div class="registro-content">
      <span class="cerrar-btn"><i class="bi bi-x"></i></span>
      <div class="encabezado">
        <h2>Agregar receta</h2>
        <p>Rellena todos los campos con la información solicitada.</p>
      </div>
      <hr>
      <form id="formReceta">

        <div class="mb-3">
          <label for="titulo">Título de la receta</label>
          <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Titulo" pattern="[A-Za-zÀ-ÿ\s]+" title="Solo se permiten letras" required>
        </div>

        <div class="mb-3">
          <label>Ingredientes</label>
          <div id="ingredientes-container">
            <div class="row ingrediente">
              <div class="col">
                <input type="text" class="form-control" name="ingrediente" placeholder="Ingrediente" pattern="[A-Za-zÀ-ÿ\s]+" title="Solo se permiten letras" required>
              </div>
              <div class="col">
                <input type="number" class="form-control" name="cantidad" placeholder="Cantidad" pattern="\d+" title="Solo se permiten números" required>
              </div>
              <div class="col">
                <select class="form-control" name="select_medida" required>
                  <option value="unidad" selected> unidad </option>
                  <option value="cucharada"> cucharada </option>
                  <option value="cucharadita"> cucharadita </option>
                  <option value="media cucharada"> media cucharada</option>
                  <option value="cuarto"> cuarto </option>
                  <option value="kilo"> kilo </option>
                  <option value="medio"> medio </option>
                  <option value="lata"> lata </option>
                  <option value="litro"> litro </option>
                  <option value="paquete"> paquete </option>
                  <option value="mililitro"> mililitro </option>
                  <option value="botella"> botella </option>
                  <option value="pieza"> pieza </option>
                  <option value="piezas"> piezas </option>
                  <option value="pizca"> pizca </option>
                  <option value="taza"> taza </option>
                  <option value="unidades"> unidades </option>
                </select>
              </div>
              <div class="col-auto">
                <button type="button"  class="btn btn-danger eliminar-ingrediente" disabled><i class="bi bi-x"></i></button>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <button type="button" id="btn_agregarIngrediente" class="btn btn-link">Agregar ingrediente
          <i class="bi bi-plus"></i>
        </button>
        </div>
        <br>
        

        <div class="mb-3">
          <label for="instrucciones">Instrucciones</label>
          <textarea class="form-control" id="instrucciones" name="instrucciones" rows="4" required></textarea>
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="tiempo">Tiempo de preparación</label>
            <input type="number" class="form-control" id="tiempo" name="tiempo" required min="1">

          </div>
          <div class="col">
            <br><br>
            <p>minutos.</p>
          </div>
        </div>

        <div class="mb-3">
          <label for="img">Selecccione una imagen </label>
          <br>
          <input type="file" class="input_img" name="imagen" id="imagen" accept="image/*" required>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
  <span></span>
  <button id="insertar_receta" type="submit" class="btn btn-warning btn_enviar">Guardar receta</button>
</div>

      </form>
    </div>
  </div>

  <script src="../Recetario/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script type="module" src="../Recetario/js/agregarReceta.js"></script>
  <script type="module" src="../Recetario/js/Mis_Recetas.js"></script>



