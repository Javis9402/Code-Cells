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