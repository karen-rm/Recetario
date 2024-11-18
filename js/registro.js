$(document).ready(function () {
  console.log('Script de registro cargado correctamente.');

  // Mapeo de mensajes para cada campo
  const messageMap = {
    nombre: '#mensaje-nombre',
    apellido_paterno: '#mensaje-apellidoPaterno',
    apellido_materno: '#mensaje-apellidoMaterno',
    correo: '#mensaje-correo',
    telefono: '#mensaje-telefono',
    usuario: '#mensaje-usuario',
    contraseña: '#mensaje-contraseña',
  };

  // Función para obtener los datos del formulario
  function getFormData() {
    console.log('Obteniendo datos del formulario...');
    const data = {
      nombre: $('#nombre').val(),
      apellidoPaterno: $('#apellido_paterno').val(),
      apellidoMaterno: $('#apellido_materno').val(),
      correo: $('#correo').val(),
      telefono: $('#telefono').val(),
      usuario: $('#usuario').val(),
      contrasena: $('#contraseña').val(),
    };
    console.log('Datos del formulario:', data);
    return data;
  }

  // Función para validar los datos
  function validateFormData(formData) {
    console.log('Validando datos del formulario...');
    for (const key in formData) {
      if (!formData[key]) {
        console.log(`Campo vacío: ${key}`);
        Swal.fire({
          icon: 'error',
          title: 'Campos incompletos',
          text: 'Por favor, complete todos los campos.',
          confirmButtonText: 'Aceptar',
        });
        return false;
      }
    }
    console.log('Todos los campos están completos.');
    return true;
  }

  // Funciones de validación de entrada
  function onlyLetters(input) {
    $(input).keypress(function (event) {
      const charCode = event.which;
      if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        console.log('Se impidió una entrada no permitida en', input);
        event.preventDefault();
      }
    });
  }

  function onlyNumbers(input) {
    $(input).keypress(function (event) {
      const charCode = event.which;
      if (charCode < 48 || charCode > 57) {
        console.log('Se impidió una entrada no numérica en', input);
        event.preventDefault();
      }
    });
  }

  function onlyLettersAndNumbers(input) {
    $(input).keypress(function (event) {
      const charCode = event.which;
      if ((charCode < 48 || charCode > 57) && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        console.log('Se impidió una entrada no alfanumérica en', input);
        event.preventDefault();
      }
    });
  }

  onlyLetters('#nombre');
  onlyLetters('#apellido_paterno');
  onlyLetters('#apellido_materno');
  onlyNumbers('#telefono');
  onlyLettersAndNumbers('#usuario');
  onlyLettersAndNumbers('#contraseña');

  // Función para enviar el formulario usando fetch
  function submitForm() {
    console.log('Enviando datos del formulario...');
    const formData = new FormData($('#registroForm')[0]);
    formData.append('accion', 'registro');

    fetch('./controllers/registroCtrl.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('Respuesta recibida del servidor.');
        return response.text();
      })
      .then((data) => {
        console.log('Respuesta procesada:', data);
        handleResponse(data);
      })
      .catch((error) => {
        console.error('Error en la solicitud fetch:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: 'Error al enviar los datos. Inténtalo nuevamente.',
          confirmButtonText: 'Aceptar',
        });
      });
  }

  // Función para manejar la respuesta de la solicitud
  function handleResponse(data) {
    console.log('Manejando la respuesta del servidor...');
    switch (data.trim()) {
      case 'success':
        console.log('Registro exitoso.');
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Su registro se completó exitosamente.',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          console.log('Cargando página de inicio...');
          $('#main-container').load('./view/home.php');
        });
        break;
      default:
        console.error('Error en el registro:', data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data,
        });
        break;
    }
  }

  // Manejar el evento submit del formulario
  $('#registroForm').submit(function (event) {
    event.preventDefault();
    console.log('Formulario enviado.');
    const formData = getFormData();

    // Validar los datos antes de enviar
    if (validateFormData(formData)) {
      console.log('Formulario validado correctamente.');
      submitForm();
    } else {
      console.log('Formulario no validado.');
    }
  });

  // Validación en tiempo real para cada campo
  $('.form-control').on('input', function (event) {
    const input = $(event.target);
    const id = input.attr('id');
    const mensajeId = messageMap[id];
    if (!input.val().trim()) {
      console.log(`El campo ${id} está vacío.`);
      input.removeClass('is-valid').addClass('is-invalid');
      $(mensajeId).text('Este campo es obligatorio.');
    } else {
      console.log(`El campo ${id} tiene contenido.`);
      input.removeClass('is-invalid').addClass('is-valid');
      $(mensajeId).text('');
    }
  });
});
