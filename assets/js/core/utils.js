/**
 * Normaliza el nombre de la página actual a partir de la URL.
 * 
 * @description
 * Esta función toma una URL como entrada y devuelve el nombre de la página actual sin la extensión del archivo.
 * Por ejemplo, si la URL es "http://example.com/index.html", la función devolverá "index".
 * 
 * @param {string} url - La URL completa de la página actual.
 * @returns {string} - El nombre de la página actual sin la extensión del archivo.
 * 
 * @example
 * const pageName = normalizeActualPageName("http://example.com/index.html");
 * console.log(pageName); // Output: "index"
 * @param {string} url - La URL completa de la página actual.
 * @returns 
 */
export function normalizeActualPageName(url) {
    const splittedUrl = url.split("/");
    // console.log(splittedUrl);
    const pageNameAndExtension = splittedUrl.at(-1);
    const spiltNameAndExtension = pageNameAndExtension.split(".");
    const pageName = spiltNameAndExtension[0];
    return pageName;
}

export function ensureLoggedIn(userId) {
    if (!(userId == null)) return Number(userId);
    window.location.href = "/pages/login.html"
    return null;
}

// Claves que guarda login.js al iniciar sesión
const CLAVES_SESION = ["sesionActiva", "usuarioId", "usuarioActivo", "nombreUsuario", "usuarioRol"];

/**
 * Borra la sesión del localStorage y manda al inicio.
 * Las preferencias (tema, vista) se conservan porque no son de la sesión.
 */
export function cerrarSesion() {
    CLAVES_SESION.forEach((clave) => localStorage.removeItem(clave));
    window.location.replace("/index.html");
}