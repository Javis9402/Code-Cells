// Headers y footers originales de cada página, renderizados por render.js.
// Cada plantilla conserva el HTML exacto que tenía la página (incluidas sus rutas relativas).

// ===== index.html =====
export const header_index = `
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <!-- LOGO -->
        <a class="navbar-brand" href="#">
          <img
            src="../assets/img/logo/Logo contexto.svg"
            alt="InstaRama Logo"
            class="logo-img"
          />
        </a>

        <!-- TODO Botón Hamburguesa (para móviles) -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- TODO ENLACES DE NAVEGACIÓN -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Enlaces Centrales -->
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-4 gap-lg-5">
            <li class="nav-item">
              <a class="nav-link fw-semibold" aria-current="page" href="#"
                >Inicio</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./pages/acercaDe.html">Acerca de</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./pages/feed.html">Explorar</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../pages/contacto.html">Contacto</a>
            </li>
          </ul>

          <!-- TODO ENLACES DE LA DERECHA (Botones) -->
          <ul class="navbar-nav mb-2 mb-lg-0 gap-3 align-items-center">
            <li class="nav-item">
              <!-- Botón Iniciar Sesión -->
              <a class="btn-iniciar" href="./pages/login.html"
                >Iniciar sesión</a
              >
            </li>
            <li class="nav-item">
              <!-- Botón Registrarse -->
              <a class="btn-registrar" href="./pages/registro.html"
                >Registrarse</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
`;

export const footer_index = `
    <!-- TODO ================= FOOTER ================= -->
    <footer class="footer-custom">
      <div class="container text-center">
        <!-- Frase (Open Sans Bold) -->
        <p class="footer-frase">
          "Conocer la naturaleza es el primer paso para cuidarla." 🌿
        </p>
        <!-- Copyright (Open Sans Regular) -->
        <p class="footer-copyright">© 2026 — InstaRama. All rights reserved.</p>
      </div>
    </footer>
`;

// ===== pages/acercaDe.html =====
export const header_acercaDe = `
    <!--Inicia nav-->
    <nav class="navbar navbar-expand-lg green-shadow navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
            <!--Logo-->
            <a class="navbar-brand" href="../pages/feed.html">
                <img src="../assets/img/logo/Logo contexto.svg" alt="logo de la red social" class="logo" />
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
                <div class="navbar-nav mx-auto text-center gap-3 gap-lg-5">
                    <a class="nav-link btn-nav" href="../index.html">Inicio</a> 
                    <a class="nav-link btn-nav fw-semibold" href="#">Acerca de</a>
                    <a class="nav-link btn-nav" href="../pages/feed.html">Explorar</a>
                    <a class="nav-link btn-nav" href="../pages/contacto.html">Contacto</a>
                </div>

            <!-- TODO ENLACES DE LA DERECHA (Botones) -->
            <ul class="navbar-nav mb-2 mb-lg-0 gap-3 align-items-center">
              <li class="nav-item">
                <!-- Botón Iniciar Sesión -->
                <a class="btn-iniciar" href="../pages/login.html"
                >Iniciar sesión</a
              >
              </li>
              <li class="nav-item">
                <!-- Botón Registrarse -->
                <a class="btn-registrar" href="../pages/registro.html"
                >Registrarse</a>
              </li>
            </ul>
            </div>


            <!--Navegación-->
        </div>
    </nav>
    <!--termina nav-->
`;

export const footer_acercaDe = `
    <footer class="text-center py-4">
        <p class="mb-1 text-light fw-semibold">
            "Conocer la naturaleza es el primer paso para cuidarla." 🌿
        </p>
        <p class="mb-0 small text-light opacity-75">
            © 2026 — InstaRama. All rights reserved.
        </p>
    </footer>
`;

// ===== pages/gestionarPublicaciones.html =====
export const header_gestionarPublicaciones = `
    <!--Inicia nav-->
    <nav class="navbar navbar-expand-lg bg sticky-top navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
            <!--Logo-->
            <a class="navbar-brand" href="../pages/feed.html">
                <img src="../assets/img/logo/Logo contexto.svg" alt="logo de la red social" class="logo" />
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
                <div class="navbar-nav mx-auto gap-3 gap-lg-5">
                    <a class="nav-link btn-nav" href="../index.html">Inicio</a>
                    <a class="nav-link btn-nav fw-semibold" href="./feed.html">Explorar</a>
                    <a class="nav-link btn-nav" href="../pages/acercaDe.html">Acerca de</a>
                    <a class="nav-link btn-nav" href="../pages/contacto.html">Contacto</a>
                    <a class="nav-link btn-nav" href="./perfil.html">Perfil</a>
                    <a class="nav-link btn-nav" href="../index.html" data-cerrar-sesion>Cerrar sesión</a>
                </div>

            </div>
            <!--Navegación-->
        </div>
    </nav>
    <!--termina nav-->
`;

