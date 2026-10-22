import { ensureLoggedIn, cerrarSesion } from "../core/utils.js";
import { obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } from "../Services/UserService.js";
import { getPostsByUserId } from "../Services/PostService.js";

const USER_ID = ensureLoggedIn(localStorage.getItem("usuarioId"));

// Mismas reglas que el registro
const REGEX_CORREO = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD = 8;

const NOMBRES_ROL = {
    USER: "Explorador",
    ADMIN: "Administrador",
};

// ===== Elementos =====
const tituloNombre = document.getElementById("perfil-nombre");
const subtituloCorreo = document.getElementById("perfil-correo");
const resumenPublicaciones = document.getElementById("perfil-publicaciones");
const resumenRol = document.getElementById("perfil-rol");
const avisoPerfil = document.getElementById("perfil-aviso");

const form = document.getElementById("perfil-form");
const inputNombre = document.getElementById("perfil-input-nombre");
const inputCorreo = document.getElementById("perfil-input-correo");
const inputPassword = document.getElementById("perfil-input-password");
const inputConfirmar = document.getElementById("perfil-input-confirmar");
const avisoForm = document.getElementById("perfil-form-aviso");
const btnGuardar = document.getElementById("perfil-guardar");

const inputConfirmacionEliminar = document.getElementById("eliminar-confirmacion");
const avisoEliminar = document.getElementById("eliminar-aviso");
const btnEliminarCuenta = document.getElementById("btn-eliminar-cuenta");

// Datos tal como están guardados, para mandar solo lo que cambió
let usuarioActual = null;

// ===== Mostrar datos =====
function pintarUsuario(usuario) {
    usuarioActual = usuario;
    tituloNombre.textContent = usuario.name;
    subtituloCorreo.textContent = usuario.email;
    resumenRol.textContent = NOMBRES_ROL[usuario.role] || usuario.role || "—";
    inputNombre.value = usuario.name;
    inputCorreo.value = usuario.email;
}

// tipo: "error", "exito" o "info" (estilos de la paleta en gestionarPublicacion.css)
function mostrarAvisoForm(texto, tipo) {
    avisoForm.textContent = texto;
    avisoForm.className = `alert aviso-cuaderno aviso-cuaderno--${tipo} mt-3 mb-0`;
}

async function cargarPerfil() {
    try {
        pintarUsuario(await obtenerUsuarioPorId(USER_ID));
    } catch (error) {
        subtituloCorreo.textContent = "";
        avisoPerfil.textContent = `No se pudieron cargar tus datos: ${error.message}`;
        avisoPerfil.classList.remove("d-none");
        btnGuardar.disabled = true;
        return;
    }

    // Si falla contar los hallazgos se queda el guion; el resto del perfil sí funciona
    try {
        const posts = await getPostsByUserId(USER_ID);
        resumenPublicaciones.textContent = posts.length;
    } catch (error) {
        console.warn("No se pudieron contar los hallazgos:", error.message);
    }
}

// ===== Guardar cambios =====
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!usuarioActual) return;

    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const password = inputPassword.value;
    const confirmar = inputConfirmar.value;

    const errores = [
        [inputNombre, !nombre || nombre.length > 50],
        [inputCorreo, !REGEX_CORREO.test(correo)],
        [inputPassword, password !== "" && password.length < MIN_PASSWORD],
        [inputConfirmar, password !== confirmar],
    ];

    let valido = true;
    errores.forEach(([campo, hayError]) => {
        campo.classList.toggle("is-invalid", hayError);
        if (hayError) valido = false;
    });
    if (!valido) return;

    // Solo se manda lo que cambió
    const cambios = {};
    if (nombre !== usuarioActual.name) cambios.name = nombre;
    if (correo !== usuarioActual.email) cambios.email = correo;
    if (password) cambios.password = password;

    if (Object.keys(cambios).length === 0) {
        mostrarAvisoForm("No hay cambios que guardar.", "info");
        return;
    }

    btnGuardar.disabled = true;
    try {
        pintarUsuario(await actualizarUsuario(USER_ID, cambios));
    } catch (error) {
        mostrarAvisoForm(`No se pudieron guardar los cambios: ${error.message}`, "error");
        return;
    } finally {
        btnGuardar.disabled = false;
    }

    // Los comentarios nuevos y el resto de páginas usan el nombre guardado en la sesión
    localStorage.setItem("nombreUsuario", usuarioActual.name);
    localStorage.setItem("usuarioActivo", usuarioActual.name);

    inputPassword.value = "";
    inputConfirmar.value = "";
    mostrarAvisoForm("¡Listo! Tus datos se guardaron.", "exito");
});

// Al corregir un campo se quita su marca de error
form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));

// ===== Eliminar cuenta =====
// El botón solo se activa al escribir el nombre de usuario exacto
inputConfirmacionEliminar.addEventListener("input", () => {
    btnEliminarCuenta.disabled = !usuarioActual
        || inputConfirmacionEliminar.value.trim() !== usuarioActual.name;
});

document.getElementById("modalEliminarCuenta").addEventListener("hidden.bs.modal", () => {
    inputConfirmacionEliminar.value = "";
    btnEliminarCuenta.disabled = true;
    avisoEliminar.classList.add("d-none");
});

btnEliminarCuenta.addEventListener("click", async () => {
    btnEliminarCuenta.disabled = true;
    try {
        await eliminarUsuario(USER_ID);
    } catch (error) {
        avisoEliminar.textContent = `No se pudo eliminar la cuenta: ${error.message}`;
        avisoEliminar.classList.remove("d-none");
        btnEliminarCuenta.disabled = false;
        return;
    }
    cerrarSesion();
});

// ===== Inicio =====
cargarPerfil();
