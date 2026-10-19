// ==========================================
// USUARIO DE PRUEBA
// ==========================================
const usuarioPrueba = {
  email: "javier@instarama.com",
  username: "Javier Morales",
  password: "123456789",
};

// ==========================================
// OBTENER USUARIOS GUARDADOS
// ==========================================
let usuarios =
  JSON.parse(localStorage.getItem("usuariosInstarama")) ||
  JSON.parse(localStorage.getItem("usuarios")) ||
  [];

// ==========================================
// AGREGAR USUARIO DE PRUEBA (SI NO EXISTE)
// ==========================================
const usuarioExiste = usuarios.some(
  (usuario) => usuario.email === usuarioPrueba.email,
);

if (!usuarioExiste) {
  usuarios.push(usuarioPrueba);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// ==========================================
// OBTENER FORMULARIOS
// ==========================================
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// ==========================================
// REGISTRO
// ==========================================
if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    const registerError = document.getElementById("registerError");
    const registerSuccess = document.getElementById("registerSuccess");

    registerError.textContent = "";
    registerSuccess.textContent = "";

    // Validar campos vacíos
    if (!username || !email || !password || !confirmPassword) {
      registerError.textContent = "Todos los campos son obligatorios.";
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      registerError.textContent = "Ingresa un correo electrónico válido.";
      return;
    }

    // Validar contraseñas
    if (password !== confirmPassword) {
      registerError.textContent = "Las contraseñas no coinciden.";
      return;
    }

    // Obtener usuarios actualizados
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Comprobar si el email ya existe
    const emailExiste = usuarios.some((usuario) => usuario.email === email);
    if (emailExiste) {
      registerError.textContent = "El correo ya está registrado.";
      return;
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      username: username,
      email: email,
      password: password,
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    registerSuccess.textContent =
      "¡Registro exitoso! Ya puedes iniciar sesión.";
    registerForm.reset();
  });
}

// ==========================================
// INICIO DE SESIÓN
// ==========================================
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener datos del login
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const loginError = document.getElementById("loginError");

    // Limpiar mensajes y estados
    emailError.textContent = "";
    passwordError.textContent = "";
    loginError.textContent = "";
    loginError.classList.add("d-none");

    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");

    // ==========================================
    // VALIDACIONES
    // ==========================================
    const emailVacio = email === "";
    const passwordVacio = password === "";

    // Caso 1: ambos vacíos
    if (emailVacio && passwordVacio) {
      loginError.textContent = "Correo y/o contraseña no válidos.";
      loginError.classList.remove("d-none");
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
    // BUSCAR USUARIO
    // ==========================================
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuariosGuardados.find(
      (usuario) => usuario.email === email && usuario.password === password,
    );

    // ==========================================
    // LOGIN CORRECTO
    // ==========================================
    if (usuarioEncontrado) {
      localStorage.setItem("sesionActiva", "true");
      localStorage.setItem("usuarioActivo", usuarioEncontrado.username);
      localStorage.setItem("nombreUsuario", usuarioEncontrado.username);

      window.location.href = "./feed.html";
    } else {
      // ==========================================
      // LOGIN INCORRECTO
      // ==========================================
      loginError.textContent = "Correo y/o contraseña no válidos.";
      loginError.classList.remove("d-none");
      emailInput.classList.add("input-error");
      passwordInput.classList.add("input-error");
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

      // Cambiar tipo de input
      passwordInput.type = esPassword ? "text" : "password";

      // Cambiar icono
      toggleIcon.src = esPassword
        ? "../assets/img/icons/ojo-abierto.svg"
        : "../assets/img/icons/ojo-cerrado.svg";

      // Cambiar alt
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
