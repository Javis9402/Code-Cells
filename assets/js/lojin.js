// ==========================================
// USUARIO DE PRUEBA
// ==========================================

const usuarioPrueba = {
    username: "fernanda",
    password: "123456"
};


// ==========================================
// GUARDAR USUARIO EN LOCAL STORAGE
// ==========================================

localStorage.setItem(
    "usuario",
    JSON.stringify(usuarioPrueba)
);


// ==========================================
// OBTENER FORMULARIO
// ==========================================

const loginForm = document.getElementById("loginForm");


// ==========================================
// VALIDAR FORMULARIO
// ==========================================

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const usernameError =
        document.getElementById("usernameError");

    const passwordError =
        document.getElementById("passwordError");

    const loginError =
        document.getElementById("loginError");


    // Limpiar mensajes anteriores
    usernameError.textContent = "";
    passwordError.textContent = "";

    loginError.textContent = "";
    loginError.classList.add("d-none");


    // ==========================================
    // VALIDAR CAMPOS VACÍOS
    // ==========================================

    let formularioValido = true;

    if (username === "") {

        usernameError.textContent =
            "El nombre de usuario es obligatorio.";

        formularioValido = false;
    }


    if (password === "") {

        passwordError.textContent =
            "La contraseña es obligatoria.";

        formularioValido = false;
    }


    // Si hay errores, detenemos el formulario
    if (!formularioValido) {
        return;
    }


    // ==========================================
    // OBTENER USUARIO DEL LOCAL STORAGE
    // ==========================================

    const usuarioGuardado =
        JSON.parse(localStorage.getItem("usuario"));


    // ==========================================
    // COMPROBAR USUARIO Y CONTRASEÑA
    // ==========================================

    if (
        username === usuarioGuardado.username &&
        password === usuarioGuardado.password
    ) {

        // Guardamos la sesión
        localStorage.setItem("sesionActiva", "true");

        // Guardamos el usuario que inició sesión
        localStorage.setItem("usuarioActivo", username);


        // ==========================================
        // REDIRECCIÓN AL FEED
        // ==========================================

        window.location.href = "./feed.html";

    } else {

        loginError.textContent =
            "Nombre de usuario o contraseña inválidos.";

        loginError.classList.remove("d-none");
    }

});