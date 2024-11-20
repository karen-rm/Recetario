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
                  <option value="valor1" selected> unidad </option>
                  <option value="valor16"> cucharada </option>
                  <option value="valor2"> cucharadita </option>
                  <option value="valor3"> cuarto de cucharadita </option>
                  <option value="valor4"> cuarto </option>
                  <option value="valor5"> gramo </option>
                  <option value="valor6"> galón </option>
                  <option value="valor7"> libra </option>
                  <option value="valor8"> litro </option>
                  <option value="valor9"> miligramo </option>
                  <option value="valor10"> mililitro </option>
                  <option value="valor11"> onza </option>
                  <option value="valor12"> pieza </option>
                  <option value="valor13"> piezas </option>
                  <option value="valor14"> pizca </option>
                  <option value="valor15"> taza </option>
                  <option value="valor17"> unidades </option>
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
  <script src="../Recetario/js/agregarReceta.js"></script>
  <script src="../Recetario/js/Mis_Recetas.js"></script>



