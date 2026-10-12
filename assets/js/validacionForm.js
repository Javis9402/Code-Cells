//seleccionamos los elementos del DOM
const form = document.getElementById('contactForm');
const namee = document.getElementById('name');
const email = document.getElementById('email');
const messageType = document.getElementById('messageType');
const message = document.getElementById('message');
const error = document.getElementById('error');

//Seleccionamos los divs donde se mostrará el mensaje de error
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageTypeError = document.getElementById('messageTypeError');
const messageError = document.getElementById('messageError');


form.addEventListener('submit', function (evento) {

    //evitamos el comportamiento predeterminado
    evento.preventDefault();

    let esValido = true;

    //limpiamos mensajes anteriores
    namee.classList.remove("is-invalid");
    email.classList.remove("is-invalid");
    messageType.classList.remove("is-invalid");
    message.classList.remove("is-invalid");

    nameError.textContent = "";
    emailError.textContent = "";
    messageTypeError.textContent = "";
    messageError.textContent = "";

    //validar nombre
    const espresionNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (namee.value.trim() === "") {
        namee.classList.add("is-invalid");
        nameError.textContent = "El nombre es obligatorio.";
        esValido = false;
    } else if (!espresionNombre.test(namee.value.trim())) {
        namee.classList.add("is-invalid");
        nameError.textContent = "El nombre solo debe contener letras.";
        esValido = false;
    } else if (namee.value.trim().length < 3) {
        namee.classList.add("is-invalid");
        nameError.textContent = "El nombre debe tener al menos 3 caracteres.";
        esValido = false;
    }

    //validar email
    const expresionCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (email.value.trim() === "") {
        email.classList.add("is-invalid");
        emailError.textContent = "El correo es obligatorio.";
        esValido = false;
    } else if (!expresionCorreo.test(email.value.trim())) {
        email.classList.add("is-invalid");
        emailError.textContent = "Ingresa un correo válido.";
        esValido = false;
    }

    //validar tipo de mensaje
    if (messageType.value === "") {
        messageType.classList.add("is-invalid");
        messageTypeError.textContent = "Selecciona un tipo de mensaje.";
        esValido = false;
    }

    //validar mensaje
    if (message.value.trim() === "") {
        message.classList.add("is-invalid");
        messageError.textContent = "El mensaje es obligatorio.";
        esValido = false;
    } else if (message.value.trim().length < 10) {
        message.classList.add("is-invalid");
        messageError.textContent = "El mensaje debe tener al menos 10 caracteres.";
        esValido = false;
    }

    //solo se envía si no hubo errores
    if (esValido) {
        sendFormByEmail(form);
    }
});
