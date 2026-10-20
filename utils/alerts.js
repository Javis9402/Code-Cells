// utils/alerts.js

/**
 * Muestra una alerta dentro de un contenedor.
 *
 * @param {string} message  Texto a mostrar (puede incluir HTML).
 * @param {HTMLElement|string} el  Elemento contenedor o su selector (#alert-container).
 * @param {"success"|"danger"|"warning"|"info"} type  Tipo de alerta Bootstrap.
 * @param {number} duration  ms antes de auto-cerrar (0 = no se cierra sola).
 */
export const showAlert = function (
  message,
  el,
  type = "success",
  duration = 3500,
) {
  // Permitir pasar un selector o el elemento directamente
  const container = typeof el === "string" ? document.querySelector(el) : el;
  if (!container) {
    console.warn("[showAlert] No se encontró el contenedor de alertas.");
    return;
  }

  // Limpiar alertas previas (solo dejamos una a la vez para no acumular)
  container.innerHTML = "";

  const alertHTML = `
    <div class="alert alert-${type} alert-dismissible fade show instarama-alert" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", alertHTML);

  // Auto-cerrar con fade
  if (duration > 0) {
    setTimeout(() => {
      const alerta = container.querySelector(".alert");
      if (!alerta) return;
      alerta.classList.remove("show");
      setTimeout(() => alerta.remove(), 300);
    }, duration);
  }
};

// Alias para usar en inglés/español indistintamente
export const mostrarAlerta = showAlert;
