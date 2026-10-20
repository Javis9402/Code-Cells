const BASE_URL = "http://localhost:8080/api";


//get all posts
export const getPosts = async function () {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) throw new Error("Error en la peticion: " + response.status);
    return response.json();
};

//get post by id
//Lanza el error para que la página pueda avisarle al usuario
export const getpostById = async function (id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error("Error en la peticion: " + response.status);
    return response.json();
}

//get all post by user id
//Lanza el error para que la página pueda avisarle al usuario
export const getPostsByUserId = async function (userId) {
    const response = await fetch(`${BASE_URL}/user/${userId}/posts`);
    if (!response.ok) throw new Error("Error en la peticion: " + response.status);
    return response.json();
}

//post a new post by user id
//Lanza el error para que la página pueda avisarle al usuario
export const createPost = async function (userId, postObject) {
    const response = await fetch(`${BASE_URL}/user/${userId}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postObject),
    });
    if (!response.ok) throw new Error("Error en la peticion: " + response.status);
    return response.json();
}

//Put post by id post
//Lanza el error para que la página pueda avisarle al usuario
export const updatePost = async function (postId, postObject) {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postObject),
    });
    if (!response.ok) throw new Error("Error en la peticion: " + response.status);
    return response.json();
}

//Delete post by id post
//Lanza el error para que la página pueda avisarle al usuario
export const deletePost = async function (postId) {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error en la peticion: " + response.status);
    return response.json();
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