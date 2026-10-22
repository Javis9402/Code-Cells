import { ensureLoggedIn } from "../core/utils.js";
import { obtenerComentariosPorPost, crearComentario } from "../Services/CommentService.js";
import { getPosts } from "../Services/PostService.js";
import { crearReporte } from "../Services/ReportService.js";

// ID de usuario fijo mientras el login no está conectado al backend
const USER_ID_PRUEBA = ensureLoggedIn(localStorage.getItem("usuarioId"));

let publicaciones = [];

// El backend regresa { id, title, photo, description, datetime, userId, userName }; las cards usan otra forma
function adaptarPost(post) {
  return {
    id: post.id,
    userId: post.userId,
    usuario: post.userName,
    titulo: post.title,
    descripcion: post.description,
    imagen: post.photo
      ? `data:image/jpeg;base64,${post.photo}`
      : "../assets/img/logo/Logo contexto.svg",
    fecha_observacion: new Date(post.datetime).toISOString().slice(0, 10),
    // El backend todavía no guarda reino, categoría ni los datos de la observación
    id_reino: null,
    id_categoria: null,
    likes: 0,
    comentarios: [],
  };
}

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

// id y userId vienen del backend; sin id (o si es tuyo) el comentario no se puede reportar
function pintarComentario({ texto, autor, id, userId }) {
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

  if (id && userId !== USER_ID_PRUEBA) {
    const bandera = document.createElement("button");
    bandera.type = "button";
    bandera.className = "ir-reportar-comentario";
    bandera.textContent = "🚩";
    bandera.dataset.comentarioId = id;
    bandera.dataset.autor = autor;
    bandera.title = `Reportar comentario de ${autor}`;
    bandera.setAttribute("aria-label", `Reportar comentario de ${autor}`);
    marcarSiYaSeReporto(bandera, "COMMENT", id);
    comentario.append(bandera);
  }

  lista.appendChild(comentario);
  lista.scrollTop = lista.scrollHeight;
}

function pintarAviso(texto) {
  const lista = document.getElementById("modal-comentarios");
  const aviso = document.createElement("p");
  aviso.className = "sin-comentarios";
  aviso.textContent = texto;
  lista.appendChild(aviso);
}

// Trae los comentarios de la publicación desde el backend
async function cargarComentarios(publicacion, contador) {
  const lista = document.getElementById("modal-comentarios");
  lista.innerHTML = `<p class="sin-comentarios">Cargando comentarios...</p>`;
  try {
    const comentarios = await obtenerComentariosPorPost(publicacion.id);
    if (publicacionActiva !== publicacion) return; // se abrió otra publicación mientras cargaba

    lista.innerHTML = `<p class="sin-comentarios">Aún no hay comentarios. ¡Sé el primero en comentar!</p>`;
    // El backend regresa { id, message, userId, userName }
    publicacion.comentarios = comentarios.map((comentario) => ({
      id: comentario.id,
      userId: comentario.userId,
      texto: comentario.message,
      autor: comentario.userName || "Usuario",
    }));
    publicacion.comentarios.forEach(pintarComentario);
    contador.textContent = publicacion.comentarios.length;
  } catch (error) {
    if (publicacionActiva !== publicacion) return;
    lista.innerHTML = "";
    pintarAviso(`No se pudieron cargar los comentarios: ${error.message}`);
  }
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

  // No se puede reportar una publicación propia
  cerrarReporte();
  const btnReportar = document.getElementById("modal-reportar");
  btnReportar.classList.toggle("d-none", publicacion.userId === USER_ID_PRUEBA);
  marcarSiYaSeReporto(btnReportar, "POST", publicacion.id);

  cargarComentarios(publicacion, contador);

  document.getElementById("modal-input").value = "";

  // bootstrap se carga después de este script, por eso se usa hasta aquí
  bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modal-publicacion"),
  ).show();
}

async function enviarComentario() {
  const input = document.getElementById("modal-input");
  const texto = input.value.trim();
  if (texto === "" || !publicacionActiva) return;

  const publicacion = publicacionActiva;
  const contador = contadorActivo;

  let nuevo;
  try {
    nuevo = await crearComentario(publicacion.id, USER_ID_PRUEBA, { message: texto });
  } catch (error) {
    pintarAviso(`No se pudo enviar el comentario: ${error.message}`);
    return;
  }

  const autor = nuevo?.userName || localStorage.getItem("nombreUsuario") || "Tú";
  // Es tuyo: se guarda con tu userId para que no salga la banderita de reportar
  const comentario = { id: nuevo?.id, userId: USER_ID_PRUEBA, texto, autor };
  publicacion.comentarios.push(comentario);
  if (publicacionActiva === publicacion) pintarComentario(comentario);
  contador.textContent = publicacion.comentarios.length;
  input.value = "";
}

