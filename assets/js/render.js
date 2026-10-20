//TODO > JS enfocado en renderizar elementos generales en todos los HTML

import { normalizeActualPageName, cerrarSesion } from "./utils.js";
import {
    header_index, footer_index,
    header_acercaDe, footer_acercaDe,
    header_gestionarPublicaciones,
    header_publicacion,
    header_login,
    header_registrar,
    header_feed,
    header_contacto
} from "./plantillasLayout.js";

const body = document.querySelector("body");
const head = document.querySelector("head");

const nombrePagina = normalizeActualPageName(window.location.pathname) || "index";

// Raíz del proyecto calculada a partir de la ubicación de este archivo (assets/js/render.js),
// así los enlaces funcionan igual desde index.html que desde /pages/*.html
const ROOT = new URL("../../", import.meta.url);
const ruta = (path) => new URL(path, ROOT).href;

const paginas = {
    acercaDe: ruta("pages/acercaDe.html"),
    contacto: ruta("pages/contacto.html"),
    feed: ruta("pages/feed.html"), // --> inicio
    login: ruta("pages/login.html"),
    objetos: ruta("pages/objetos.html"),
    proyecto: ruta("pages/proyecto.html"),
    publicacion: ruta("pages/publicacion.html"),
    registro: ruta("pages/registro.html"),
    index: ruta("index.html")
};

const logo = ruta("assets/img/logo/logoInstarama(ficticio)SF.png");

// Enlaces que aparecen en el header y en el footer
const enlacesNav = [
    { texto: "Inicio", href: paginas.index, pagina: "index" },
    { texto: "Explorar", href: paginas.feed, pagina: "feed" },
    { texto: "Acerca de", href: paginas.acercaDe, pagina: "acercaDe" },
    { texto: "contacto", href: paginas.contacto, pagina: "contato" },
];

const styles = `
    <!--TODO  FUENTES -->

    <!-- TODO Nunito -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Yuyu+Short&display=swap"
        rel="stylesheet">

    <!-- TODO MONTSERRAT -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">

    <!-- TODO ONEST -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Onest:wght@100..900&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="${ruta("assets/css/contactanos.css")}" />

    <!--! FIN  FUENTES -->
`;

// TODO > ================= CONFIGURACIÓN POR PÁGINA =================
// header / footer: HTML a insertar (null = la página no lleva ese elemento)
// headerDespuesDe: selector del elemento tras el cual va el header (por defecto, al inicio del body)

const layouts = {
    index: { header: header_index, footer: footer_index },
    acercaDe: { header: header_acercaDe, footer: footer_acercaDe },
    gestionarPublicaciones: { header: header_gestionarPublicaciones, footer: null },
    perfil: { header: header_gestionarPublicaciones, footer: null }, // mismo menú que las demás páginas con sesión
    publicacion: { header: header_publicacion, footer: null },
    login: { header: header_login, footer: null },
    registro: { header: header_registrar, footer: footer_index },
    feed: { header: header_feed, footer: null, headerDespuesDe: ".ir-sidebar" },
    objetos: { header: null, footer: null },
    contacto: { header: header_contacto, footer: footerContactoTemplate() }
};

const layoutGeneral = { header: headerTemplate(), footer: footerTemplate() };

// TODO > ================= RENDER =================
const layout = layouts[nombrePagina] ?? layoutGeneral;
renderHeader(layout);
renderFooter(layout);

// Cualquier enlace con data-cerrar-sesion borra la sesión antes de salir
document.addEventListener("click", (e) => {
    const enlace = e.target.closest("[data-cerrar-sesion]");
    if (!enlace) return;
    e.preventDefault();
    cerrarSesion();
});


// TODO > ================= FUNCIONES =================

// TODO > ================= PLANTILLAS GENERALES =================
// Se usan en contacto, proyecto y cualquier página sin plantilla propia

function headerTemplate() {
    const links = enlacesNav
        .map(({ texto, href }) => `
                <a class="nav-link btn-nav" href="${href}">${texto}</a>`)
        .join("");

    return `
    <nav class="navbar navbar-expand-lg green-shadow navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
        <!--Logo-->
        <a class="navbar-brand" href="${paginas.feed}">
            <img src="${logo}" alt="logo de la red social" class="logo" />
        </a>
        <!--Logo-->
        <!--Botón responsive-->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!--Botón responsive-->
        <!--Navegación-->
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav mx-auto gap-3 gap-lg-5">${links}
                <a class="nav-link btn-nav fw-semibold" href="../pages/contacto.html">Contacto</a>
            </div>
            <div class="navbar-nav ms-lg-3 gap-3">
                <a href="${paginas.login}" class="btn-iniciar">Iniciar sesión</a>
                <a href="${paginas.registro}" class="btn-registrar">Registrate</a>
            </div>
        </div>
        <!--Navegación-->
        </div>
    </nav>
  `;
}

// Footer general (todas las páginas excepto contacto)
function footerTemplate() {
    const links = enlacesNav
        .filter(({ pagina }) => pagina !== "acercaDe")
        .map(({ texto, href }) => `
            <a href="${href}" class="text-light text-decoration-none mx-2 small">${texto}</a>`)
        .join("");

    return `
    <footer class="text-center mt-5 py-4">
    <div class="container">
        <div class="mb-3">${links}
        </div>
        <p class="mb-1 text-light fw-semibold">
            "Conocer la naturaleza es el primer paso para cuidarla." 🌿
        </p>
        <p class="mb-0 small text-light opacity-75">
            © 2026 — InstaRama. All rights reserved.
        </p>
        </div>
    </footer>
`;
}

// Footer con el estilo de la página de contacto (usa la clase .footer de contactanos.css)
function footerContactoTemplate() {
    const links = enlacesNav
        .filter(({ pagina }) => pagina !== "acercaDe")
        .map(({ texto, href }) => `
                <a href="${href}" class="text-decoration-none">${texto}</a>`)
        .join("");

    return `
    <footer class="footer text-center mt-2 py-4">
        <div class="container px-3">
            <div class="footer-links d-flex justify-content-center flex-wrap gap-3 pb-3 mb-3">${links}
            </div>
            <p class="mb-2">
                "Conocer la naturaleza es el primer paso para cuidarla." 🌿
            </p>
            <p class="mb-0 small">
                © 2026 — InstaRama. All rights reserved.
            </p>
        </div>
    </footer>
`;
}

function renderHeader({ header, headerDespuesDe }) {
    if (!header) return;

    const referencia = headerDespuesDe && body.querySelector(headerDespuesDe);
    if (referencia) {
        referencia.insertAdjacentHTML("afterend", header);
    } else {
        body.insertAdjacentHTML("afterbegin", header);
    }
}

function renderFooter({ footer }) {
    if (!footer) return;

    // Si la página tiene <script> al final del body, el footer se coloca antes de ellos
    const primerScript = body.querySelector(":scope > script");
    if (primerScript) {
        primerScript.insertAdjacentHTML("beforebegin", footer);
    } else {
        body.insertAdjacentHTML("beforeend", footer);
    }
}

// TODO > Funcion para renderizar tipografias y estilos
// function renderStyles() {
//     head.insertAdjacentHTML("afterbegin", styles);
// }

// TODO > Funcion para renderizar dark o light mode
// head.insertAdjacentHTML("beforeend", dark o light mode);
