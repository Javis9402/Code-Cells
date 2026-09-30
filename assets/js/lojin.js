
// ==========================================
// USUARIO DE PRUEBA
// ==========================================

const usuarioPrueba = {
    username: "fernanda",
    password: "123456"
};


// ==========================================
// OBTENER USUARIOS GUARDADOS
// ==========================================

let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];


// ==========================================
// AGREGAR USUARIO DE PRUEBA
// SOLO SI NO EXISTE
// ==========================================

const usuarioExiste = usuarios.some(
    (usuario) => usuario.username === usuarioPrueba.username
);

if (!usuarioExiste) {

    usuarios.push(usuarioPrueba);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}


// ==========================================
// OBTENER FORMULARIOS
// ==========================================

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");


// ==========================================
// REGISTRO
// ==========================================

if (registerForm) {

    registerForm.addEventListener("submit", (event) => {

        event.preventDefault();


        // ==========================================
        // OBTENER DATOS
        // ==========================================

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value.trim();

        const confirmPassword =
            document.getElementById("confirmPassword").value.trim();


        // ==========================================
        // MENSAJES
        // ==========================================

        const registerError =
            document.getElementById("registerError");

        const registerSuccess =
            document.getElementById("registerSuccess");


        registerError.textContent = "";
        registerSuccess.textContent = "";


        // ==========================================
        // VALIDAR CAMPOS VACÍOS
        // ==========================================

        if (
            username === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            registerError.textContent =
                "Todos los campos son obligatorios.";

            return;
        }


        // ==========================================
        // VALIDAR CONTRASEÑAS
        // ==========================================

        if (password !== confirmPassword) {

            registerError.textContent =
                "Las contraseñas no coinciden.";

            return;
        }


        // ==========================================
        // OBTENER USUARIOS ACTUALIZADOS
        // ==========================================

        usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];


        // ==========================================
        // COMPROBAR SI EL USUARIO YA EXISTE
        // ==========================================

        const usuarioExiste =
            usuarios.some(
                (usuario) => usuario.username === username
            );


        if (usuarioExiste) {

            registerError.textContent =
                "El nombre de usuario ya está registrado.";

            return;
        }


        // ==========================================
        // CREAR NUEVO USUARIO
        // ==========================================

        const nuevoUsuario = {

            username: username,
            password: password

        };


        // ==========================================
        // GUARDAR NUEVO USUARIO
        // ==========================================

        usuarios.push(nuevoUsuario);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );


        // ==========================================
        // REGISTRO EXITOSO
        // ==========================================

        registerSuccess.textContent =
            "¡Registro exitoso! Ya puedes iniciar sesión.";


        // Limpiar formulario

        registerForm.reset();

    });

}


// ==========================================
// INICIO DE SESIÓN
// ==========================================

if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();


        // ==========================================
        // OBTENER DATOS DEL LOGIN
        // ==========================================

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


        // ==========================================
        // LIMPIAR MENSAJES
        // ==========================================

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


        // ==========================================
        // DETENER SI HAY ERRORES
        // ==========================================

        if (!formularioValido) {
            return;
        }


        // ==========================================
        // OBTENER USUARIOS
        // ==========================================

        const usuariosGuardados =
            JSON.parse(localStorage.getItem("usuarios")) || [];


        // ==========================================
        // BUSCAR USUARIO
        // ==========================================

        const usuarioEncontrado =
            usuariosGuardados.find(
                (usuario) =>
                    usuario.username === username &&
                    usuario.password === password
            );


        // ==========================================
        // COMPROBAR USUARIO Y CONTRASEÑA
        // ==========================================

        if (usuarioEncontrado) {

            // ==========================================
            // GUARDAR SESIÓN
            // ==========================================

            localStorage.setItem(
                "sesionActiva",
                "true"
            );


            // ==========================================
            // GUARDAR USUARIO ACTIVO
            // ==========================================

            localStorage.setItem(
                "usuarioActivo",
                username
            );


            // ==========================================
            // REDIRECCIÓN AL FEED
            // ==========================================

            window.location.href = "./feed.html";


        } else {

            // ==========================================
            // LOGIN INCORRECTO
            // ==========================================

            loginError.textContent =
                "Nombre de usuario o contraseña inválidos.";

            loginError.classList.remove("d-none");
        }

    });

}

