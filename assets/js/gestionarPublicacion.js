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
    nodo.querySelector(".hallazgo-comentarios").textContent = textoComentarios(publicacion.comentarios.length);

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

function pedirConfirmacion(titulo, mensaje, accion) {
    tituloModalEliminar.textContent = titulo;
    mensajeEliminar.textContent = mensaje;
    accionEliminar = accion;
    modalEliminar.show();
}

document.getElementById("btnConfirmarEliminar").addEventListener("click", () => {
    if (accionEliminar) accionEliminar();
    accionEliminar = null;
    modalEliminar.hide();
});

function eliminar(ids) {
    ids.forEach((id) => {
        const indice = publicaciones.findIndex((p) => p.id === id);
        if (indice !== -1) publicaciones.splice(indice, 1);
        seleccionados.delete(id);
    });
    renderizar();
}

// ===== Comentar =====
const inputComentario = document.getElementById("modal-input");

function agregarComentario() {
    const texto = inputComentario.value.trim();
    if (!texto || !publicacionActual) return;

    publicacionActual.comentarios.push({ usuario: "Tú", texto });
    renderizarComentarios(publicacionActual.comentarios);
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

// ===== Inicio =====
aplicarVista();
renderizar();
