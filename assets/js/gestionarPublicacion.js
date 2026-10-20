// ===== Reinos =====
const REINOS = {
    Monera: "🧫",
    Protista: "🦠",
    Fungi: "🍄",
    Plantae: "🌿",
    Animalia: "🐾",
    "Sin Clasificar": "❔",
};

const REINOS_BIOLOGICOS = ["Monera", "Protista", "Fungi", "Plantae", "Animalia"];

function nombreReino(reino) {
    return reino === "Sin Clasificar" ? "Sin clasificar" : reino;
}

// ===== Datos ficticios =====
const IMG = "../assets/img/objetos/";
const usuario = localStorage.getItem("usuarioActivo") || "Explorador_Botánico";

const publicaciones = [
    {
        titulo: "Hongos copa sobre un tronco",
        descripcion: "Encontré varios hongos en forma de copa creciendo sobre un tronco caído y húmedo. Tenían un color rosado muy intenso.",
        imagen: IMG + "Hongo.jpg",
        fecha: "2026-10-14",
        reino: "Fungi",
        grupo: "Hongos macroscópicos",
        especie: "Cookeina sp.",
        ubicacion: "Los Tuxtlas, Veracruz",
    },
    {
        titulo: "Gorrión acicalándose entre flores",
        descripcion: "Un pajarito pequeño se estaba acomodando las plumas sobre unas flores amarillas. ¿Alguien sabe qué especie es?",
        imagen: IMG + "ave.jpg",
        fecha: "2026-10-11",
        reino: "Animalia",
        subcategoria: "Vertebrado",
        grupo: "Aves",
        especie: "",
        ubicacion: "Ajusco, Ciudad de México",
    },
    {
        titulo: "Ajolote en el canal",
        descripcion: "Vimos un ajolote cerca de la orilla durante un recorrido por los canales. Es una especie endémica y en peligro.",
        imagen: IMG + "ajolote.jpg",
        fecha: "2026-10-08",
        reino: "Animalia",
        subcategoria: "Vertebrado",
        grupo: "Anfibios",
        especie: "Ambystoma mexicanum",
        ubicacion: "Xochimilco, Ciudad de México",
    },
    {
        titulo: "Sargazo flotando en el mar",
        descripcion: "Al bucear vimos grandes masas de sargazo. Tiene unas bolitas que le ayudan a flotar.",
        imagen: IMG + "protista.jpg",
        fecha: "2026-10-03",
        reino: "Protista",
        grupo: "Algas",
        especie: "Sargassum sp.",
        ubicacion: "Mahahual, Quintana Roo",
    },
    {
        titulo: "Pochote con espinas en el tronco",
        descripcion: "Árbol con el tronco lleno de espinas cónicas. En temporada seca tira las hojas.",
        imagen: IMG + "pochote.jpg",
        fecha: "2026-09-27",
        reino: "Plantae",
        grupo: "Angiospermas",
        especie: "Ceiba aesculifolia",
        ubicacion: "Tepoztlán, Morelos",
    },
    {
        titulo: "Bacterias vistas al microscopio",
        descripcion: "En la práctica de laboratorio observamos una muestra de bacterias agrupadas como racimos.",
        imagen: IMG + "monera.jpg",
        fecha: "2026-09-20",
        reino: "Monera",
        grupo: "Bacterias",
        especie: "Staphylococcus aureus",
        ubicacion: "Laboratorio escolar",
    },
    {
        titulo: "Helechos en el bosque",
        descripcion: "Una zona sombreada del bosque estaba cubierta de helechos muy grandes.",
        imagen: IMG + "plantae.jpg",
        fecha: "2026-09-14",
        reino: "Plantae",
        grupo: "Helechos / Pteridófitas",
        especie: "",
        ubicacion: "Desierto de los Leones, CDMX",
    },
    {
        titulo: "Insecto visitando una flor",
        descripcion: "Lo vi alimentándose en el jardín. Los polinizadores son clave para muchos cultivos.",
        imagen: IMG + "insectos.jpg",
        fecha: "2026-09-05",
        reino: "Animalia",
        subcategoria: "Invertebrado",
        grupo: "Insectos",
        especie: "",
        ubicacion: "Coyoacán, Ciudad de México",
    },
    {
        titulo: "Murciélago al atardecer",
        descripcion: "Salió de una cueva justo cuando empezaba a oscurecer.",
        imagen: IMG + "murcielago.jpg",
        fecha: "2026-08-29",
        reino: "Animalia",
        subcategoria: "Vertebrado",
        grupo: "Mamíferos",
        especie: "",
        ubicacion: "Grutas de Cacahuamilpa, Guerrero",
    },
    {
        titulo: "Pino con piñas",
        descripcion: "Pino alto con muchas piñas abiertas en las ramas.",
        imagen: IMG + "pinus.jpg",
        fecha: "2026-08-17",
        reino: "Plantae",
        grupo: "Gimnospermas",
        especie: "Pinus sp.",
        ubicacion: "Nevado de Toluca, Estado de México",
    },
].map((publicacion, i) => ({
    id: i + 1,
    usuario,
    subcategoria: "",
    comentarios: i % 3 === 2 ? [] : [
        { usuario: "Ana López", texto: "¡Qué buen hallazgo!" },
        { usuario: "Carlos Ruiz", texto: "¿Cuánto medía aproximadamente?" },
    ].slice(0, (i % 3) + 1),
    ...publicacion,
}));

