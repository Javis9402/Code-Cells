// ==========================================
// LOGIN - Conexión con el Backend
// ==========================================
import { loginUser } from "../Services/AuthService.js";

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const alertContainer = document.getElementById("alert-container");

    // Limpiar estados previos
    if (emailError) emailError.textContent = "";
    if (passwordError) passwordError.textContent = "";
    if (alertContainer) alertContainer.innerHTML = "";
    if (emailInput) emailInput.classList.remove("input-error");
    if (passwordInput) passwordInput.classList.remove("input-error");

    // ==========================================
    // FUNCIÓN AUXILIAR PARA MOSTRAR ALERTAS BOOTSTRAP
    // ==========================================
    function mostrarAlertaBootstrap(mensaje, tipo = "danger") {
      if (!alertContainer) {
        alert(mensaje); // Respaldo de emergencia
        return;
      }

      // Limpiamos cualquier mensaje técnico o feo que venga por error
      let mensajeLimpio = mensaje;
      const msjMin = mensaje.toLowerCase();

      if (
        msjMin.includes("401") ||
        msjMin.includes("unauthorized") ||
        msjMin.includes("credenciales")
      ) {
        mensajeLimpio =
          "El correo electrónico o la contraseña son incorrectos.";
      } else if (
        msjMin.includes("failed to fetch") ||
        msjMin.includes("networkerror")
      ) {
        mensajeLimpio =
          "No se pudo conectar con el servidor. Verifica tu conexión a internet.";
      }

      alertContainer.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show shadow-sm" role="alert">
          ${mensajeLimpio}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;

      // Auto-cerrar después de 4 segundos
      setTimeout(() => {
        const alerta = alertContainer.querySelector(".alert");
        if (alerta) {
          alerta.classList.remove("show");
          setTimeout(() => alerta.remove(), 300);
        }
      }, 4000);
    }

    // ==========================================
    // VALIDACIONES LOCALES (Frontend)
    // ==========================================
    const emailVacio = email === "";
    const passwordVacio = password === "";

    // Caso 1: ambos vacíos
    if (emailVacio && passwordVacio) {
      mostrarAlertaBootstrap(
        "Por favor, ingresa tu correo y contraseña.",
        "danger",
      );
      emailInput.classList.add("input-error");
      passwordInput.classList.add("input-error");
      return;
    }

    // Caso 2: solo correo vacío
    if (emailVacio && !passwordVacio) {
      emailError.textContent = "El correo electrónico es obligatorio.";
      emailInput.classList.add("input-error");
      return;
    }

    // Caso 3: solo contraseña vacía
    if (!emailVacio && passwordVacio) {
      passwordError.textContent = "La contraseña es obligatoria.";
      passwordInput.classList.add("input-error");
      return;
    }

    // Caso 4: formato de email inválido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Ingresa un correo electrónico válido.";
      emailInput.classList.add("input-error");
      return;
    }

    // ==========================================
    // CONEXIÓN AL BACKEND
    // ==========================================
    try {
      const data = await loginUser({ email, password });

      if (!data) {
        throw new Error("Datos incorrectos");
      }

      // Verificamos que el backend devolvió al usuario
      if (!data.id && !data.email) {
        console.error("Respuesta del servidor:", data);
        throw new Error("Datos incorrectos");
      }

      // ==========================================
      // LOGIN CORRECTO
      // ==========================================
      localStorage.setItem("sesionActiva", "true");
      localStorage.setItem("usuarioId", data.id);
      localStorage.setItem("usuarioActivo", data.name);
      localStorage.setItem("nombreUsuario", data.name);

      if (data.role) {
        localStorage.setItem("usuarioRol", data.role);
      }

      loginForm.reset();

      // Mostrar alerta de éxito
      mostrarAlertaBootstrap("Iniciando sesión...", "success");

      // Redirigir al feed después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "./feed.html";
      }, 1500);
    } catch (error) {
      // ==========================================
      // MANEJO DE ERRORES AMIGABLE (Catch)
      // ==========================================
      console.error("Login error técnico:", error);

      // Por defecto, asumimos que los datos están mal
      let mensajeParaMostrar =
        "El correo electrónico o la contraseña son incorrectos.";

      // Si el servidor está apagado o no hay red
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        mensajeParaMostrar =
          "No hay conexión con el servidor. Inténtalo más tarde.";
      }
      // Si el error viene del backend con un mensaje que queremos mostrar traducido
      else if (error.message.includes("desactivada")) {
        mensajeParaMostrar =
          "Tu cuenta se encuentra desactivada. Contacta a soporte.";
      }

      // Mostramos la alerta roja
      mostrarAlertaBootstrap(mensajeParaMostrar, "danger");

      // Marcamos los inputs en rojo
      if (emailInput) emailInput.classList.add("input-error");
      if (passwordInput) passwordInput.classList.add("input-error");
    }
  });
}

// ==========================================
// TOGGLE PASSWORD (MOSTRAR/OCULTAR)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("togglePassword");
  const toggleIcon = document.getElementById("toggleIcon");
  const passwordInput = document.getElementById("password");

  if (togglePassword && toggleIcon && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const esPassword = passwordInput.type === "password";
      passwordInput.type = esPassword ? "text" : "password";
      toggleIcon.src = esPassword
        ? "../assets/img/icons/ojo-abierto.svg"
        : "../assets/img/icons/ojo-cerrado.svg";
      toggleIcon.alt = esPassword ? "Ocultar contraseña" : "Mostrar contraseña";
    });
  }
});

// ==========================================
// QUITAR BORDE ROJO Y LIMPIAR ERRORES AL ESCRIBIR
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      emailInput.classList.remove("input-error");
      const emailError = document.getElementById("emailError");
      if (emailError) emailError.textContent = "";
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      passwordInput.classList.remove("input-error");
      const passwordError = document.getElementById("passwordError");
      if (passwordError) passwordError.textContent = "";
    });
  }
});

// ==========================================
// REDIRECCIÓN AL REGISTRO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const registerLink = document.getElementById("registerLink");
  if (registerLink) {
    registerLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "registro.html";
    });
  }
});
