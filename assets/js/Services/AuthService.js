/**
 * @file Servicio de Autenticación.
 * Se encarga de la comunicación entre el Frontend y los endpoints de Login y Registro del Backend.
 * @module AuthService
 */

// ==========================================
// CONFIGURACIÓN GLOBAL
// ==========================================

// URL base de la API apuntando al puerto de Spring Boot
const BASE_URL = "http://localhost:8080/api/users";

// ==========================================
// MANEJO DE RESPUESTAS DEL BACKEND
// ==========================================

/**
 * Procesa la respuesta del servidor (fetch).
 * Extrae los datos en formato JSON si la petición fue exitosa.
 * Si hubo un error (ej. 400, 401, 500), extrae el mensaje del backend (Spring Boot)
 * y lanza una excepción para que el frontend pueda capturarla y mostrarla.
 *
 * @param {Response} response - El objeto de respuesta nativo de fetch.
 * @param {string} defaultMessage - Mensaje de error por defecto en caso de que el backend no mande uno.
 * @returns {Promise<Object|null>} Los datos en JSON o null si es un 204 (No Content).
 * @throws {Error} Si la respuesta HTTP no es exitosa (status fuera del rango 200-299).
 */
async function handleResponse(response, defaultMessage) {
  // Si el status HTTP indica un error (400, 401, 404, 500, etc.)
  if (!response.ok) {
    let msg = `${defaultMessage} (${response.status})`; // Mensaje de respaldo

    try {
      // Intentamos leer el cuerpo del error, ya que Spring Boot suele enviar un JSON
      // con la propiedad "detail", "message" o "error"
      const err = await response.json();
      console.log("Detalle del error del backend:", err);

      // Extraemos el mensaje más específico que nos haya mandado el servidor
      msg = err.message || err.error || err.detail || msg;
    } catch (e) {
      // Si el backend no devuelve un JSON válido (ej. servidor apagado),
      // el try/catch evita que el código colapse y mantenemos el mensaje por defecto.
    }

    // Lanzamos el error para que sea atrapado en el archivo login.js o registro.js
    throw new Error(msg);
  }

  // Si la respuesta es 204 (No Content), significa que no hay cuerpo que leer (ej. al borrar).
  if (response.status === 204) return null;

  // Si todo salió bien, retornamos el cuerpo de la respuesta en formato JSON
  return await response.json();
}

// ==========================================
// FUNCIONES EXPORTADAS (API DEL SERVICIO)
// ==========================================

/**
 * Envía los datos de un nuevo usuario al backend para registrarlo.
 *
 * @param {Object} userObject - Objeto con los datos del usuario { name, email, password }.
 * @returns {Promise<Object>} El objeto del usuario creado (incluye ID, etc.).
 */
export const registerUser = async function (userObject) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST", // Método HTTP para crear un recurso
    headers: { "Content-Type": "application/json" }, // Le indicamos a Spring Boot que mandamos un JSON
    body: JSON.stringify(userObject), // Convertimos el objeto JS a texto JSON
  });

  return await handleResponse(response, "Error en el registro");
};

/**
 * Autentica a un usuario en el sistema.
 *
 * @param {Object} loginObject - Objeto con las credenciales { email, password }.
 * @returns {Promise<Object>} El objeto del usuario logueado (incluye ID, name, etc.).
 */
export const loginUser = async function (loginObject) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginObject),
  });

  return await handleResponse(response, "Error al iniciar sesión");
};
