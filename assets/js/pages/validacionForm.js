import { enviarContacto } from "../Services/ContactFormService.js";
import { obtenerUsuarioPorId } from "../Services/UserService.js";

// ID de usuario por defecto en caso de que no haya sesión iniciada
const USER_ID_PRUEBA = 26;

// Seleccionamos los elementos del DOM
const form = document.getElementById("contactForm");
const namee = document.getElementById("name");
const email = document.getElementById("email");
const messageType = document.getElementById("messageType");
const message = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageTypeError = document.getElementById("messageTypeError");
const messageError = document.getElementById("messageError");
const formResult = document.getElementById("formResult");

// ==========================================
// LÓGICA PARA OBTENER EL PERFIL DEL USUARIO
// ==========================================
async function cargarDatosUsuario() {
  const usuarioId = localStorage.getItem("usuarioId");

  if (usuarioId) {
    try {
      // Hacemos la petición al backend para traer los datos
      const usuario = await obtenerUsuarioPorId(usuarioId);

      if (usuario) {
        // Llenamos los campos con los datos de la BD
        namee.value = usuario.name || "";
        email.value = usuario.email || "";

        // Bloqueamos los inputs para que no los modifiquen
        namee.setAttribute("readonly", true);
        email.setAttribute("readonly", true);

        // Fondo gris para indicar que están bloqueados
        namee.style.backgroundColor = "#e9ecef";
        email.style.backgroundColor = "#e9ecef";
      }
    } catch (error) {
      console.warn("No se pudo cargar el perfil del usuario:", error);
      namee.value = "";
      email.value = "";
    }
  } else {
    // No hay sesión: los campos se quedan vacíos para que el usuario los llene
    namee.value = "";
    email.value = "";
  }
}

// Ejecutamos la función apenas cargue la página
document.addEventListener("DOMContentLoaded", cargarDatosUsuario);

// ==========================================
// LÓGICA DEL FORMULARIO DE CONTACTO
// ==========================================
form.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  let esValido = true;

  // Limpiamos mensajes de error anteriores
  namee.classList.remove("is-invalid");
  email.classList.remove("is-invalid");
  messageType.classList.remove("is-invalid");
  message.classList.remove("is-invalid");

  nameError.textContent = "";
  emailError.textContent = "";
  messageTypeError.textContent = "";
  messageError.textContent = "";
  formResult.className = "mt-3";
  formResult.textContent = "";

  // Validar nombre (Si tiene el atributo readonly, significa que ya está validado)
  const esSoloLectura = namee.hasAttribute("readonly");

  if (!esSoloLectura) {
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
  }

  // Validar email
  if (!esSoloLectura) {
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
  }

  // Validar tipo de mensaje
  if (messageType.value === "") {
    messageType.classList.add("is-invalid");
    messageTypeError.textContent = "Selecciona un tipo de mensaje.";
    esValido = false;
  }

  // Validar mensaje
  if (message.value.trim() === "") {
    message.classList.add("is-invalid");
    messageError.textContent = "El mensaje es obligatorio.";
    esValido = false;
  } else if (message.value.trim().length < 10) {
    message.classList.add("is-invalid");
    messageError.textContent = "El mensaje debe tener al menos 10 caracteres.";
    esValido = false;
  } else if (message.value.trim().length > 250) {
    message.classList.add("is-invalid");
    messageError.textContent = "El mensaje no debe exceder los 250 caracteres.";
    esValido = false;
  }

  // Si todo es válido, se envía
  if (esValido) {
    // Si el usuario está logueado, usamos su ID real. Si no, usamos el de prueba.
    const idParaEnviar = localStorage.getItem("usuarioId") || USER_ID_PRUEBA;

    try {
      await enviarContacto({
        characterType: messageType.value,
        message: message.value.trim(),
        email: email.value.trim(),
        userId: Number(idParaEnviar),
      });

      // 👇 AQUÍ ESTÁ LA MAGIA 👇
      // En lugar de form.reset() que borra todo, solo limpiamos los campos manuales
      messageType.value = "";
      message.value = "";

      formResult.className = "mt-3 alert alert-success";
      formResult.textContent = "¡Mensaje enviado! Gracias por contactarnos.";
    } catch (e) {
      formResult.className = "mt-3 alert alert-danger";
      formResult.textContent = `No se pudo enviar el mensaje: ${e.message}`;
    }
  }
});
