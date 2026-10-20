/**
 * @file Servicio para consumir los endpoints de usuarios del backend de InstaRama.
 * Login y registro están en `AuthService.js`; aquí va la gestión del perfil.
 * @module UserService
 */

/**
 * Usuario tal como lo regresa el backend (sin contraseña).
 * @typedef {Object} Usuario
 * @property {number} id - ID del usuario.
 * @property {string} name - Nombre del usuario.
 * @property {string} email - Correo del usuario.
 * @property {number} accountStatus - Estado de la cuenta.
 * @property {string} role - Rol del usuario.
 */

/**
 * Cambios que se mandan al backend. Solo se actualizan los campos que se envían.
 * @typedef {Object} UsuarioRequest
 * @property {string} [name] - Nuevo nombre.
 * @property {string} [email] - Nuevo correo (no puede estar usado por otro usuario).
 * @property {string} [password] - Nueva contraseña.
 * @property {number} [accountStatus] - Nuevo estado de la cuenta.
 * @property {string} [role] - Nuevo rol.
 */

// ==========================================
// URL BASE DEL BACKEND
// ==========================================
/**
 * URL base de los endpoints de usuarios.
 * @constant {string}
 */
const API_URL = "http://localhost:8080/api/users";

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
// OBTENER TODOS LOS USUARIOS
// ==========================================
/**
 * Obtiene todos los usuarios.
 *
 * `GET http://localhost:8080/api/users`
 * @returns {Promise<Usuario[]>} Lista de usuarios.
 * @throws {Error} Si el backend responde con error.
 * @example
 * const usuarios = await obtenerUsuarios();
 */
export async function obtenerUsuarios() {
  const response = await fetch(API_URL);
  return manejarRespuesta(response);
}

// ==========================================
// OBTENER UN USUARIO POR ID
// ==========================================
/**
 * Obtiene un usuario por su ID.
 *
 * `GET http://localhost:8080/api/users/{userId}`
 * @param {number} id - ID del usuario.
 * @returns {Promise<Usuario>} El usuario encontrado.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * const usuario = await obtenerUsuarioPorId(26);
 */
export async function obtenerUsuarioPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return manejarRespuesta(response);
}

// ==========================================
// ACTUALIZAR UN USUARIO
// ==========================================
/**
 * Actualiza los datos de un usuario. Solo cambian los campos que se envían.
 *
 * `PUT http://localhost:8080/api/users/{userId}`
 * @param {number} id - ID del usuario.
 * @param {UsuarioRequest} cambios - Campos a actualizar.
 * @returns {Promise<Usuario>} El usuario actualizado.
 * @throws {Error} Si el email no es válido (400), el usuario no existe (404), el email ya está en uso o el backend responde con error.
 * @example
 * const actualizado = await actualizarUsuario(26, { name: "Exploradora_Botánica" });
 */
export async function actualizarUsuario(id, cambios) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cambios),
  });
  return manejarRespuesta(response);
}

// ==========================================
// ELIMINAR UN USUARIO
// ==========================================
/**
 * Elimina un usuario.
 *
 * `DELETE http://localhost:8080/api/users/{userId}`
 * @param {number} id - ID del usuario.
 * @returns {Promise<Usuario>} El usuario eliminado.
 * @throws {Error} Si no existe (404) o el backend responde con error.
 * @example
 * await eliminarUsuario(26);
 */
export async function eliminarUsuario(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return manejarRespuesta(response);
}
