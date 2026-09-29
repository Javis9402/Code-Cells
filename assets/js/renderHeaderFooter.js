const enlaces = {
    
}

const body = document.querySelector("body");

const headerElement = `
    <nav class="navbar navbar-expand-lg bg">
        <div class="container-fluid">
        <!--Logo-->
        <a class="navbar-brand" href="./pages/feed.html">
            <img src="/assets/img/logo/logoInstarama(ficticio)SF.png" alt="logo de la red social" class="logo" />
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
  `

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
  `

body.insertAdjacentHTML("afterbegin", headerElement);
body.insertAdjacentHTML("beforeend", footerElement);