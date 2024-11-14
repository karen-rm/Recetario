$(document).ready(function () {
  // Mapeo de mensajes para cada campo
  const messageMap = {
    nombre: "#mensaje-nombre",
    apellido_paterno: "#mensaje-apellidoPaterno",
    apellido_materno: "#mensaje-apellidoMaterno",
    correo: "#mensaje-correo",
    telefono: "#mensaje-telefono",
    usuario: "#mensaje-usuario",
    contraseña: "#mensaje-contraseña"
  };

  // Función para obtener los datos del formulario
  function getFormData() {
    return {
      nombre: $("#nombre").val(),
      apellidoPaterno: $("#apellido_paterno").val(),
      apellidoMaterno: $("#apellido_materno").val(),
      correo: $("#correo").val(),
      telefono: $("#telefono").val(),
      usuario: $("#usuario").val(),
      contrasena: $("#contraseña").val(),
    };
  }

  // Función para validar los datos
  function validateFormData(formData) {
    for (const key in formData) {
      if (!formData[key]) {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          text: "Por favor, complete todos los campos.",
          confirmButtonText: "Aceptar",
        });
        return false;
      }
    }
    return true;
  }

  function onlyLetters(input) {
    $(input).keypress(function (event) {
      const charCode = event.which;
      if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
          event.preventDefault();
      }
  });
  }

  function onlyNumbers(input) {
    $(input).keypress(function (event) {
      const charCode = event.which;
      if (charCode < 48 || charCode > 57) {
          event.preventDefault();
      }
  });
  }

  function onlyLettersAndNumbers(input) {
    $(input).keypress(function (event) {
      const charCode = event.which;
      if ((charCode < 48 || charCode > 57) && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
          event.preventDefault();
      }
  });
  }

  onlyLetters("#nombre");
  onlyLetters("#apellido_paterno");
  onlyLetters("#apellido_materno");
  onlyNumbers("#telefono"); 
  onlyLettersAndNumbers("#usuario");
  onlyLettersAndNumbers("#contraseña");

  // Función para enviar el formulario usando fetch
  function submitForm() {
    const formData = new FormData($("#registroForm")[0]);
    formData.append("accion", "registro");

    fetch("/controllers/registroCtrl.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        handleResponse(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud fetch:", error);
        Swal.fire({
          icon: "error",
          title: "Error de red",
          text: "Error al enviar los datos. Inténtalo nuevamente.",
          confirmButtonText: "Aceptar",
        });
      });
  }

  // Función para manejar la respuesta de la solicitud
  function handleResponse(data) {
    switch (data.trim()) {
      case "success":
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Su registro se completó exitosamente.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          // Cambiar la URL sin recargar la página
          window.history.pushState({}, "", "index.php?page=registro");
          location.reload(); // Recarga la página después del mensaje, si es necesario
        });
        break;
      default:
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data,
        });
        break;
    }
  }

  // Manejar el evento submit del formulario
  $("#registroForm").submit(function (event) {
    event.preventDefault();
    const formData = getFormData();
    
    // Validar los datos antes de enviar
    if (validateFormData(formData)) {
      submitForm();
    }
  });

  // Validación en tiempo real para cada campo
  $(".form-control").on("input", function (event) {
    const input = $(event.target);
    const id = input.attr("id");
    const mensajeId = messageMap[id];
    if (!input.val().trim()) {
      input.removeClass("is-valid").addClass("is-invalid");
      $(mensajeId).text("Este campo es obligatorio.");
    } else {
      input.removeClass("is-invalid").addClass("is-valid");
      $(mensajeId).text("");
    }
  });
});

