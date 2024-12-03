export function recuperarRecetaInfo(recetaId) {
  console.log('Estoy dentro de editarRecetas.js');
  $.ajax({
    url: '../Recetario/controllers/ctr_receta.php?action=obtenerReceta',
    type: 'POST',
    data: { id_receta: recetaId },
    dataType: 'json',
    success: function (response) {
      if (response.success) {
        const receta = response.receta;

        // Llenar el formulario con los datos de la receta
        $('#titulo').val(receta.titulo);
        $('#instrucciones').val(receta.instrucciones);
        $('#tiempo').val(receta.tiempo_preparacion);

        // Mostrar el formulario/modal de edición
        document.getElementById('contenedor_form_agregar').style.display =
          'flex';
        document.getElementById('insertar_receta').textContent =
          'Guardar cambios';
        document.querySelector('h2').textContent = 'Editar receta';
        $('.menu-opciones').hide();
      } else {
        alert(response.message);
      }
    },
    error: function () {
      alert('Error al recuperar los datos de la receta.');
    },
  });
}

/*export function actualizarRecetaInfo(){
   $('#btn_guardar').on('click', function () {
  const recetaId = $(this).data('id'); // ID de la receta a actualizar
  const jsonData = {
    id_receta: recetaId,
    titulo: $('#titulo').val(),
    instrucciones: $('#instrucciones').val(),
    tiempo_preparacion: $('#tiempo_preparacion').val(),
    estado: $('#estado').val(),
  };

  $.ajax({
    url: '../Recetario/controllers/ctr_receta.php?action=editarReceta',
    type: 'POST',
    data: JSON.stringify(jsonData),
    contentType: 'application/json',
    success: function (response) {
      if (response.success) {
        alert('Receta actualizada exitosamente.');
        // Actualizar la lista de recetas
        obtenerRecetas(); // Asume que tienes esta función
        $('#contenedor_form_agregar').hide();
        $('#btn_agregar').show();
      } else {
        alert(response.message);
      }
    },
    error: function () {
      alert('Error al actualizar la receta.');
    },
  });
});
 
}*/ 