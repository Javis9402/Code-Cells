// ==========================================
// PERSONAJES DEL CURSOR
// ==========================================


const personajes = [
    "./assets/img/logo/assets/duendemorado.jpg",
    "./assets/img/logo/assets/hada.jpg",
    "./assets/img/logo/assets/hongo.jpg",
    "./assets/img/logo/assets/celula.jpg"
];

let personajeActual = 0;


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
// ==========================================
let puedeCambiar = true;

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