// ==============================================
// VISOR DE IMÁGENES
// ==============================================
// Busca todas las imágenes que tengan:
// class="imagen-ampliable"
const imagenesAmpliables =
    document.querySelectorAll(".imagen-ampliable");
// Elementos del visor
const visor =
    document.getElementById("visorImagen");
const imagenGrande =
    document.getElementById("imagenGrande");
const tituloImagen =
    document.getElementById("tituloImagen");
const cerrarVisor =
    document.getElementById("cerrarVisor");
// ==============================================
// ABRIR IMAGEN
// ==============================================
imagenesAmpliables.forEach((imagen) => {
    imagen.addEventListener("click", () => {
        // Toma la misma imagen que se seleccionó
        imagenGrande.src = imagen.src;
        // Copia el texto ALT
        imagenGrande.alt = imagen.alt;
        // Muestra el ALT debajo de la imagen
        tituloImagen.textContent = imagen.alt;
        // Abre el visor
        visor.classList.add("activo");
        visor.setAttribute(
            "aria-hidden",
            "false"
        );
        // Evita que se mueva la página del fondo
        document.body.classList.add(
            "visor-abierto"
        );
    });
});
// ==============================================
// CERRAR VISOR
// ==============================================
function cerrarImagen() {
    visor.classList.remove("activo");
    visor.setAttribute(
        "aria-hidden",
        "true"
    );
    document.body.classList.remove(
        "visor-abierto"
    );
}
// Botón X
cerrarVisor.addEventListener(
    "click",
    cerrarImagen
);
// ==============================================
// CERRAR AL HACER CLIC FUERA
// ==============================================
visor.addEventListener(
    "click",
    (evento) => {
        if (evento.target === visor) {
            cerrarImagen();
        }
    }
);
// ==============================================
// CERRAR CON ESC
// ==============================================
document.addEventListener(
    "keydown",
    (evento) => {
        if (
            evento.key === "Escape" &&
            visor.classList.contains("activo")
        ) {
            cerrarImagen();
        }
    }
);