// ===== Utilidades =====
const formatoFecha = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short", year: "numeric" });

function formatearFecha(iso) {
    return formatoFecha.format(new Date(iso + "T00:00:00"));
}

function textoComentarios(total) {
    return total === 1 ? "1 comentario" : `${total} comentarios`;
}

function buscarPublicacion(id) {
    return publicaciones.find((p) => p.id === id);
}

function leerPreferencia(clave, porDefecto) {
    try {
        return localStorage.getItem(clave) || porDefecto;
    } catch {
        return porDefecto;
    }
}

function guardarPreferencia(clave, valor) {
    try {
        localStorage.setItem(clave, valor);
    } catch {
        // Sin almacenamiento: la vista solo dura esta visita
    }
}

// ===== Estado de la vista =====
const lista = document.getElementById("lista-publicaciones");
const plantilla = document.getElementById("plantilla-hallazgo");
const filtrosReino = document.getElementById("filtros-reino");
const buscador = document.getElementById("buscar-hallazgo");
const estadoVacio = document.getElementById("estado-vacio");
const seleccionados = new Set();

let filtroActual = "Todos";
let vistaActual = leerPreferencia("vistaHallazgos", "cuadricula");

function publicacionesVisibles() {
    const texto = buscador.value.trim().toLowerCase();

    return publicaciones
        .filter((p) => filtroActual === "Todos" || p.reino === filtroActual)
        .filter((p) => !texto || [p.titulo, p.especie, p.grupo, p.ubicacion]
            .some((campo) => (campo || "").toLowerCase().includes(texto)))
        .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

// ===== Resumen =====
function actualizarResumen() {
    const reinosExplorados = new Set(
        publicaciones.map((p) => p.reino).filter((r) => REINOS_BIOLOGICOS.includes(r))
    );
    const comentarios = publicaciones.reduce((total, p) => total + p.comentarios.length, 0);

    document.getElementById("resumen-hallazgos").textContent = publicaciones.length;
    document.getElementById("resumen-reinos").textContent = reinosExplorados.size;
    document.getElementById("resumen-por-identificar").textContent = publicaciones.filter((p) => !p.especie).length;
    document.getElementById("resumen-comentarios").textContent = comentarios;
}

// ===== Filtros por reino =====
function renderizarFiltros() {
    filtrosReino.innerHTML = "";

    ["Todos", ...Object.keys(REINOS)].forEach((reino) => {
        const total = reino === "Todos"
            ? publicaciones.length
            : publicaciones.filter((p) => p.reino === reino).length;

        // "Sin clasificar" solo aparece si hay hallazgos así
        if (reino === "Sin Clasificar" && total === 0) return;

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "filtro-reino";
        boton.dataset.reino = reino;
        boton.setAttribute("aria-pressed", String(reino === filtroActual));
        boton.textContent = reino === "Todos" ? "Todos" : `${REINOS[reino]} ${nombreReino(reino)}`;

        const contador = document.createElement("span");
        contador.className = "filtro-contador";
        contador.textContent = total;
        boton.appendChild(contador);

        filtrosReino.appendChild(boton);
    });
}

filtrosReino.addEventListener("click", (e) => {
    const boton = e.target.closest(".filtro-reino");
    if (!boton) return;
    filtroActual = boton.dataset.reino;
    renderizar();
});

buscador.addEventListener("input", () => renderizar());

// ===== Vista cuadrícula / lista =====
const botonesVista = document.querySelectorAll("[data-vista]");

function aplicarVista() {
    lista.classList.toggle("vista-cuadricula", vistaActual === "cuadricula");
    lista.classList.toggle("vista-lista", vistaActual === "lista");
    botonesVista.forEach((boton) => {
        const activa = boton.dataset.vista === vistaActual;
        boton.classList.toggle("active", activa);
        boton.setAttribute("aria-pressed", String(activa));
    });
}

botonesVista.forEach((boton) => {
    boton.addEventListener("click", () => {
        vistaActual = boton.dataset.vista;
        guardarPreferencia("vistaHallazgos", vistaActual);
        aplicarVista();
    });
});

// ===== Generar tarjetas =====
function crearTarjeta(publicacion) {
    const nodo = plantilla.content.firstElementChild.cloneNode(true);
    nodo.dataset.id = publicacion.id;

    const imagen = nodo.querySelector(".hallazgo-imagen");
    imagen.src = publicacion.imagen;
    imagen.alt = publicacion.titulo;

    nodo.querySelector(".hallazgo-reino").textContent =
        `${REINOS[publicacion.reino] || ""} ${nombreReino(publicacion.reino)}`;

    const check = nodo.querySelector(".check-publicacion");
    check.checked = seleccionados.has(publicacion.id);
    check.setAttribute("aria-label", `Seleccionar «${publicacion.titulo}»`);
    nodo.classList.toggle("seleccionada", check.checked);

    nodo.querySelector(".hallazgo-titulo").textContent = publicacion.titulo;

    // Especie identificada en cursiva o etiqueta "Por identificar"
    const especie = nodo.querySelector(".hallazgo-especie");
    if (publicacion.especie) {
        const nombre = document.createElement("em");
        nombre.textContent = publicacion.especie;
        especie.append(nombre);
    } else {
        const etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta-identificar";
        etiqueta.textContent = "Por identificar";
        especie.append(etiqueta);
    }
    if (publicacion.grupo) especie.append(` · ${publicacion.grupo}`);

    nodo.querySelector(".hallazgo-lugar").textContent = publicacion.ubicacion || "Sin ubicación";
    nodo.querySelector(".hallazgo-fecha").textContent = formatearFecha(publicacion.fecha);
    // Solo el número, para que el texto no crezca y la tarjeta conserve su tamaño
    const comentarios = nodo.querySelector(".hallazgo-comentarios");
    comentarios.textContent = publicacion.comentarios.length;
    comentarios.parentElement.title = textoComentarios(publicacion.comentarios.length);
    comentarios.parentElement.setAttribute("aria-label", textoComentarios(publicacion.comentarios.length));

    nodo.querySelector(".btn-editar").setAttribute("aria-label", `Editar «${publicacion.titulo}»`);
    nodo.querySelector(".btn-eliminar").setAttribute("aria-label", `Eliminar «${publicacion.titulo}»`);

    return nodo;
}

function renderizar() {
    const visibles = publicacionesVisibles();

    // Solo se puede tener seleccionado lo que se está viendo
    const idsVisibles = new Set(visibles.map((p) => p.id));
    seleccionados.forEach((id) => {
        if (!idsVisibles.has(id)) seleccionados.delete(id);
    });

    lista.replaceChildren(...visibles.map(crearTarjeta));

    // Estado vacío según el motivo
    const sinResultados = visibles.length === 0;
    estadoVacio.classList.toggle("d-none", !sinResultados);
    if (sinResultados) {
        const hayBusqueda = buscador.value.trim() !== "";
        document.getElementById("estado-vacio-titulo").textContent = publicaciones.length === 0
            ? "Tu cuaderno de campo está vacío"
            : hayBusqueda
                ? "No encontramos hallazgos con esa búsqueda"
                : `Aún no tienes hallazgos de ${nombreReino(filtroActual)}`;
        document.getElementById("estado-vacio-texto").textContent = hayBusqueda
            ? "Prueba con otro nombre, especie o lugar."
            : "Sal a observar y comparte lo que encuentres.";
    }

    actualizarResumen();
    renderizarFiltros();
    actualizarContador(visibles.length);
    actualizarSeleccion();
}

// ===== Contador =====
function actualizarContador(visibles) {
    const total = publicaciones.length;
    document.getElementById("contador-publicaciones").textContent = visibles === total
        ? `${total} ${total === 1 ? "hallazgo" : "hallazgos"}`
        : `Mostrando ${visibles} de ${total}`;
}

// ===== Modal de detalle =====
const modalElemento = document.getElementById("modal-publicacion");
const modal = new bootstrap.Modal(modalElemento);
let publicacionActual = null;

function renderizarComentarios(comentarios) {
    const contenedor = document.getElementById("modal-comentarios");
    contenedor.innerHTML = "";

    if (comentarios.length === 0) {
        const vacio = document.createElement("p");
        vacio.className = "sin-comentarios";
        vacio.textContent = "Todavía nadie comenta este hallazgo.";
        contenedor.appendChild(vacio);
        return;
    }

    comentarios.forEach((comentario) => {
        const p = document.createElement("p");
        p.classList.add("ir-comentario");
        const autor = document.createElement("strong");
        autor.textContent = comentario.usuario;
        p.appendChild(autor);
        p.append(comentario.texto); // texto plano, no HTML
        contenedor.appendChild(p);
    });
}

function abrirModal(publicacion) {
    publicacionActual = publicacion;

    document.getElementById("modal-imagen").src = publicacion.imagen;
    document.getElementById("modal-imagen").alt = publicacion.titulo;
    document.getElementById("modal-usuario").textContent = publicacion.usuario;
    document.getElementById("modal-titulo").textContent = publicacion.titulo;
    document.getElementById("modal-descripcion").textContent = publicacion.descripcion;

    const datos = {
        Reino: `${REINOS[publicacion.reino] || ""} ${nombreReino(publicacion.reino)}`,
        Grupo: publicacion.grupo || publicacion.subcategoria || "—",
        Especie: publicacion.especie || "Por identificar",
        Ubicación: publicacion.ubicacion || "Sin ubicación",
        Fecha: formatearFecha(publicacion.fecha),
    };

    const lista = document.getElementById("modal-datos");
    lista.innerHTML = "";
    for (const [clave, valor] of Object.entries(datos)) {
        const grupo = document.createElement("div");
        const dt = document.createElement("dt");
        dt.textContent = clave;
        const dd = document.createElement("dd");
        dd.textContent = valor;
        grupo.append(dt, dd);
        lista.appendChild(grupo);
    }

    renderizarComentarios(publicacion.comentarios);
    modal.show();
}

// Un solo listener para todas las tarjetas
lista.addEventListener("click", (e) => {
    if (e.target.closest(".check-publicacion")) return; // el checkbox no abre el modal

    const tarjeta = e.target.closest(".hallazgo");
    if (!tarjeta) return;

    const publicacion = buscarPublicacion(Number(tarjeta.dataset.id));
    if (!publicacion) return;

    if (e.target.closest(".btn-eliminar")) {
        pedirConfirmacion(
            "¿Eliminar hallazgo?",
            `Se eliminará "${publicacion.titulo}". Esta acción no se puede deshacer.`,
            () => eliminar([publicacion.id])
        );
        return;
    }

    if (e.target.closest(".btn-editar")) {
        abrirEditor(publicacion);
        return;
    }

    abrirModal(publicacion);
});

// ===== Confirmación para eliminar (en lugar de confirm) =====
const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
const tituloModalEliminar = document.getElementById("tituloModalEliminar");
const mensajeEliminar = document.getElementById("mensajeEliminar");
let accionEliminar = null;

// ===== Personaje del modal de eliminar =====
const personajeEliminar = document.getElementById("personajeEliminar");
const personajeDialogo = document.getElementById("personajeDialogo");
const DIALOGOS = {
    normal: "¿Seguro?",
    feliz: "¡Gracias por conservarlo!",
    triste: "¡Nooo, era un buen hallazgo!",
    adios: "Adiós…",
};

function cambiarAnimo(animo) {
    // Ya confirmado: no vuelve a cambiar hasta que se cierre el modal
    if (personajeEliminar.dataset.animo === "adios" && animo !== "normal") return;
    personajeEliminar.dataset.animo = animo;
    personajeDialogo.textContent = DIALOGOS[animo];
}

function reaccionarA(boton, animo) {
    const activar = () => cambiarAnimo(animo);
    const regresar = () => {
        if (personajeEliminar.dataset.animo === animo) cambiarAnimo("normal");
    };
    boton.addEventListener("mouseenter", activar);
    boton.addEventListener("focus", activar);
    boton.addEventListener("mouseleave", regresar);
    boton.addEventListener("blur", regresar);
}

reaccionarA(document.querySelector("#modalEliminar .btn-cancelar-eliminar"), "feliz");
reaccionarA(document.getElementById("btnConfirmarEliminar"), "triste");

function pedirConfirmacion(titulo, mensaje, accion) {
    tituloModalEliminar.textContent = titulo;
    mensajeEliminar.textContent = mensaje;
    accionEliminar = accion;
    personajeEliminar.dataset.animo = "adios"; // permite el reinicio
    cambiarAnimo("normal");
    modalEliminar.show();
}

const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar");
const sinAnimaciones = window.matchMedia("(prefers-reduced-motion: reduce)");
let eliminacionConfirmada = false;

// Al confirmar: el botón hace su animación, se cierra el modal y luego se elimina
btnConfirmarEliminar.addEventListener("click", () => {
    if (eliminacionConfirmada) return;
    eliminacionConfirmada = true;
    btnConfirmarEliminar.classList.add("confirmando");
    btnConfirmarEliminar.disabled = true;
    cambiarAnimo("adios");
    setTimeout(() => modalEliminar.hide(), sinAnimaciones.matches ? 0 : 350);
});

// Se elimina cuando el modal ya se cerró, para que se vea salir a las tarjetas
document.getElementById("modalEliminar").addEventListener("hidden.bs.modal", () => {
    if (eliminacionConfirmada && accionEliminar) accionEliminar();
    eliminacionConfirmada = false;
    accionEliminar = null;
    btnConfirmarEliminar.classList.remove("confirmando");
    btnConfirmarEliminar.disabled = false;
});

function eliminar(ids) {
    const quitar = () => {
        ids.forEach((id) => {
            const indice = publicaciones.findIndex((p) => p.id === id);
            if (indice !== -1) publicaciones.splice(indice, 1);
            seleccionados.delete(id);
        });
        renderizar();
    };

    const tarjetas = ids
        .map((id) => lista.querySelector(`.hallazgo[data-id="${id}"]`))
        .filter(Boolean);

    if (sinAnimaciones.matches || tarjetas.length === 0) {
        quitar();
        return;
    }

    // Las tarjetas se secan y caen como hojas antes de quitarlas
    const animaciones = tarjetas.map((tarjeta, i) => {
        tarjeta.classList.add("saliendo");
        soltarHojas(tarjeta);
        return caerTarjeta(tarjeta, i * 90).finished;
    });
    Promise.all(animaciones).then(quitar, quitar);
}

// ===== Movimiento orgánico =====
const azar = (min, max) => min + Math.random() * (max - min);

// La tarjeta se tambalea como si se desprendiera y luego cae meciéndose
function caerTarjeta(tarjeta, retraso) {
    const lado = Math.random() < 0.5 ? -1 : 1;
    const duracion = azar(1250, 1450);
    const pasos = 48;
    const cuadros = [];

    for (let i = 0; i <= pasos; i++) {
        const t = i / pasos;

        // 0–30%: se desprende con un tambaleo que se apaga
        const desprender = Math.min(t / 0.3, 1);
        const tambaleo = Math.sin(desprender * Math.PI * 2.5) * (1 - desprender) * 4 * lado;

        // 30–100%: cae acelerando, con vaivén que se va calmando
        const c = Math.max((t - 0.3) / 0.7, 0);
        const y = c * c * 120;
        const vaiven = Math.sin(c * Math.PI * 1.6) * 16 * lado * (1 - c * 0.4);
        const giro = tambaleo + Math.cos(c * Math.PI * 1.6) * 6 * lado * c + c * 10 * lado;
        const escala = 1 - c * 0.18;

        cuadros.push({
            transform: `translate(${vaiven.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${giro.toFixed(2)}deg) scale(${escala.toFixed(3)})`,
            opacity: t < 0.55 ? 1 : Math.max(1 - (t - 0.55) / 0.45, 0),
        });
    }

    tarjeta.style.transformOrigin = `${lado < 0 ? 30 : 70}% 10%`;
    return tarjeta.animate(cuadros, { duration: duracion, delay: retraso, easing: "linear", fill: "forwards" });
}

// Una hoja cae como en la vida real: péndulo, se voltea y la empuja el viento
function caerHoja(hoja) {
    const duracion = azar(1900, 2800);
    const caida = azar(160, 300);
    const viento = azar(-60, 60);
    const amplitud = azar(18, 38);
    const vaivenes = azar(1.6, 2.8);
    const fase = azar(0, Math.PI * 2);
    const volteos = azar(1.5, 3.5);
    const giroBase = azar(-40, 40);
    const brinco = azar(8, 22);
    const pasos = 60;
    const cuadros = [];

    for (let i = 0; i <= pasos; i++) {
        const t = i / pasos;
        const angulo = t * Math.PI * 2 * vaivenes + fase;

        // Pequeño brinco al soltarse, luego cae casi a velocidad constante
        const salto = -brinco * Math.sin(Math.min(t / 0.18, 1) * Math.PI);
        const y = caida * (0.25 * t + 0.75 * t * t) + salto;

        // Vaivén de péndulo que crece un poco mientras cae
        const x = viento * t + Math.sin(angulo) * amplitud * (0.5 + 0.5 * t);

        // Se inclina hacia donde se mueve, y se voltea (cara y revés)
        const inclinacion = giroBase + Math.cos(angulo) * 35;
        const volteo = Math.cos(t * Math.PI * 2 * volteos + fase);
        const escalaX = Math.sign(volteo || 1) * Math.max(Math.abs(volteo), 0.2);

        let opacidad = 1;
        if (t < 0.08) opacidad = t / 0.08;
        else if (t > 0.7) opacidad = 1 - (t - 0.7) / 0.3;

        cuadros.push({
            transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${inclinacion.toFixed(2)}deg) scaleX(${escalaX.toFixed(3)})`,
            opacity: opacidad.toFixed(3),
        });
    }

    return hoja.animate(cuadros, { duration: duracion, delay: azar(0, 600), easing: "linear", fill: "both" });
}

// ===== Hojas que caen de una tarjeta eliminada =====
const HOJA_SVG = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C5 6 3 14 12 22C21 14 19 6 12 2Z" fill="currentColor"/>
    <path d="M12 5V20" stroke="var(--hoja-vena)" stroke-width="1.2" stroke-linecap="round"/>
</svg>`;

function soltarHojas(tarjeta) {
    const caja = tarjeta.getBoundingClientRect();
    const capa = document.createElement("div");
    capa.className = "capa-hojas";
    capa.setAttribute("aria-hidden", "true");
    document.body.appendChild(capa);

    const cantidad = 12;
    const caidas = [];
    for (let i = 0; i < cantidad; i++) {
        const hoja = document.createElement("span");
        hoja.className = `hoja-caida hoja-tono-${i % 3}`;
        hoja.innerHTML = HOJA_SVG;

        // Salen de distintos puntos de la tarjeta, sobre todo de la foto
        hoja.style.left = `${caja.left + azar(0.05, 0.95) * caja.width}px`;
        hoja.style.top = `${caja.top + azar(0.05, 0.6) * caja.height}px`;
        const tam = azar(16, 30);
        hoja.style.width = `${tam}px`;
        hoja.style.height = `${tam}px`;

        capa.appendChild(hoja);
        caidas.push(caerHoja(hoja).finished);
    }

    Promise.allSettled(caidas).then(() => capa.remove());
}

// ===== Comentar =====
const inputComentario = document.getElementById("modal-input");

function agregarComentario() {
    const texto = inputComentario.value.trim();
    if (!texto || !publicacionActual) return;

    publicacionActual.comentarios.push({ usuario: "Tú", texto });
    renderizarComentarios(publicacionActual.comentarios);

    // Bajar hasta el comentario nuevo dentro de la caja de comentarios
    const contenedor = document.getElementById("modal-comentarios");
    contenedor.scrollTop = contenedor.scrollHeight;
    inputComentario.value = "";
    renderizar();
}

document.getElementById("modal-comentar").addEventListener("click", agregarComentario);
inputComentario.addEventListener("keydown", (e) => {
    if (e.key === "Enter") agregarComentario();
});


// TODO ===== Editar publicación =====
const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
const formEditar = document.getElementById("formularioEditar");
const editarArchivo = document.getElementById("editarArchivo");
const editarPreview = document.getElementById("editarPreview");
const editarCategoria = document.getElementById("editarCategoria");
const editarSubCategoria = document.getElementById("editarSubCategoria");
const editarContenedorSub = document.getElementById("editarContenedorSub");
const editarTitulo = document.getElementById("editarTitulo");
const editarDescripcion = document.getElementById("editarDescripcion");

let publicacionEditando = null;
let nuevaImagen = null;

function mostrarSubcategoria() {
    editarContenedorSub.classList.toggle("d-none", editarCategoria.value !== "Animalia");
}

function abrirEditor(publicacion) {
    publicacionEditando = publicacion;
    nuevaImagen = null;

    // Limpiar validaciones y archivo anterior
    formEditar.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    editarArchivo.value = "";

    // Rellenar con los datos actuales
    editarPreview.src = publicacion.imagen;
    editarCategoria.value = publicacion.reino;
    editarSubCategoria.value = publicacion.subcategoria || "";
    editarTitulo.value = publicacion.titulo;
    editarDescripcion.value = publicacion.descripcion;
    mostrarSubcategoria();

    modalEditar.show();
}

// Vista previa al elegir nueva imagen
editarArchivo.addEventListener("change", () => {
    const archivo = editarArchivo.files[0];
    if (!archivo) return;
    nuevaImagen = URL.createObjectURL(archivo);
    editarPreview.src = nuevaImagen;
});

editarCategoria.addEventListener("change", mostrarSubcategoria);

// Guardar cambios
formEditar.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = editarTitulo.value.trim();
    const descripcion = editarDescripcion.value.trim();
    const reino = editarCategoria.value;
    const subcategoria = editarSubCategoria.value;

    // Validación
    const errores = [
        [editarTitulo, !titulo],
        [editarDescripcion, !descripcion],
        [editarCategoria, !reino],
        [editarSubCategoria, reino === "Animalia" && !subcategoria],
    ];

    let valido = true;
    errores.forEach(([campo, hayError]) => {
        campo.classList.toggle("is-invalid", hayError);
        if (hayError) valido = false;
    });
    if (!valido) return;

    // Si cambia el reino o la subcategoría, el grupo anterior ya no aplica
    const nuevaSub = reino === "Animalia" ? subcategoria : "";
    if (reino !== publicacionEditando.reino || nuevaSub !== publicacionEditando.subcategoria) {
        publicacionEditando.grupo = "";
    }

    publicacionEditando.titulo = titulo;
    publicacionEditando.descripcion = descripcion;
    publicacionEditando.reino = reino;
    publicacionEditando.subcategoria = nuevaSub;
    if (nuevaImagen) publicacionEditando.imagen = nuevaImagen;

    renderizar();
    modalEditar.hide();
});


// ===== Selección múltiple =====
const checkTodas = document.getElementById("seleccionar-todas");
const btnEliminarSeleccionadas = document.getElementById("btn-eliminar-seleccionadas");

function actualizarSeleccion() {
    const checks = [...lista.querySelectorAll(".check-publicacion")];
    const marcados = checks.filter((check) => check.checked);

    // Resaltar tarjetas seleccionadas
    checks.forEach((check) => {
        check.closest(".hallazgo").classList.toggle("seleccionada", check.checked);
    });

    // Checkbox general: marcado, vacío o a medias (sobre lo que se ve)
    checkTodas.checked = checks.length > 0 && marcados.length === checks.length;
    checkTodas.indeterminate = marcados.length > 0 && marcados.length < checks.length;
    checkTodas.disabled = checks.length === 0;

    // Botón de eliminar
    btnEliminarSeleccionadas.classList.toggle("d-none", seleccionados.size === 0);
    btnEliminarSeleccionadas.textContent = `Eliminar seleccionadas (${seleccionados.size})`;
}

// Al marcar o desmarcar un hallazgo
lista.addEventListener("change", (e) => {
    if (!e.target.classList.contains("check-publicacion")) return;
    const id = Number(e.target.closest(".hallazgo").dataset.id);
    if (e.target.checked) seleccionados.add(id);
    else seleccionados.delete(id);
    actualizarSeleccion();
});

// Seleccionar o deseleccionar todos los visibles
checkTodas.addEventListener("change", () => {
    lista.querySelectorAll(".check-publicacion").forEach((check) => {
        check.checked = checkTodas.checked;
        const id = Number(check.closest(".hallazgo").dataset.id);
        if (check.checked) seleccionados.add(id);
        else seleccionados.delete(id);
    });
    actualizarSeleccion();
});

// Eliminar las seleccionadas
btnEliminarSeleccionadas.addEventListener("click", () => {
    const total = seleccionados.size;
    if (total === 0) return;

    pedirConfirmacion(
        "¿Eliminar hallazgos?",
        `Se eliminarán ${total} ${total === 1 ? "hallazgo" : "hallazgos"}. Esta acción no se puede deshacer.`,
        () => eliminar([...seleccionados])
    );
});

// ===== Modo oscuro =====
// El tema inicial lo aplica el script del <head>; aquí solo se cambia y se guarda
const btnTema = document.getElementById("btn-tema");

function temaActual() {
    return document.documentElement.dataset.tema === "oscuro" ? "oscuro" : "claro";
}

function pintarBotonTema() {
    const oscuro = temaActual() === "oscuro";
    btnTema.setAttribute("aria-pressed", String(oscuro));
    btnTema.querySelector("i").className = `bi ${oscuro ? "bi-sun-fill" : "bi-moon-stars-fill"} me-2`;
    btnTema.querySelector("span").textContent = oscuro ? "Modo claro" : "Modo oscuro";
    const accion = oscuro ? "Activar modo claro" : "Activar modo oscuro";
    btnTema.setAttribute("aria-label", accion);
    btnTema.title = accion;
}

btnTema.addEventListener("click", () => {
    const nuevo = temaActual() === "oscuro" ? "claro" : "oscuro";
    if (nuevo === "oscuro") document.documentElement.dataset.tema = "oscuro";
    else delete document.documentElement.dataset.tema;
    guardarPreferencia("temaInstaRama", nuevo);
    pintarBotonTema();
});

pintarBotonTema();

// ===== Inicio =====
aplicarVista();
renderizar();
