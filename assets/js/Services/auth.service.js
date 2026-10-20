// ==========================================
// SERVICIO DE AUTENTICACIÓN
// ==========================================
const BASE_URL = "http://localhost:8080/api/users";

async function handleResponse(response, defaultMessage) {
  if (!response.ok) {
    let msg = `${defaultMessage} (${response.status})`;
    try {
      const err = await response.json();
      console.log("Detalle del error del backend:", err); 
      
     
      msg = err.message || err.error || err.detail || msg;
    } catch (e) {
      // Si no hay JSON, dejamos el mensaje por defecto
    }
    throw new Error(msg);
  }
  if (response.status === 204) return null;
  return await response.json();
}

export const registerUser = async function (userObject) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObject),
  });
  return await handleResponse(response, "Error en el registro");
};

export const loginUser = async function (loginObject) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginObject),
  });
  return await handleResponse(response, "Error al iniciar sesión");
};