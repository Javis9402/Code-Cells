const paginas = {
  acercaDe: "../pages/acercaDe.html",
  contacto: "../pages/contacto.html",
  feed: "../pages/feed.html", // --> inicio
  login: "../pages/login.html",
  objetos: "../pages/objetos.html",
  publicacion: "../pages/publicacion.html",
  registro: "../pages/registro.html",
  index: "../index.html",
};

// const paginas = {
//     acercaDe : "../pages/acercaDe.html",
//     inicio : "../pages/feed.html",
//     proyecto : "../index.html",
//     equipo : "../index.html",
//     contacto : "../pages/contacto.html"
// // }

// console.log("============== ENLACES ==============");
// for(const enlace in enlaces){
//     console.log(enlaces[enlace]);
// }
// console.log("============== FIN ENLACES ==============");

const body = document.querySelector("body");

const headerElement = `
    <nav class="navbar navbar-expand-lg bg">
        <div class="container-fluid">
        <!--Logo-->
        <a class="navbar-brand" href="../pages/feed.html">
            <img src="/assets/img/logo/Logo contexto.svg" alt="logo de la red social" class="logo" />
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
            <div class="navbar-nav mx-auto gap-2 gap-lg-4">
                <a class="nav-link btn-nav" href="../pages/acercaDe.html">Acerca de</a>
                <a class="nav-link btn-nav" href="../pages/feed.html">Inicio</a>
                <a class="nav-link btn-nav" href="../index.html">Proyecto</a>
                <a class="nav-link btn-nav" href="../index.html">Equipo</a>
                <a class="nav-link btn-nav" href="../pages/contacto.html">Contacto</a>
            </div>
            <div class="navbar-nav ms-lg-3 gap-3">
                <a href="./pages/login.html" class="btn-iniciar">Iniciar sesión</a>
                <a href="./pages/registro.html" class="btn-iniciar">Registrate</a>
            </div>
        </div>
        <!--Navegación-->
        </div>
    </nav>
  `;

const footerElement = `
    <footer class="text-center mt-5 py-4">
    <div class="container">
        <div class="mb-3">
            <a href="./pages/feed.html" class="text-light text-decoration-none mx-2 small">Inicio</a>
            <a href="./index.html" class="text-light text-decoration-none mx-2 small">Proyecto</a>
            <a href="./index.html" class="text-light text-decoration-none mx-2 small">Equipo</a>
            <a href="./pages/contacto.html" class="text-light text-decoration-none mx-2 small">Contacto</a>
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

const footerElementNoNaim = `
    <footer class="footer text-center mt-2 py-4">
        <div class="container px-3">
            <div class="footer-links d-flex justify-content-center flex-wrap gap-3 pb-3 mb-3">
                <a href="./feed.html" class="text-decoration-none">Inicio</a>
                <a href="../index.html" class="text-decoration-none">Proyecto</a>
                <a href="../index.html" class="text-decoration-none">Equipo</a>
                <a href="./contacto.html" class="text-decoration-none">Contacto</a>
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

const nombrePagina = normalizeActualPageName(window.location.href);
console.log(nombrePagina);

if (nombrePagina.includes("index.html")) {
  // console.log("Estas en la pagina principal");
}
if (nombrePagina.includes("contacto.html")) {
  body.insertAdjacentHTML("beforeend", footerElement);
  // console.log("Estas en la pagina de contactanos");
}

body.insertAdjacentHTML("beforeend", footerElement);
body.insertAdjacentHTML("afterbegin", headerElement);

// TODO > ================= FUNCIONES =================

function normalizeActualPageName(url) {
  const splittedUrl = url.split("/");
  console.log(splittedUrl);
  const pageNameAndExtension = splittedUrl.at(-1);
  const spiltNameAndExtension = pageNameAndExtension.split(".");
  const pageName = spiltNameAndExtension[0];
  return pageName;
}

function loadFooter(pageName) {
  obtenerEnlaces(pageName);

  const footerElement = `
    <footer class="text-center mt-5 py-4">
        <div class="container">
        <div class="mb-3">
            <a href="./pages/feed.html" class="text-light text-decoration-none mx-2 small">Inicio</a>
            <a href="./index.html" class="text-light text-decoration-none mx-2 small">Proyecto</a>
            <a href="./index.html" class="text-light text-decoration-none mx-2 small">Equipo</a>
            <a href="./pages/contacto.html" class="text-light text-decoration-none mx-2 small">Contacto</a>
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

function obtenerEnlaces(pageName) {}
