// ===== Íconos SVG =====
const ICONO_EDITAR = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>`;

const ICONO_ELIMINAR = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`;

// ===== Datos ficticios =====
const publicacionBase = {
    usuario: "Jairo Cortés",
    titulo: "Las abejas y la polinización",
    descripcion: "Las abejas son polinizadoras clave para muchos de los cultivos que consumimos. Sin ellas, la producción de frutas y verduras bajaría muchísimo.",
    imagen: "https://picsum.photos/id/1080/800/800",
    fecha: "5 oct",
    categoria: "Animalia",
    subcategoria: "Invertebrado",
    datos: {
        Categoría: "Insectos",
        Ubicación: "Ciudad de México",
        Especie: "Apis mellifera",
    },
    comentarios: [
        { usuario: "Ana López", texto: "¡Qué buen dato!" },
        { usuario: "Carlos Ruiz", texto: "No sabía que eran tan importantes." },
    ],
};

const publicaciones = [];

for (let i = 0; i < 100; i++) {
    publicaciones.push({
        ...publicacionBase,
        id: i + 1,
        comentarios: [...publicacionBase.comentarios], // copia propia para cada publicación
    });
}

// ===== Generar filas =====
const lista = document.getElementById("lista-publicaciones");

for (let i = 0; i < publicaciones.length; i++) {
    const publicacion = publicaciones[i];

    const li = document.createElement("li");
    li.classList.add("publicacion-fila", "row", "g-0", "align-items-center");
    li.dataset.id = publicacion.id;

    li.innerHTML = `
        <div class="col-auto pe-3">
            <input class="form-check-input m-0 check-publicacion" type="checkbox" aria-label="Seleccionar publicación" />
        </div>
        <div class="col text-truncate pe-3 fw-semibold fila-titulo">${publicacion.titulo}</div>
        <div class="col-auto d-flex gap-2 pe-3">
            <button type="button" class="btn btn-sm btn-outline-primary btn-editar" title="Modificar" aria-label="Modificar publicación">${ICONO_EDITAR}</button>
            <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar" title="Eliminar" aria-label="Eliminar publicación">${ICONO_ELIMINAR}</button>
        </div>
        <div class="col-auto text-end small text-muted">${publicacion.fecha}</div>
    `;

    lista.appendChild(li);
}

// ===== Contador =====
// ===== Contador =====
function actualizarContador() {
    const total = lista.children.length;
    document.getElementById("contador-publicaciones").textContent =
        total > 0 ? `Se encontraron ${total} publicaciones` : "Sin publicaciones";
}

actualizarContador();

// ===== Modal =====
const modalElemento = document.getElementById("modal-publicacion");
const modal = new bootstrap.Modal(modalElemento);
let publicacionActual = null;