// ---------- REPORTAR ----------
const panelReporte = document.getElementById("reporte-panel");
const tituloReporte = document.getElementById("reporte-titulo");
const motivoReporte = document.getElementById("reporte-motivo");
const btnEnviarReporte = document.getElementById("reporte-enviar");
const avisoReporte = document.getElementById("reporte-aviso");

// Lo que se está reportando: { entityType: "POST" | "COMMENT", entityId, boton }
let objetivoReporte = null;
// Lo ya reportado en esta visita, para no mandar el mismo reporte dos veces
const reportados = new Set();
const claveReporte = (entityType, entityId) => `${entityType}-${entityId}`;

function marcarSiYaSeReporto(boton, entityType, entityId) {
  const yaReportado = reportados.has(claveReporte(entityType, entityId));
  boton.disabled = yaReportado;
  if (entityType === "POST") boton.textContent = yaReportado ? "🚩 Reportado" : "🚩 Reportar";
}

function abrirReporte(entityType, entityId, boton, titulo) {
  objetivoReporte = { entityType, entityId, boton };
  tituloReporte.textContent = titulo;
  motivoReporte.value = "";
  motivoReporte.classList.remove("is-invalid");
  avisoReporte.textContent = "";
  btnEnviarReporte.disabled = false;
  panelReporte.classList.remove("d-none");
  motivoReporte.focus();
}

function cerrarReporte() {
  objetivoReporte = null;
  panelReporte.classList.add("d-none");
}

document.getElementById("modal-reportar").addEventListener("click", (e) => {
  if (!publicacionActiva) return;
  abrirReporte("POST", publicacionActiva.id, e.currentTarget, "Reportar publicación");
});

// Las banderitas de los comentarios se crean al pintar, por eso un solo listener en la lista
document.getElementById("modal-comentarios").addEventListener("click", (e) => {
  const bandera = e.target.closest(".ir-reportar-comentario");
  if (!bandera) return;
  abrirReporte("COMMENT", Number(bandera.dataset.comentarioId), bandera,
    `Reportar comentario de ${bandera.dataset.autor}`);
});

document.getElementById("reporte-cancelar").addEventListener("click", cerrarReporte);

