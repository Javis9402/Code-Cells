/**
 * @file Servicio para consumir los endpoints de comentarios del backend de InstaRama.
 * @module CommentService
 */

/**
 * Comentario que se manda al backend.
 * @typedef {Object} ComentarioRequest
 * @property {string} message - Texto del comentario (no puede ir vacío).
 */

/**
 * Comentario tal como lo regresa el backend.
 * @typedef {Object} Comentario
 * @property {number} id - ID del comentario.
 * @property {string} message - Texto del comentario.
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
// OBTENER LOS COMENTARIOS DE UNA PUBLICACIÓN
// ==========================================
/**
 * Obtiene todos los comentarios de una publicación.
 *
 * `GET http://localhost:8080/api/posts/{postId}/comments`
 * @param {number} postId - ID de la publicación.
 * @returns {Promise<Comentario[]>} Lista de comentarios de la publicación.
 * @throws {Error} Si la publicación no existe (404) o el backend responde con error.
 * @example
 * const comentarios = await obtenerComentariosPorPost(1);
 */
export async function obtenerComentariosPorPost(postId) {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`);
  return manejarRespuesta(response);
}

// ==========================================
// OBTENER UN COMENTARIO POR ID
// ==========================================
/**
 * Obtiene un comentario por su ID.
 *
 * `GET http://localhost:8080/api/comments/{commentId}`
 * @param {number} commentId - ID del comentario.
 * @returns {Promise<Comentario>} El comentario encontrado.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * const comentario = await obtenerComentarioPorId(1);
 */
export async function obtenerComentarioPorId(commentId) {
  const response = await fetch(`${API_URL}/comments/${commentId}`);
  return manejarRespuesta(response);
}

// ==========================================
// CREAR UN COMENTARIO
// ==========================================
/**
 * Crea un comentario en una publicación.
 *
 * `POST http://localhost:8080/api/posts/{postId}/comments?userId={userId}`
 * @param {number} postId - ID de la publicación que se comenta.
 * @param {number} userId - ID del usuario que comenta.
 * @param {ComentarioRequest} comentario - Datos del comentario.
 * @returns {Promise<Comentario>} El comentario creado.
 * @throws {Error} Si el comentario va vacío (400), el usuario o la publicación no existen (404) o el backend responde con error.
 * @example
 * const nuevo = await crearComentario(1, 26, { message: "¡Qué buena foto!" });
 */
export async function crearComentario(postId, userId, comentario) {
  const response = await fetch(`${API_URL}/posts/${postId}/comments?userId=${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comentario),
  });
  return manejarRespuesta(response);
}

// ==========================================
// ACTUALIZAR UN COMENTARIO
// ==========================================
/**
 * Actualiza el texto de un comentario. Solo el usuario que lo escribió puede editarlo.
 *
 * `PUT http://localhost:8080/api/comments/{commentId}?userId={userId}`
 * @param {number} commentId - ID del comentario.
 * @param {number} userId - ID del usuario que edita (debe ser el autor).
 * @param {ComentarioRequest} comentario - Nuevo texto del comentario.
 * @returns {Promise<Comentario>} El comentario actualizado.
 * @throws {Error} Si el comentario va vacío (400), no existe (404), el usuario no es el autor (500) o el backend responde con error.
 * @example
 * const editado = await actualizarComentario(1, 26, { message: "¡Qué buena foto! ¿Dónde la tomaste?" });
 */
export async function actualizarComentario(commentId, userId, comentario) {
  const response = await fetch(`${API_URL}/comments/${commentId}?userId=${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comentario),
  });
  return manejarRespuesta(response);
}

// ==========================================
// ELIMINAR UN COMENTARIO
// ==========================================
/**
 * Elimina un comentario. Solo el usuario que lo escribió puede eliminarlo.
 *
 * `DELETE http://localhost:8080/api/comments/{commentId}?userId={userId}`
 * @param {number} commentId - ID del comentario.
 * @param {number} userId - ID del usuario que elimina (debe ser el autor).
 * @returns {Promise<Comentario>} El comentario eliminado.
 * @throws {Error} Si no existe (404), el usuario no es el autor (500) o el backend responde con error.
 * @example
 * await eliminarComentario(1, 26);
 */
export async function eliminarComentario(commentId, userId) {
  const response = await fetch(`${API_URL}/comments/${commentId}?userId=${userId}`, {
    method: "DELETE",
  });
  return manejarRespuesta(response);
}
