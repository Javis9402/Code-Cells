import { normalizeActualPageName } from "./utils.js";

/* ==========================================
   Java Scrip 
   General - NavBar, resposivo, fotter
   ========================================== */

// ==========================================
// NOMBRE DE LA PÁGINA ACTUAL Y RUTA DE LOS RECURSOS
// SI LA PÁGINA ES INDEX, SE USA './assets', SI NO, SE USA '../assets'
// ==========================================

const nombrePagina = normalizeActualPageName(window.location.href);
const isIndexPage = nombrePagina.includes("index");
const prefixRoute = `${isIndexPage ? './assets' : '../assets'}`

// ==========================================
// PERSONAJES DEL CURSOR
// ==========================================

const personajes = [
    `${prefixRoute}/img/general/Cursor/ajolote.png`,
    `${prefixRoute}/img/general/Cursor/capy.png`,
    `${prefixRoute}/img/general/Cursor/champi.png`,
    `${prefixRoute}/img/general/Cursor/erizo.png`,
    `${prefixRoute}/img/general/Cursor/hongo.png`,
    `${prefixRoute}/img/general/Cursor/celula.jpg`
];

// TODO > Cambiar el personaje al azar al cargar la página
const randIndex = Math.floor(Math.random() * personajes.length);

/* 
    TODO > Cambiar el personaje al azar al cargar la página.
    *       Si la página es index, se usa el primer personaje (ajolote).
    *       Si no, se usa un personaje al azar.
*/
let personajeActual = isIndexPage ? 0 : randIndex;

// ==========================================
// CREAR EL CURSOR CON LA IMAGEN
// ==========================================

const cursorPersonaje = document.createElement("img");

cursorPersonaje.id = "personaje-cursor";

cursorPersonaje.src = personajes[personajeActual];

document.body.appendChild(cursorPersonaje);


// Ocultar el cursor normal
document.body.classList.add("cursor-personaje");


// ==========================================
// HACER QUE EL PERSONAJE SIGA AL MOUSE
// ==========================================

document.addEventListener("mousemove", (event) => {

    cursorPersonaje.style.left = `${event.clientX}px`;

    cursorPersonaje.style.top = `${event.clientY}px`;

});


// ==========================================
// CAMBIAR PERSONAJE AL HACER SCROLL
// *    Si la página es index, se puede cambiar el personaje al hacer scroll. 
// *    Si no, no se puede cambiar.
// ==========================================
let puedeCambiar = isIndexPage ? true : false;

window.addEventListener("scroll", () => {

    if (!puedeCambiar) {
        return;
    }

    personajeActual++;

    if (personajeActual >= personajes.length) {
        personajeActual = 0;
    }

    cursorPersonaje.src = personajes[personajeActual];

    console.log(
        "Ahora aparece:",
        personajes[personajeActual]
    );

    puedeCambiar = false;

    setTimeout(() => {

        puedeCambiar = true;

    }, 6000);

});


// ==========================================
// CONFETI AL HACER CLIC
// ==========================================

document.addEventListener("click", (event) => {

    lanzarConfeti(
        event.clientX,
        event.clientY
    );

});


function lanzarConfeti(x, y) {

    const cantidadConfeti = 20;

    for (let i = 0; i < cantidadConfeti; i++) {

        const confeti = document.createElement("div");

        confeti.classList.add("confeti");

        confeti.style.left = `${x}px`;

        confeti.style.top = `${y}px`;


        // Movimiento horizontal
        const movimientoX =
            (Math.random() - 0.9) * 300;


        // Movimiento vertical
        const movimientoY =
            (Math.random() - 0.9) * 250;


        confeti.style.setProperty(
            "--movimiento-x",
            `${movimientoX}px`
        );

        confeti.style.setProperty(
            "--movimiento-y",
            `${movimientoY}px`
        );


        // Rotación
        const rotacion =
            Math.random() * 380;

        confeti.style.setProperty(
            "--rotacion",
            `${rotacion}deg`
        );


        // Tamaño
        const tamaño =
            Math.random() * 8 + 5;

        confeti.style.width =
            `${tamaño}px`;

        confeti.style.height =
            `${tamaño * 1.5}px`;


        // Colores
        const colores = [
            "#ff4d6d",
            "#ffd166",
            "#06d6a0",
            "#118ab2",
            "#8338ec",
            "#ff8c42"
        ];

        const color =
            colores[
                Math.floor(
                    Math.random() * colores.length
                )
            ];

        confeti.style.backgroundColor = color;

        // Agregar confeti a la página
        document.body.appendChild(confeti);

        // Eliminar después de la animación
        setTimeout(() => {
            confeti.remove();
        }, 1200);

    }
}