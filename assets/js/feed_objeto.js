function limpiarPublicaciones() {
  const lista = document.getElementById("lista-publicaciones");
  lista.innerHTML = "";
}

function mostrarPublicaciones(listaPublicaciones) {
  limpiarPublicaciones();
  listaPublicaciones.forEach((publicacion) => {
    addItem(publicacion);
  });
}

// ---------- VENTANA FLOTANTE ----------
let publicacionActiva = null;
let contadorActivo = null;

function pintarComentario(texto, autor) {
  const lista = document.getElementById("modal-comentarios");
  const vacio = lista.querySelector(".sin-comentarios");
  if (vacio) vacio.remove();

  const comentario = document.createElement("div");
  comentario.className = "ir-comentario";
  const quien = document.createElement("strong");
  quien.textContent = autor;
  const contenido = document.createElement("span");
  contenido.textContent = texto;
  comentario.append(quien, contenido);
  lista.appendChild(comentario);
  lista.scrollTop = lista.scrollHeight;
}

function abrirDetalle(publicacion, contador) {
  publicacionActiva = publicacion;
  contadorActivo = contador;

  const img = document.getElementById("modal-imagen");
  img.src = publicacion.imagen;
  img.alt = publicacion.titulo;

  document.getElementById("modal-usuario").textContent =
    publicacion.usuario ?? "Usuario InstaRama";
  document.getElementById("modal-titulo").textContent = publicacion.titulo;
  document.getElementById("modal-descripcion").textContent =
    publicacion.descripcion;

  const datos = [
    ["Nombre común", publicacion.nombre_comun ?? "No identificado"],
    [
      "Nombre científico",
      publicacion.nombre_cientifico ?? "Identificación pendiente",
    ],
    ["Momento", publicacion.momento_observacion],
    ["Lugar", publicacion.lugar_observacion],
    ["Fecha", publicacion.fecha_observacion],
  ];
  const dl = document.getElementById("modal-datos");
  dl.innerHTML = "";
  datos.forEach(([etiqueta, valor]) => {
    const caja = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = etiqueta;
    dd.textContent = valor ?? "—";
    caja.append(dt, dd);
    dl.appendChild(caja);
  });

  const listaComentarios = document.getElementById("modal-comentarios");
  listaComentarios.innerHTML = `<p class="sin-comentarios">Aún no hay comentarios. ¡Sé el primero en comentar!</p>`;
  publicacion.comentarios.forEach((texto) =>
    pintarComentario(texto, "Usuario"),
  );

  document.getElementById("modal-input").value = "";

  // bootstrap se carga después de este script, por eso se usa hasta aquí
  bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modal-publicacion"),
  ).show();
}

function enviarComentario() {
  const input = document.getElementById("modal-input");
  const texto = input.value.trim();
  if (texto === "" || !publicacionActiva) return;

  publicacionActiva.comentarios.push(texto);
  pintarComentario(texto, "Tú");
  contadorActivo.textContent = publicacionActiva.comentarios.length;
  input.value = "";
}

document
  .getElementById("modal-comentar")
  .addEventListener("click", enviarComentario);
document.getElementById("modal-input").addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    enviarComentario();
  }
});

// ---------- CARD ----------
function addItem(publicacion) {
  const lista = document.getElementById("lista-publicaciones");
  const columna = document.createElement("div");
  columna.classList.add("col");

  // Evita errores si la publicación no trae estos campos
  publicacion.likes ??= 0;
  publicacion.comentarios ??= [];

  // El check azul solo aparece si la observación ya tiene nombre científico
  const checkHTML = publicacion.nombre_cientifico
    ? `<span class="ir-icon-btn ir-icon-btn--check"
                 title="Identificación confirmada"
                 role="img"
                 aria-label="Identificación confirmada">✔</span>`
    : "";

  columna.innerHTML = `
        <article class="ir-card shadow-sm">
            <div class="ir-card-media">
                <img src="${publicacion.imagen}" alt="${publicacion.titulo}">
                <div class="ir-card-actions">
                    ${checkHTML}
                    <button class="ir-icon-btn btn-like"
                            type="button"
                            aria-label="Me gusta">
                        ☆
                    </button>
                </div>
            </div>
            <div class="ir-card-footer">
                <strong>${publicacion.usuario ?? "Usuario InstaRama"}</strong><br>
                <button class="btn btn-link btn-sm p-0 btn-abrir-detalle"
                        type="button">
                    Comentarios (<span class="contador-comentarios">${publicacion.comentarios.length}</span>)
                    · <span class="contador-like">${publicacion.likes}</span> ⭐
                </button>
            </div>
        </article>
    `;
  lista.appendChild(columna);

  // ABRIR VENTANA FLOTANTE
  const contadorComentarios = columna.querySelector(".contador-comentarios");
  columna.querySelector(".btn-abrir-detalle").addEventListener("click", () => {
    abrirDetalle(publicacion, contadorComentarios);
  });

  // LIKE (estrella)
  const botonLike = columna.querySelector(".btn-like");
  const contadorLike = columna.querySelector(".contador-like");
  botonLike.addEventListener("click", () => {
    publicacion.likes++;
    contadorLike.textContent = publicacion.likes;
    botonLike.classList.add("is-active");
    botonLike.textContent = "★";
  });
}

// GENERAR TODAS LAS PUBLICACIONES
publicaciones.forEach((publicacion) => {
  addItem(publicacion);
});

const filtroReino = document.getElementById("filtro-reino");
const filtroCategoria = document.getElementById("filtro-categoria");
const mensajeFiltro = document.getElementById("mensaje-filtro");

filtroReino.addEventListener("change", () => {
  const idReino = Number(filtroReino.value);

  filtroCategoria.innerHTML = `<option value="">Todas las categorías</option>`;

  if (!idReino) {
    filtroCategoria.disabled = true;
    mostrarPublicaciones(publicaciones); // Muestra de nuevo las publicaciones.
    mensajeFiltro.textContent =
      "Selecciona un reino para descubrir sus publicaciones.";
    return;
  }

  const reinoSeleccionado = reinos.find((reino) => reino.id_reino === idReino);

  reinoSeleccionado.categorias.forEach((categoria) => {
    const opcion = document.createElement("option");
    opcion.value = categoria.id_categoria;
    opcion.textContent = categoria.grupo
      ? `${categoria.grupo} - ${categoria.nombre}`
      : categoria.nombre;
    filtroCategoria.appendChild(opcion);
  });

  filtroCategoria.disabled = false;

  const publicacionesFiltradas = publicaciones.filter(
    (publicacion) => publicacion.id_reino === idReino,
  );

  mensajeFiltro.textContent = `Mostrando publicaciones de ${reinoSeleccionado.nombre}`;

  mostrarPublicaciones(publicacionesFiltradas);
});

filtroCategoria.addEventListener("change", () => {
  const idReino = Number(filtroReino.value);
  const idCategoria = Number(filtroCategoria.value);

  let publicacionesFiltradas;

  if (!idCategoria) {
    publicacionesFiltradas = publicaciones.filter(
      (publicacion) => publicacion.id_reino === idReino,
    );
  } else {
    publicacionesFiltradas = publicaciones.filter(
      (publicacion) => publicacion.id_categoria === idCategoria,
    );
  }

  mostrarPublicaciones(publicacionesFiltradas);
});
