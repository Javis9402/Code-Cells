document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const alertContainer = document.getElementById("alert-container");

  // TODO: --- MODAL SOLO PARA ÉXITO (BIENVENIDA) ---
  const modalHTML = `
    <div class="modal fade" id="modalExito" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center" style="border-radius: 15px; border: none;">
          <div class="modal-header border-0 pb-0 justify-content-end">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0">
            <!-- Icono Araña -->
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
  const btnModalContinuar = document.getElementById("btnModalContinuar");

  //* FUNCION PARA REDIRIGIR A PAGINA DE LOGIN CUANDO SELECCIONE CONTINUAR
  btnModalContinuar.onclick = function () {
    window.location.href = "login.html";
  };

  // TODO: --- FUNCIÓN PARA MOSTRAR ALERTAS DE BOOTSTRAP ---
  function mostrarAlertaBootstrap(mensaje, tipo = "danger") {
    alertContainer.innerHTML = "";

    const alertaHTML = `
      <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    alertContainer.innerHTML = alertaHTML;

    //* Auto-cerrar después de 4 segundos
    setTimeout(() => {
      const alerta = alertContainer.querySelector(".alert");
      if (alerta) {
        alerta.classList.remove("show");
        setTimeout(() => alerta.remove(), 300);
      }
    }, 4000);
  }

  // TODO: --- LÓGICA DEL FORMULARIO ---
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    alertContainer.innerHTML = "";

    //* 1. Campos vacíos
    if (!username || !email || !password || !confirmPassword) {
      mostrarAlertaBootstrap(
        "Por favor, complete todos los campos del formulario.",
        "danger",
      );
      return;
    }

    //* 2. Longitud de la contraseña (minimo 8 caracteres)
    if (password.length < 8) {
      mostrarAlertaBootstrap(
        "La contraseña no puede tener menos de 8 caracteres.",
        "danger",
      );
      return;
    }

    //* 3. Correo inválido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarAlertaBootstrap(
        "Por favor, ingrese un correo electrónico válido.",
        "warning",
      );
      return;
    }

    //* 4. Contraseñas no coinciden
    if (password !== confirmPassword) {
      mostrarAlertaBootstrap(
        "Las contraseñas ingresadas no son iguales. Intente nuevamente.",
        "danger",
      );
      return;
    }

    //* 5. Términos no aceptados
    if (!terms) {
      mostrarAlertaBootstrap(
        "Debe aceptar los términos y condiciones para registrarse.",
        "warning",
      );
      return;
    }

    // TODO: Crear objeto JSON
    const usuario = {
      username: username,
      email: email,
      password: password,
      fechaRegistro: new Date().toISOString(),
    };

    let usuariosRegistrados =
      JSON.parse(localStorage.getItem("usuariosInstarama")) || [];

    const usuarioExistente = usuariosRegistrados.find(
      (u) => u.username === username || u.email === email,
    );

    // TODO: 6. Usuario ya registrado -> ALERTA BOOTSTRAP
    if (usuarioExistente) {
      mostrarAlertaBootstrap(
        "El usuario al que estas ingresando ya esta registrado. Intente nuevamente.",
        "danger",
      );
      return;
    }

    // TODO: Guardar nuevo usuario
    usuariosRegistrados.push(usuario);
    localStorage.setItem(
      "usuariosInstarama",
      JSON.stringify(usuariosRegistrados),
    );

    //* Éxito: Mostrar MODAL de bienvenida
    modalInstance.show();

    form.reset();
  });
});