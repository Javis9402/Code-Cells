const BASE_URL = "http://localhost:8080/api";


//get all posts
export const getPosts = async function () {
    const repose = await fetch(`${BASE_URL}/posts`);
    const data = await repose.json();
    if (!repose.ok) throw new Error("Error en la peticion: " + repose.status);
    return data;
};

//get post by id
export const getpostById = async function (id) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error al obtener el post por ID: ", error.message);
    }
}

//get all post by user id
export const getPostsByUserId = async function (userId) {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/posts`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error al obtener los posts por ID de usuario: ", error.message);
    }
}

//post a new post by user id
export const createPost = async function (userId, postObject) {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postObject),
        });
        const data = await response.json();
        console.log(`Post creado exitosamente: ${response.ok} , Post: ${data}`);
        return data;
    }
    catch (error) {
        console.error("Error al crear el post: ", error.message);
    }
}

//Put post by id post
export const updatePost = async function (postId, postObject) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postObject),
        });
        const data = await response.json();
        console.log(`Post actualizado exitosamente: ${response.ok} , Post: ${data}`);
        return data;
    }
    catch (error) {
        console.error("Error al actualizar el post: ", error.message);
    }
}

//Delete post by id post
export const deletePost = async function (postId) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log(`Post eliminado exitosamente: ${response.ok}`);
        return data;
    }
    catch (error) {
        console.error("Error al eliminar el post: ", error.message);
    }
}

//Metodo para convertir la imagen a un array de bytes
export const convertImageToBytes = async function (inputArchivo) {
    if (inputArchivo.files.length === 0) {
        throw new Error("No se ha seleccionado ningún archivo.");
    }
    const archivo = inputArchivo.files[0];
    const buffer = await archivo.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // Convertir los bytes a Base64
    let binario = "";

    for (let i = 0; i < bytes.length; i++) {
        binario += String.fromCharCode(bytes[i]);
    }
    return btoa(binario);
}