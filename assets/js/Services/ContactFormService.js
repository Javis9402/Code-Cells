/**
 * @file Servicio para consumir los endpoints del formulario de contacto del backend de InstaRama.
 * @module ContactFormService
 */

/**
 * Mensaje de contacto que se manda al backend.
 * @typedef {Object} ContactoRequest
 * @property {"Felicidades"|"Error"|"Queja"|"Sugerencia"} characterType - Tipo de mensaje.
 * @property {string} message - Contenido del mensaje (máximo 250 caracteres).
 * @property {string} email - Correo de quien manda el mensaje.
 * @property {number} userId - ID del usuario que manda el mensaje.
 */

/**
 * Mensaje de contacto tal como lo regresa el backend.
 * @typedef {Object} Contacto
 * @property {number} id - ID del mensaje de contacto.
 * @property {"Felicidades"|"Error"|"Queja"|"Sugerencia"} characterType - Tipo de mensaje.
 * @property {string} message - Contenido del mensaje.
 * @property {string} email - Correo de quien mandó el mensaje.
 * @property {Object} user - Usuario que mandó el mensaje.
 */

// ==========================================
// URL BASE DEL BACKEND
// ==========================================
/**
 * URL base de la API.
 * @constant {string}
 */
const API_URL = "/api";

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
  // 204 No Content (DELETE) no trae cuerpo
  if (response.status === 204) return null;
  return response.json();
}

// ==========================================
// OBTENER TODOS LOS MENSAJES DE CONTACTO
// ==========================================
/**
 * Obtiene todos los mensajes de contacto.
 *
 * `GET http://localhost:8080/api/contact`
 * @returns {Promise<Contacto[]>} Lista de mensajes de contacto.
 * @throws {Error} Si el backend responde con error.
 * @example
 * const contactos = await obtenerContactos();
 */
export async function obtenerContactos() {
  const response = await fetch(`${API_URL}/contact`);
  return manejarRespuesta(response);
}

// ==========================================
// OBTENER UN MENSAJE DE CONTACTO POR ID
// ==========================================
/**
 * Obtiene un mensaje de contacto por su ID.
 *
 * `GET http://localhost:8080/api/users/contact/{id}`
 * @param {number} id - ID del mensaje de contacto.
 * @returns {Promise<Contacto>} El mensaje de contacto encontrado.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * const contacto = await obtenerContactoPorId(1);
 */
export async function obtenerContactoPorId(id) {
  const response = await fetch(`${API_URL}/users/contact/${id}`);
  return manejarRespuesta(response);
}

// ==========================================
// ENVIAR UN MENSAJE DE CONTACTO
// ==========================================
/**
 * Envía un nuevo mensaje de contacto.
 *
 * `POST http://localhost:8080/api/users/contact/send`
 * @param {ContactoRequest} contacto - Datos del mensaje.
 * @returns {Promise<Contacto>} El mensaje de contacto creado (201 Created).
 * @throws {Error} Si los datos no son válidos (400), el usuario no existe (404) o el backend responde con error.
 * @example
 * const nuevo = await enviarContacto({
 *   characterType: "Sugerencia",
 *   message: "Me gustaría poder filtrar por reino",
 *   email: "abcd@gmail.com",
 *   userId: 1,
 * });
 */
export async function enviarContacto(contacto) {
  const response = await fetch(`${API_URL}/users/contact/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  return manejarRespuesta(response);
}

// ==========================================
// ELIMINAR UN MENSAJE DE CONTACTO
// ==========================================
/**
 * Elimina un mensaje de contacto por su ID.
 *
 * `DELETE http://localhost:8080/api/users/contact/{id}`
 * @param {number} id - ID del mensaje de contacto.
 * @returns {Promise<null>} `null`, porque el backend responde 204 No Content.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * await eliminarContacto(1);
 */
export async function eliminarContacto(id) {
  const response = await fetch(`${API_URL}/users/contact/${id}`, {
    method: "DELETE",
  });
  return manejarRespuesta(response);
}
