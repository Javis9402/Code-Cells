/**
 * @file Servicio para consumir los endpoints de reinos del backend de InstaRama.
 * Cada registro es un par reino/subreino (por ejemplo Animalia / Insectos).
 * @module KingdomService
 */

/**
 * Reino tal como lo regresa el backend.
 * @typedef {Object} Reino
 * @property {number} id - ID del registro.
 * @property {string} kingdom - Nombre del reino (por ejemplo "Animalia").
 * @property {string} subKingdom - Subreino o categoría (por ejemplo "Insectos").
 */

/**
 * Reino que se manda al backend.
 * @typedef {Object} ReinoRequest
 * @property {string} kingdom - Nombre del reino (máximo 50 caracteres, no puede ir vacío).
 * @property {string} subKingdom - Subreino o categoría (máximo 100 caracteres, no puede ir vacío).
 */

// ==========================================
// URL BASE DEL BACKEND
// ==========================================
/**
 * URL base de los endpoints de reinos.
 * @constant {string}
 */
const API_URL = "http://localhost:8080/api/kingdoms";

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
// OBTENER TODOS LOS REINOS
// ==========================================
/**
 * Obtiene todos los reinos con su subreino.
 *
 * `GET http://localhost:8080/api/kingdoms`
 * @returns {Promise<Reino[]>} Lista de reinos.
 * @throws {Error} Si el backend responde con error.
 * @example
 * const reinos = await obtenerReinos();
 */
export async function obtenerReinos() {
  const response = await fetch(API_URL);
  return manejarRespuesta(response);
}

// ==========================================
// OBTENER UN REINO POR ID
// ==========================================
/**
 * Obtiene un reino por su ID.
 *
 * `GET http://localhost:8080/api/kingdoms/{id}`
 * @param {number} id - ID del reino.
 * @returns {Promise<Reino>} El reino encontrado.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * const reino = await obtenerReinoPorId(1);
 */
export async function obtenerReinoPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return manejarRespuesta(response);
}

// ==========================================
// CREAR UN REINO
// ==========================================
/**
 * Crea un reino con su subreino.
 *
 * `POST http://localhost:8080/api/kingdoms`
 * @param {ReinoRequest} reino - Datos del reino.
 * @returns {Promise<Reino>} El reino creado.
 * @throws {Error} Si falta un campo o es muy largo (400) o el backend responde con error.
 * @example
 * const nuevo = await crearReino({ kingdom: "Animalia", subKingdom: "Insectos" });
 */
export async function crearReino(reino) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reino),
  });
  return manejarRespuesta(response);
}

// ==========================================
// ELIMINAR UN REINO
// ==========================================
/**
 * Elimina un reino.
 *
 * `DELETE http://localhost:8080/api/kingdoms/{id}`
 * @param {number} id - ID del reino.
 * @returns {Promise<null>} `null`, porque el backend responde 204 No Content.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * await eliminarReino(1);
 */
export async function eliminarReino(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return manejarRespuesta(response);
}