panelReporte.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!objetivoReporte) return;

  const motivo = motivoReporte.value;
  if (!motivo) {
    motivoReporte.classList.add("is-invalid");
    avisoReporte.textContent = "Elige un motivo para el reporte.";
    return;
  }

  const objetivo = objetivoReporte;
  btnEnviarReporte.disabled = true;
  try {
    await crearReporte(USER_ID_PRUEBA, {
      entityType: objetivo.entityType,
      entityId: objetivo.entityId,
      type: motivo,
    });
  } catch (error) {
    avisoReporte.textContent = `No se pudo enviar el reporte: ${error.message}`;
    btnEnviarReporte.disabled = false;
    return;
  }

  reportados.add(claveReporte(objetivo.entityType, objetivo.entityId));
  marcarSiYaSeReporto(objetivo.boton, objetivo.entityType, objetivo.entityId);
  avisoReporte.textContent = "Gracias, revisaremos tu reporte. 🌿";
  // Se cierra solo después de que se alcance a leer el mensaje
  setTimeout(() => {
    if (objetivoReporte === objetivo) cerrarReporte();
  }, 2000);
});

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
                <img>
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
                <strong class="card-usuario"></strong><br>
                <button class="btn btn-link btn-sm p-0 btn-abrir-detalle"
                        type="button">
                    Comentarios (<span class="contador-comentarios">${publicacion.comentarios.length}</span>)
                    · <span class="contador-like">${publicacion.likes}</span> ⭐
                </button>
            </div>
        </article>
    `;
  // Lo que escribió el usuario va con textContent/propiedades, no dentro del HTML
  const imagen = columna.querySelector(".ir-card-media img");
  imagen.src = publicacion.imagen;
  imagen.alt = publicacion.titulo;
  columna.querySelector(".card-usuario").textContent =
    publicacion.usuario ?? "Usuario InstaRama";
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

const filtroReino = document.getElementById("filtro-reino");
const filtroCategoria = document.getElementById("filtro-categoria");
const mensajeFiltro = document.getElementById("mensaje-filtro");

// ANIMACIÓN DE CARGA
// Un girasol sigue al sol de día y duerme de noche mientras pasa el tiempo
function mostrarCargando() {
  const lista = document.getElementById("lista-publicaciones");
  lista.setAttribute("aria-busy", "true");
  lista.innerHTML = "";

  // 12 pétalos repartidos alrededor de la cabeza
  const petalosHTML = Array.from(
    { length: 12 },
    (_, i) =>
      `<ellipse class="ir-girasol-petalo" cx="80" cy="57" rx="5" ry="9" transform="rotate(${i * 30} 80 74)" />`,
  ).join("");

  const columna = document.createElement("div");
  columna.className = "col-12 ir-cargando";
  columna.setAttribute("aria-hidden", "true");
  columna.innerHTML = `
      <svg class="ir-girasol" viewBox="0 0 160 160">
          <circle class="ir-girasol-cielo" cx="80" cy="80" r="78" />
          <g class="ir-girasol-estrellas">
              <circle cx="32" cy="40" r="1.4" />
              <circle cx="126" cy="36" r="1.4" />
              <circle cx="52" cy="22" r="1.2" />
              <circle cx="24" cy="96" r="1.2" />
              <circle cx="136" cy="92" r="1.4" />
          </g>
          <g class="ir-girasol-orbita">
              <g class="ir-girasol-sol">
                  <line x1="80" y1="1" x2="80" y2="4" />
                  <line x1="80" y1="24" x2="80" y2="27" />
                  <line x1="67" y1="14" x2="70" y2="14" />
                  <line x1="90" y1="14" x2="93" y2="14" />
                  <line x1="71" y1="5" x2="73" y2="7" />
                  <line x1="87" y1="21" x2="89" y2="23" />
                  <line x1="71" y1="23" x2="73" y2="21" />
                  <line x1="87" y1="7" x2="89" y2="5" />
                  <circle cx="80" cy="14" r="7" />
              </g>
              <path class="ir-girasol-luna" d="M84 6 A8.5 8.5 0 1 0 84 22 A10 10 0 0 1 84 6 Z" />
          </g>
          <path class="ir-girasol-tallo" d="M80 88 C80 110 78 130 80 152" />
          <path class="ir-girasol-hoja" d="M80 124 C70 124 62 118 60 110 C70 110 78 116 80 124 Z" />
          <path class="ir-girasol-hoja" d="M80 136 C90 136 98 130 100 122 C90 122 82 128 80 136 Z" />
          <g class="ir-girasol-cabeza">
              ${petalosHTML}
              <circle class="ir-girasol-centro" cx="80" cy="74" r="13" />
              <g class="ir-girasol-cara">
                  <g class="ir-girasol-ojos-abiertos">
                      <circle cx="75.5" cy="72" r="1.8" />
                      <circle cx="84.5" cy="72" r="1.8" />
                  </g>
                  <g class="ir-girasol-ojos-cerrados">
                      <path d="M73.5 72 Q75.5 74.5 77.5 72" />
                      <path d="M82.5 72 Q84.5 74.5 86.5 72" />
                  </g>
                  <path d="M76 78 Q80 81.5 84 78" />
              </g>
          </g>
          <g>
              <text class="ir-girasol-zzz" x="97" y="60">z</text>
              <text class="ir-girasol-zzz" x="104" y="52">z</text>
          </g>
      </svg>
      <p class="ir-cargando-texto">Esperando a que salga el sol...</p>
  `;
  lista.appendChild(columna);
}

function ocultarCargando() {
  const lista = document.getElementById("lista-publicaciones");
  lista.removeAttribute("aria-busy");
  lista.querySelector(".ir-cargando")?.remove();
}

// Tiempo mínimo que se muestra la animación: un día completo del girasol (--ir-dia en styles.css)
const DURACION_MINIMA_CARGA = 4000;
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// GENERAR TODAS LAS PUBLICACIONES
async function cargarPublicaciones() {
  const mensajeInicial = mensajeFiltro.textContent;
  mensajeFiltro.textContent = "Cargando publicaciones...";
  mostrarCargando();
  const esperaMinima = esperar(DURACION_MINIMA_CARGA);
  try {
    const posts = await getPosts();
    await esperaMinima;
    publicaciones = posts.map(adaptarPost);
    ocultarCargando();
    mostrarPublicaciones(publicaciones);
    mensajeFiltro.textContent = mensajeInicial;
  } catch (error) {
    ocultarCargando();
    mensajeFiltro.textContent = `No se pudieron cargar las publicaciones: ${error.message}`;
  }
}

cargarPublicaciones();

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

// MENÚ LATERAL EN CELULAR
// El botón ☰ lo inserta render.js después, por eso se escucha en todo el documento
function abrirMenu(abrir) {
  document.body.classList.toggle("ir-menu-abierto", abrir);
  const boton = document.querySelector(".ir-menu-btn");
  boton?.setAttribute("aria-expanded", String(abrir));
  if (abrir) document.querySelector(".ir-menu-cerrar")?.focus();
  else boton?.focus();
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".ir-menu-btn")) abrirMenu(true);
  else if (e.target.closest(".ir-menu-cerrar, .ir-sidebar-fondo")) abrirMenu(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("ir-menu-abierto")) abrirMenu(false);
});