// ===== pages/publicacion.html =====
export const header_publicacion = `
  <!--Inicia nav-->
  <nav class="navbar navbar-expand-lg bg navbar-custom">
    <div class="container-fluid px-4 px-lg-5">
      <!--Logo-->
      <a class="navbar-brand" href="../pages/feed.html">
        <img src="../assets/img/logo/Logo contexto.svg" alt="logo de la red social" class="logo" />
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
        <div class="navbar-nav mx-auto gap-3 gap-lg-5">
          <a class="nav-link btn-nav" href="../index.html">Inicio</a>
          <a class="nav-link btn-nav" href="../pages/feed.html">Explorar</a>
          <a class="nav-link btn-nav" href="../pages/acercaDe.html">Acerca de</a>
          <a class="nav-link btn-nav" href="../pages/contacto.html">Contacto</a>
          <a class="nav-link btn-nav" href="./perfil.html">Perfil</a>
          <a class="nav-link btn-nav" href="../index.html" data-cerrar-sesion>Cerrar sesión</a>
        </div>
      </div>
      <!--Navegación-->
    </div>
  </nav>
  <!--termina nav-->
`;

// ===== pages/login.html =====
export const header_login = `
    <!--TODO HEADER -->
    <header class="header-instarama py-3">
        <div class="container-fluid d-flex justify-content-end align-items-center h-100">
            <a href="registro.html" class="btn-iniciar">Registrarse</a>
        </div>
    </header>
`;

// ===== pages/registro.html =====
export const header_registro = `
    <!--TODO HEADER -->
    <header class="header-instarama py-3">
      <div
        class="container-fluid d-flex justify-content-end align-items-center h-100"
      >
        <a href="login.html" class="btn-iniciar">Iniciar sesión</a>
      </div>
    </header>
`;

// ===== pages/feed.html =====
export const header_feed = `
    <!-- ========== TOPBAR ========== -->
    <header class="ir-topbar">
      <!-- Solo en celular: abre el sidebar como menú lateral -->
      <button
        type="button"
        class="ir-menu-btn"
        aria-label="Abrir menú"
        aria-controls="ir-sidebar"
        aria-expanded="false"
      >☰</button>
      <form class="ir-search" role="search">
        <input
          type="search"
          id="buscador"
          class="form-control"
          placeholder="Buscar observaciones"
          aria-label="Buscar"
        />
        <button type="submit" aria-label="Buscar">🔍</button>
      </form>
      <a class="ir-topbar-link" href="./gestionarPublicaciones.html">Mis publicaciones</a>
      <a class="ir-topbar-link" href="./perfil.html">Perfil</a>
      <a class="ir-topbar-link" href="../index.html" data-cerrar-sesion>Log out</a>
    </header>
`;


// ===== pages/contacto.html =====
export const header_contacto = `
  <nav class="navbar navbar-expand-lg green-shadow navbar-custom">
    <div class="container-fluid px-4 px-lg-5">

      <!-- Logo -->
      <a class="navbar-brand" href="./feed.html">
        <img src="../assets/img/logo/Logo contexto.svg" alt="logo de la red social" class="logo" />
      </a>

      <!-- Botón responsive -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navegación -->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

                <!-- Enlaces centrales -->
                <div class="navbar-nav mx-auto text-center gap-3 gap-lg-5">

                    <a class="nav-link btn-nav" href="../index.html">
                        Inicio
                    </a>

                    <a class="nav-link btn-nav" href="../pages/acercaDe.html">
                        Acerca de
                    </a>                    

                    <a class="nav-link btn-nav" href="../pages/feed.html">
                        Explorar
                    </a>

                    <a class="nav-link btn-nav fw-semibold" href="../pages/contacto.html" aria-current="page">
                        Contacto
                    </a>

                </div>

                <!-- Botones de sesión -->
                <ul class="navbar-nav mb-2 mb-lg-0 gap-3 align-items-center">

                    <li class="nav-item">
                        <a class="btn-iniciar" href="../pages/login.html">
                            Iniciar sesión
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="btn-registrar" href="../pages/registro.html">
                            Registrarse
                        </a>
                    </li>

                </ul>
      </div>
    </div>
  </nav>
`;


// ===== pages/contacto.html =====
export const header_registrar = `
  <nav class="navbar navbar-expand-lg green-shadow navbar-custom">
    <div class="container-fluid px-4 px-lg-5">

      <!-- Logo -->
      <a class="navbar-brand" href="./feed.html">
        <img src="../assets/img/logo/Logo contexto.svg" alt="logo de la red social" class="logo" />
      </a>

      <!-- Botón responsive -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navegación -->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

                <!-- Enlaces centrales -->
                <div class="navbar-nav mx-auto text-center gap-3 gap-lg-5">

                    <a class="nav-link btn-nav" href="../index.html">
                        Inicio
                    </a>

                    <a class="nav-link btn-nav" href="../pages/acercaDe.html">
                        Acerca de
                    </a>                    

                    <a class="nav-link btn-nav" href="../pages/feed.html">
                        Explorar
                    </a>

                    <a class="nav-link btn-nav" href="../pages/contacto.html" aria-current="page">
                        Contacto
                    </a>

                </div>

                <!-- Botones de sesión -->
                <ul class="navbar-nav mb-2 mb-lg-0 gap-3 align-items-center">

                    <li class="nav-item">
                        <a class="btn-iniciar" href="../pages/login.html">
                            Iniciar sesión
                        </a>
                    </li>

                    <li class="nav-item">
                        <!--<a class="btn-registrar" href="../pages/registro.html">
                            Registrarse
                        </a>-->
                    </li>

                </ul>
      </div>
    </div>
  </nav>
`;
