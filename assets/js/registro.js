document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  // Elementos del Modal (los crearemos dinámicamente si no existen en el HTML,
  // pero para que funcione el CSS de Bootstrap, los inyectamos aquí)
  const modalHTML = `
    <div class="modal fade" id="modalAlerta" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center" style="border-radius: 15px; border: none;">
          <div class="modal-header border-0 pb-0 justify-content-end">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0">
            <!-- Icono Araña -->
            <img src="../assets/img/alerts/alerta-arana.svg" alt="Alerta" style="width: 80px; margin-bottom: 15px;">
            <h5 class="modal-title fw-bold mb-3" id="modalTitulo">Usuario ya registrado.</h5>
            <p class="mb-4" id="modalMensaje">El usuario al que estas ingresando ya esta registrado. Intente nuevamente</p>
            <button type="button" class="btn custom-btn w-100" data-bs-dismiss="modal" id="btnModalCerrar">Continuar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inyectar el modal en el body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modalElement = document.getElementById("modalAlerta");
  const modalInstance = new bootstrap.Modal(modalElement);
  const modalTitulo = document.getElementById("modalTitulo");
  const modalMensaje = document.getElementById("modalMensaje");
  const btnModalCerrar = document.getElementById("btnModalCerrar");

  // Función para mostrar el modal
  function mostrarAlerta(titulo, mensaje, recargar = false) {
    modalTitulo.textContent = titulo;
    modalMensaje.textContent = mensaje;

    // Si es el mensaje de "ya registrado", configuramos el botón para recargar
    if (recargar) {
      btnModalCerrar.onclick = function () {
        location.reload(); // Recarga la página
      };
    } else {
      btnModalCerrar.onclick = function () {
        modalInstance.hide();
      };
    }

    modalInstance.show();
  }

  // Escuchar el envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar envío por defecto

    // Obtener valores
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;
    const rememberMe = document.getElementById("rememberMe").checked;

    // 1. Validar Campos Vacíos
    if (!username || !email || !password || !confirmPassword) {
      mostrarAlerta(
        "Campos incompletos",
        "Por favor, complete todos los campos del formulario.",
      );
      return;
    }

    // 2. Validar Correo Electrónico (Regex básico)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarAlerta(
        "Correo inválido",
        "Por favor, ingrese un correo electrónico válido.",
      );
      return;
    }

    // 3. Validar Contraseña coincide
    if (password !== confirmPassword) {
      mostrarAlerta(
        "Contraseñas no coinciden",
        "Las contraseñas ingresadas no son iguales. Intente nuevamente.",
      );
      return;
    }

    // 4. Validar Términos y Condiciones
    if (!terms) {
      mostrarAlerta(
        "Términos y condiciones",
        "Debe aceptar los términos y condiciones para registrarse.",
      );
      return;
    }

    // --- VALIDACIONES PASADAS ---

    // Crear objeto JSON del usuario
    const usuario = {
      username: username,
      email: email,
      password: password, // En un caso real, esto debe ir encriptado
      fechaRegistro: new Date().toISOString(),
    };

    // Obtener usuarios registrados del localStorage (simulando base de datos)
    let usuariosRegistrados =
      JSON.parse(localStorage.getItem("usuariosInstarama")) || [];

    // Verificar si el usuario ya existe (por username o email)
    const usuarioExistente = usuariosRegistrados.find(
      (u) => u.username === username || u.email === email,
    );

    if (usuarioExistente) {
      // REQUISITO: Si el usuario ya está registrado, mostrar modal y recargar
      // La imagen 3 muestra este mensaje exacto
      mostrarAlerta(
        "Usuario ya registrado.",
        "El usuario al que estas ingresando ya esta registrado. Intente nuevamente",
        true, // Activar recarga al cerrar
      );

      // Nota: El requisito dice "actualizar la pagina automaticamente... y cuando este vuelve a ser registrado el modal deberia aparecer".
      // Al hacer clic en "Continuar", se ejecutará location.reload().
      // Si el usuario intenta registrarse de nuevo, el modal volverá a aparecer.
    } else {
      // Guardar nuevo usuario
      usuariosRegistrados.push(usuario);
      localStorage.setItem(
        "usuariosInstarama",
        JSON.stringify(usuariosRegistrados),
      );

      // Éxito
      mostrarAlerta(
        "Registro exitoso",
        "¡Bienvenido a Instarama! Tu cuenta ha sido creada.",
      );

      // Limpiar formulario
      form.reset();

      // Opcional: Redirigir después de un tiempo o al cerrar el modal
      btnModalCerrar.onclick = function () {
        modalInstance.hide();
        // window.location.href = "login.html"; // Redirigir si se desea
      };
    }
  });
});