function renderizarComentarios(comentarios) {
    const contenedor = document.getElementById("modal-comentarios");
    contenedor.innerHTML = "";

    comentarios.forEach((comentario) => {
        const p = document.createElement("p");
        const autor = document.createElement("strong");
        autor.textContent = comentario.usuario + ": ";
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

    const datos = document.getElementById("modal-datos");
    datos.innerHTML = "";
    for (const [clave, valor] of Object.entries(publicacion.datos)) {
        const dt = document.createElement("dt");
        dt.textContent = clave;
        const dd = document.createElement("dd");
        dd.textContent = valor;
        datos.append(dt, dd);
    }

    renderizarComentarios(publicacion.comentarios);
    modal.show();
}

// Un solo listener para toda la lista
lista.addEventListener("click", (e) => {
    if (e.target.closest(".check-publicacion")) return; // el checkbox no abre el modal

    const fila = e.target.closest(".publicacion-fila");
    if (!fila) return;

    const id = Number(fila.dataset.id);
    const indice = publicaciones.findIndex((p) => p.id === id);

    if (e.target.closest(".btn-eliminar")) {
        if (!confirm(`¿Eliminar "${publicaciones[indice].titulo}"?`)) return;
        publicaciones.splice(indice, 1);
        fila.remove();
        actualizarContador();
        actualizarSeleccion(); 
        return;
    }

    if (e.target.closest(".btn-editar")) {
        abrirEditor(publicaciones[indice], fila);
        return;
    }

    abrirModal(publicaciones[indice]);
});

// ===== Comentar =====
const inputComentario = document.getElementById("modal-input");

function agregarComentario() {
    const texto = inputComentario.value.trim();
    if (!texto || !publicacionActual) return;

    publicacionActual.comentarios.push({ usuario: "Tú", texto });
    renderizarComentarios(publicacionActual.comentarios);
    inputComentario.value = "";
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
let filaEditando = null;
let nuevaImagen = null;

function mostrarSubcategoria() {
    editarContenedorSub.classList.toggle("d-none", editarCategoria.value !== "Animalia");
}

function abrirEditor(publicacion, fila) {
    publicacionEditando = publicacion;
    filaEditando = fila;
    nuevaImagen = null;

    // Limpiar validaciones y archivo anterior
    formEditar.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    editarArchivo.value = "";

    // Rellenar con los datos actuales
    editarPreview.src = publicacion.imagen;
    editarCategoria.value = publicacion.categoria;
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
    const categoria = editarCategoria.value;
    const subcategoria = editarSubCategoria.value;

    // Validación
    const errores = [
        [editarTitulo, !titulo],
        [editarDescripcion, !descripcion],
        [editarCategoria, !categoria],
        [editarSubCategoria, categoria === "Animalia" && !subcategoria],
    ];

    let valido = true;
    errores.forEach(([campo, hayError]) => {
        campo.classList.toggle("is-invalid", hayError);
        if (hayError) valido = false;
    });
    if (!valido) return;

    // Actualizar el objeto
    publicacionEditando.titulo = titulo;
    publicacionEditando.descripcion = descripcion;
    publicacionEditando.categoria = categoria;
    publicacionEditando.subcategoria = categoria === "Animalia" ? subcategoria : "";
    publicacionEditando.datos = { ...publicacionEditando.datos, Categoría: categoria };
    if (nuevaImagen) publicacionEditando.imagen = nuevaImagen;

    // Actualizar la fila en la lista
    filaEditando.querySelector(".fila-titulo").textContent = titulo;

    modalEditar.hide();
});


// ===== Selección múltiple =====
const checkTodas = document.getElementById("seleccionar-todas");
const btnEliminarSeleccionadas = document.getElementById("btn-eliminar-seleccionadas");

function obtenerSeleccionados() {
    return [...lista.querySelectorAll(".check-publicacion:checked")];
}

function actualizarSeleccion() {
    const todos = lista.querySelectorAll(".check-publicacion");
    const seleccionados = obtenerSeleccionados();

    // Resaltar filas seleccionadas
    todos.forEach((check) => {
        check.closest(".publicacion-fila").classList.toggle("seleccionada", check.checked);
    });

    // Checkbox general: marcado, vacío o a medias
    checkTodas.checked = todos.length > 0 && seleccionados.length === todos.length;
    checkTodas.indeterminate = seleccionados.length > 0 && seleccionados.length < todos.length;

    // Botón de eliminar
    btnEliminarSeleccionadas.classList.toggle("d-none", seleccionados.length === 0);
    btnEliminarSeleccionadas.textContent = `Eliminar seleccionadas (${seleccionados.length})`;
}

// Al marcar o desmarcar un checkbox de fila
lista.addEventListener("change", (e) => {
    if (e.target.classList.contains("check-publicacion")) actualizarSeleccion();
});

// Seleccionar o deseleccionar todas
checkTodas.addEventListener("change", () => {
    lista.querySelectorAll(".check-publicacion").forEach((check) => {
        check.checked = checkTodas.checked;
    });
    actualizarSeleccion();
});

// Eliminar las seleccionadas
btnEliminarSeleccionadas.addEventListener("click", () => {
    const seleccionados = obtenerSeleccionados();
    if (seleccionados.length === 0) return;
    if (!confirm(`¿Eliminar ${seleccionados.length} publicación(es)?`)) return;

    seleccionados.forEach((check) => {
        const fila = check.closest(".publicacion-fila");
        const id = Number(fila.dataset.id);
        const indice = publicaciones.findIndex((p) => p.id === id);
        if (indice !== -1) publicaciones.splice(indice, 1);
        fila.remove();
    });

    actualizarContador();
    actualizarSeleccion();
});