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

    //limpiamos mensajes anteriores
    //classList permite decirle a bootstrap que el campo tiene error
    namee.classList.remove("is-invalid");
    email.classList.remove("is-invalid");
    messageType.classList.remove("is-invalid");
    message.classList.remove("is-invalid");

    nameError.textContent = "";
    emailError.textContent = "";
    messageTypeError.textContent = "";
    messageError.textContent = "";

    //validar de nombre
    //no debe estar vacio, que sea solo texto y como minimo tenga 3 caracteres
    /**
     * ^ -> indica el inicio de la cadena
     * [a-zA-ZáéíóúÁÉÍÓÚñÑ\s] -> acepta cualquiera de los caracteres dentro de los corchetes
     * \s -> espacio en blanco
     *  + -> significa uno o más
     * $ -> final del texto
     */
    const espresionNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (namee.value.trim() === "") {
        //classList permite decirle a bootstrap que el campo tiene error
        namee.classList.add("is-invalid");
        nameError.textContent = "El nombre es obligatorio.";
    } else if (!espresionNombre.test(namee.value.trim())) {
        namee.classList.add("is-invalid");
        nameError.textContent = "El nombre solo debe contener letras.";
    } else if (namee.value.trim().length < 3) {
        namee.classList.add("is-invalid");
        nameError.textContent = "El nombre debe tener al menos 3 caracteres.";
    }

    //validar email
    /**
     * Expresión
     * ^ -> indica el inicio de la cadena
     * [a-zA-Z0-9._-] -> caracteres que acepta antes del arroba
     * [a-zA-Z0-9.-] -> caracteres que acepta despues del arroba
     * \. -> significa un punto literal
     * {2,6}  -> significa entre do y 6 caracteres
     */
    const expresionCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (email.value.trim() === "") {
        email.classList.add("is-invalid");
        emailError.textContent = "El correo es obliagtorio";
    } else if (!expresionCorreo.test(email.value.trim())) {
        email.classList.add("is-invalid");
        emailError.textContent = "Ingresa un correo válido.";
    }

    //validar tipo de mensaje
    if (messageType.value === "") {
        messageType.classList.add("is-invalid");
        messageTypeError.textContent = "Selecciona un tipo de mensaje.";
    }

    //validar mensaje
    if (message.value.trim() === "") {
        message.classList.add("is-invalid");
        messageError.textContent = "El mensaje es obligatorio.";
    } else if (message.value.trim().length < 10) {
        message.classList.add("is-invalid");
        messageError.textContent = "El mensaje debe tener al menos 10 caracteres.";
    }


});
