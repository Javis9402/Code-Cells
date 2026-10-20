
const carrusel = document.getElementById("carruselDestacado");
const ventana = document.getElementById("ventanaDestacada");
const pista = document.getElementById("pistaDestacada");

const botonAnterior = document.getElementById("anteriorDestacado");
const botonSiguiente = document.getElementById("siguienteDestacado");
const contador = document.getElementById("contadorDestacado");

const tarjetas = Array.from(
    pista.querySelectorAll(".tarjeta-destacada")
);

let indiceActivo = 0;
let temporizador = null;

const intervalo = 5000;

const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

// Centra la tarjeta seleccionada.
function centrarTarjeta() {
    const tarjeta = tarjetas[indiceActivo];

    const centroTarjeta =
        tarjeta.offsetLeft + tarjeta.offsetWidth / 2;

    const desplazamiento =
        ventana.clientWidth / 2 - centroTarjeta;

    pista.style.transform =
        `translateX(${desplazamiento}px)`;
}

// Actualiza la tarjeta protagonista.
function actualizarCarrusel() {
    tarjetas.forEach((tarjeta, indice) => {
        const activa = indice === indiceActivo;

        tarjeta.classList.toggle("activa", activa);
        tarjeta.setAttribute("aria-current", activa ? "true" : "false");
    });

    contador.textContent =
        `${String(indiceActivo + 1).padStart(2, "0")} / ` +
        `${String(tarjetas.length).padStart(2, "0")}`;

    centrarTarjeta();
}

// Cambia de tarjeta.
function cambiarTarjeta(direccion) {
    indiceActivo =
        (indiceActivo + direccion + tarjetas.length) %
        tarjetas.length;

    actualizarCarrusel();
}

// Avanza automáticamente.
function avanzarAutomaticamente() {
    cambiarTarjeta(1);
}

// Control del temporizador.
function detenerCarrusel() {
    clearInterval(temporizador);
    temporizador = null;
}

function iniciarCarrusel() {
    detenerCarrusel();

    if (
        movimientoReducido.matches ||
        document.hidden ||
        tarjetas.length < 2
    ) {
        return;
    }

    temporizador = setInterval(
        avanzarAutomaticamente,
        intervalo
    );
}

// Controles manuales.
botonAnterior.addEventListener("click", () => {
    detenerCarrusel();
    cambiarTarjeta(-1);
    iniciarCarrusel();
});

botonSiguiente.addEventListener("click", () => {
    detenerCarrusel();
    cambiarTarjeta(1);
    iniciarCarrusel();
});

// Pausa cuando el usuario interactúa.
carrusel.addEventListener("mouseenter", detenerCarrusel);
carrusel.addEventListener("mouseleave", iniciarCarrusel);

carrusel.addEventListener("focusin", detenerCarrusel);

carrusel.addEventListener("focusout", (evento) => {
    if (!carrusel.contains(evento.relatedTarget)) {
        iniciarCarrusel();
    }
});

// No ejecutar el carrusel en una pestaña oculta.
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        detenerCarrusel();
    } else {
        iniciarCarrusel();
    }
});

// Recentrar al cambiar el tamaño de la pantalla.
window.addEventListener("resize", centrarTarjeta);

// Respetar cambios en la preferencia de movimiento.
movimientoReducido.addEventListener("change", iniciarCarrusel);

// Estado inicial.
actualizarCarrusel();
iniciarCarrusel();
