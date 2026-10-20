/**
 * @file Servicio para consumir los endpoints de reportes del backend de InstaRama.
 * Un reporte señala una publicación o un comentario inapropiado.
 * @module ReportService
 */

/**
 * Reporte tal como lo regresa el backend.
 * @typedef {Object} Reporte
 * @property {number} id - ID del reporte.
 * @property {"POST"|"COMMENT"} entityType - Qué se reportó.
 * @property {number} entityId - ID de la publicación o del comentario reportado.
 * @property {string} type - Motivo del reporte.
 * @property {string} referenceLink - Enlace a lo reportado (lo arma el backend).
 * @property {string} date - Fecha del reporte (la pone el backend).
 * @property {string} status - Estado del reporte; empieza en "PENDING".
 */

/**
 * Reporte que se manda al backend para crearlo.
 * @typedef {Object} ReporteRequest
 * @property {"POST"|"COMMENT"} entityType - Qué se reporta.
 * @property {number} entityId - ID de la publicación o del comentario.
 * @property {string} type - Motivo del reporte (no puede ir vacío).
 */

/**
 * Cambios que se mandan al backend para actualizar un reporte.
 * Solo cambian el motivo y el estado; los demás campos se ignoran.
 * @typedef {Object} ReporteUpdate
 * @property {string} [type] - Nuevo motivo.
 * @property {string} [status] - Nuevo estado.
 */

// ==========================================
// URL BASE DEL BACKEND
// ==========================================
/**
 * URL base de la API.
 * @constant {string}
 */
const API_URL = "http://localhost:8080/api";

// ==========================================
// MANEJO DE RESPUESTAS
// ==========================================
/**
 * Revisa la respuesta del backend y regresa su cuerpo como JSON.
 * Si el backend responde con error, lanzamos el detalle que manda (ProblemDetail).
 * @param {Response} response - Respuesta de `fetch`.
 * @returns {Promise<any|null>} El cuerpo en JSON, o `null` si la respuesta es 204 No Content.
 * @throws {Error} Si el código de respuesta no es 2xx.
 */
async function manejarRespuesta(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.detail || `Error ${response.status}`);
  }
  // 204 No Content no trae cuerpo
  if (response.status === 204) return null;
  return response.json();
}

// ==========================================
// OBTENER TODOS LOS REPORTES
// ==========================================
/**
 * Obtiene todos los reportes.
 *
 * `GET http://localhost:8080/api/reports`
 * @returns {Promise<Reporte[]>} Lista de reportes.
 * @throws {Error} Si el backend responde con error.
 * @example
 * const reportes = await obtenerReportes();
 */
export async function obtenerReportes() {
  const response = await fetch(`${API_URL}/reports`);
  return manejarRespuesta(response);
}

// ==========================================
// OBTENER UN REPORTE POR ID
// ==========================================
/**
 * Obtiene un reporte por su ID.
 *
 * `GET http://localhost:8080/api/reports/{reportId}`
 * @param {number} reportId - ID del reporte.
 * @returns {Promise<Reporte>} El reporte encontrado.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * const reporte = await obtenerReportePorId(1);
 */
export async function obtenerReportePorId(reportId) {
  const response = await fetch(`${API_URL}/reports/${reportId}`);
  return manejarRespuesta(response);
}

// ==========================================
// OBTENER LOS REPORTES DE UN USUARIO
// ==========================================
/**
 * Obtiene los reportes que hizo un usuario.
 *
 * `GET http://localhost:8080/api/user/{userId}/reports`
 * @param {number} userId - ID del usuario.
 * @returns {Promise<Reporte[]>} Reportes hechos por el usuario.
 * @throws {Error} Si el usuario no existe (404) o el backend responde con error.
 * @example
 * const misReportes = await obtenerReportesPorUsuario(26);
 */
export async function obtenerReportesPorUsuario(userId) {
  const response = await fetch(`${API_URL}/user/${userId}/reports`);
  return manejarRespuesta(response);
}

// ==========================================
// OBTENER LOS REPORTES DE UNA PUBLICACIÓN
// ==========================================
/**
 * Obtiene los reportes de una publicación.
 *
 * `GET http://localhost:8080/api/posts/{postId}/reports`
 * @param {number} postId - ID de la publicación.
 * @returns {Promise<Reporte[]>} Reportes de la publicación.
 * @throws {Error} Si la publicación no existe (404) o el backend responde con error.
 * @example
 * const reportes = await obtenerReportesPorPost(1);
 */
export async function obtenerReportesPorPost(postId) {
  const response = await fetch(`${API_URL}/posts/${postId}/reports`);
  return manejarRespuesta(response);
}

// ==========================================
// OBTENER LOS REPORTES DE UN COMENTARIO
// ==========================================
/**
 * Obtiene los reportes de un comentario.
 *
 * `GET http://localhost:8080/api/comments/{commentId}/reports`
 * @param {number} commentId - ID del comentario.
 * @returns {Promise<Reporte[]>} Reportes del comentario.
 * @throws {Error} Si el comentario no existe (404) o el backend responde con error.
 * @example
 * const reportes = await obtenerReportesPorComentario(1);
 */
export async function obtenerReportesPorComentario(commentId) {
  const response = await fetch(`${API_URL}/comments/${commentId}/reports`);
  return manejarRespuesta(response);
}

// ==========================================
// CREAR UN REPORTE
// ==========================================
/**
 * Crea un reporte de una publicación o un comentario.
 * El backend pone la fecha, el estado "PENDING" y el enlace a lo reportado.
 *
 * `POST http://localhost:8080/api/user/{userId}/reports`
 * @param {number} userId - ID del usuario que reporta.
 * @param {ReporteRequest} reporte - Datos del reporte.
 * @returns {Promise<Reporte>} El reporte creado.
 * @throws {Error} Si falta un dato o entityType no es POST/COMMENT (400), el usuario o lo reportado no existen (404) o el backend responde con error.
 * @example
 * const nuevo = await crearReporte(26, { entityType: "POST", entityId: 1, type: "Contenido inapropiado" });
 */
export async function crearReporte(userId, reporte) {
  const response = await fetch(`${API_URL}/user/${userId}/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reporte),
  });
  return manejarRespuesta(response);
}

// ==========================================
// ACTUALIZAR UN REPORTE
// ==========================================
/**
 * Actualiza el motivo o el estado de un reporte.
 *
 * `PUT http://localhost:8080/api/reports/{reportId}`
 * @param {number} reportId - ID del reporte.
 * @param {ReporteUpdate} cambios - Campos a actualizar.
 * @returns {Promise<Reporte>} El reporte actualizado.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * const revisado = await actualizarReporte(1, { status: "RESOLVED" });
 */
export async function actualizarReporte(reportId, cambios) {
  const response = await fetch(`${API_URL}/reports/${reportId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cambios),
  });
  return manejarRespuesta(response);
}

// ==========================================
// ELIMINAR UN REPORTE
// ==========================================
/**
 * Elimina un reporte.
 *
 * `DELETE http://localhost:8080/api/reports/{reportId}`
 * @param {number} reportId - ID del reporte.
 * @returns {Promise<Reporte>} El reporte eliminado.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * await eliminarReporte(1);
 */
export async function eliminarReporte(reportId) {
  const response = await fetch(`${API_URL}/reports/${reportId}`, {
    method: "DELETE",
  });
  return manejarRespuesta(response);
}
