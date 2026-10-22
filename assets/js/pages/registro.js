// ==========================================
// REGISTRO - Conexión con el Backend
// ==========================================
import { registerUser } from "../Services/AuthService.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  // TODO: --- MODAL SOLO PARA ÉXITO (BIENVENIDA) ---
  const modalHTML = `
    <div class="modal fade" id="modalExito" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center" style="border-radius: 15px; border: none;">
          <div class="modal-header border-0 pb-0 justify-content-end">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0">
            <img src="../assets/img/alerts/alerta-arana.svg" alt="Alerta" style="width: 80px; margin-bottom: 15px;">
            <h5 class="modal-title fw-bold mb-3">¡Bienvenido a Instarama!</h5>
            <p class="mb-4">Tu cuenta ha sido creada exitosamente.</p>
            <button type="button" class="btn custom-btn w-100" id="btnModalContinuar">Continuar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modalElement = document.getElementById("modalExito");
  const modalInstance = new bootstrap.Modal(modalElement);

  // Al hacer clic en "Continuar", lo mandamos al login
  document.getElementById("btnModalContinuar").onclick = () => {
    window.location.href = "login.html";
  };

  // ------------------------------------------
  // Submit del formulario
  // ------------------------------------------
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms")?.checked ?? true;

    const alertContainer = document.getElementById("alert-container");

    // Limpiar alertas previas
    if (alertContainer) alertContainer.innerHTML = "";

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

      // Traducimos errores técnicos a lenguaje humano
      if (
        msjMin.includes("400") ||
        msjMin.includes("bad request") ||
        msjMin.includes("inválidos")
      ) {
        mensajeLimpio =
          "Los datos ingresados no son válidos. Por favor, revísalos.";
      } else if (msjMin.includes("ya existe") || msjMin.includes("duplicado")) {
        mensajeLimpio =
          "Este correo electrónico ya está registrado. Intenta iniciar sesión.";
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

    // ------------------------------------------
    // Validaciones del Frontend
    // ------------------------------------------

    // 1. Campos vacíos
    if (!username || !email || !password || !confirmPassword) {
      mostrarAlertaBootstrap(
        "Por favor, complete todos los campos del formulario.",
        "danger",
      );
      return;
    }

    // 2. Longitud de la contraseña (mínimo 8 caracteres)
    if (password.length < 8) {
      mostrarAlertaBootstrap(
        "La contraseña debe tener al menos 8 caracteres.",
        "danger",
      );
      return;
    }

    // 3. Correo inválido
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      mostrarAlertaBootstrap(
        "Ingrese un correo electrónico válido (ejemplo: usuario@dominio.com).",
        "warning",
      );
      return;
    }

    // 4. Contraseñas no coinciden
    if (password !== confirmPassword) {
      mostrarAlertaBootstrap(
        "Las contraseñas ingresadas no coinciden.",
        "danger",
      );
      return;
    }

    // 5. Términos no aceptados
    if (!terms) {
      mostrarAlertaBootstrap(
        "Debe aceptar los términos y condiciones para registrarse.",
        "warning",
      );
      return;
    }

    // ------------------------------------------
    // Conexión al Backend
    // ------------------------------------------
    const usuario = {
      name: username, // Java espera 'name'
      email: email,
      password: password,
    };

    try {
      const data = await registerUser(usuario);

      if (!data) {
        throw new Error("No se recibieron datos del servidor.");
      }

      console.log("Usuario registrado con éxito:", data);

      // Limpiamos el formulario y mostramos el modal de bienvenida
      form.reset();
      modalInstance.show();
    } catch (error) {
      console.error("Register error técnico:", error);

      // TODO: Si el backend manda un mensaje que ya es legible (ej. "El email ya existe")
      //  TODO: lo atrapamos. Si no, mandamos un genérico amigable.
      let mensajeParaMostrar = error.message;

      // TODO: Si el mensaje es puramente técnico (ej. solo dice "Error en el registro (400)")
      // TODO: lo reemplazamos por uno bonito.
      if (
        mensajeParaMostrar.includes("(400)") ||
        mensajeParaMostrar.includes("Error en el registro")
      ) {
        mensajeParaMostrar =
          "No se pudo completar el registro. Verifica que los datos sean correctos o intenta con otro correo.";
      }

      mostrarAlertaBootstrap(mensajeParaMostrar, "danger");
    }
  });
});
