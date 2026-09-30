function limpiarPublicaciones() {
    const lista =
        document.getElementById("lista-publicaciones");
    lista.innerHTML = "";
}

function mostrarPublicaciones(listaPublicaciones) {
    limpiarPublicaciones();
    listaPublicaciones.forEach(publicacion => {
        addItem(publicacion);
    });
}



function addItem(publicacion) {
    const lista = document.getElementById("lista-publicaciones");
    const columna = document.createElement("div");
    columna.classList.add("col");
    columna.innerHTML = `

        <div class="card h-100 shadow-sm">
            <img
                src="${publicacion.imagen}"
                class="card-img-top"
                alt="${publicacion.titulo}"
            >

            <div class="card-body">
                <!-- USUARIO -->
                <p class="text-muted mb-2">
                    👤 Publicado por:
                    <strong>
                        ${publicacion.usuario ?? "Usuario InstaRama"}
                    </strong>
                </p>


                <!-- TÍTULO -->
                <h5 class="card-title">
                    ${publicacion.titulo}
                </h5>


                <!-- DESCRIPCIÓN -->
                <p class="card-text">
                    ${publicacion.descripcion}
                </p>
                <p>
                    <strong>Nombre común:</strong>
                    ${publicacion.nombre_comun ?? "No identificado"}
                </p>
                <p>
                    <strong>Nombre científico:</strong>
                    ${publicacion.nombre_cientifico ?? "Identificación pendiente"}
                </p>
                <p>
                    <strong>Momento:</strong>
                    ${publicacion.momento_observacion}
                </p>
                <p>
                    <strong>Lugar:</strong>
                    ${publicacion.lugar_observacion}
                </p>
                <p>
                    <strong>Fecha de observación:</strong>
                    ${publicacion.fecha_observacion}
                </p>


                <!-- LIKE -->
                <div class="mt-3">
                    <button
                        class="btn btn-outline-danger btn-like"
                        type="button">
                        ❤️ Me gusta
                        <span class="contador-like">
                            ${publicacion.likes ?? 0}
                        </span>
                    </button>
                </div>
                <hr>


                <!-- COMENTARIOS -->
                <div class="mt-3">
                    <h6>
                        💬 Comentarios
                    </h6>
                    <div class="lista-comentarios mb-3">
                    </div>
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control input-comentario"
                            placeholder="Escribe un comentario..."
                        >
                        <button
                            class="btn btn-success btn-comentar"
                            type="button">
                            Comentar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    lista.appendChild(columna);
 
    // LIKE
     const botonLike =
        columna.querySelector(".btn-like");
    const contadorLike =
        columna.querySelector(".contador-like");
    botonLike.addEventListener("click", () => {
        publicacion.likes++;
        contadorLike.textContent =
            publicacion.likes;
    });


  
    // COMENTARIOS
       const botonComentar =
        columna.querySelector(".btn-comentar");
    const inputComentario =
        columna.querySelector(".input-comentario");
    const listaComentarios =
        columna.querySelector(".lista-comentarios");
    botonComentar.addEventListener("click", () => {
        const texto =
           inputComentario.value.trim();
        if (texto === "") {
            return;

        }
        publicacion.comentarios.push(texto);
        const comentario =
            document.createElement("p");
        comentario.classList.add(
            "border",
            "rounded",
            "p-2",
            "mb-2"
        );
        comentario.textContent =
            "👤 Tú: " + texto;
        listaComentarios.appendChild(
            comentario
        );
        inputComentario.value = "";
    });

}

// GENERAR TODAS LAS PUBLICACIONES
publicaciones.forEach(publicacion => {
    addItem(publicacion);
});

const filtroReino =
    document.getElementById("filtro-reino");

const filtroCategoria =
    document.getElementById("filtro-categoria");

const mensajeFiltro =
    document.getElementById("mensaje-filtro");

filtroReino.addEventListener("change", () => {

    const idReino =
        Number(filtroReino.value);


    filtroCategoria.innerHTML =
        `<option value="">
            Todas las categorías
        </option>`;


    if (!idReino) {

        filtroCategoria.disabled = true;

        limpiarPublicaciones();

        mensajeFiltro.textContent =
            "Selecciona un reino para descubrir sus publicaciones.";

        return;
    }


    const reinoSeleccionado =
        reinos.find(reino =>
            reino.id_reino === idReino
        );


    reinoSeleccionado.categorias.forEach(categoria => {

        const opcion =
            document.createElement("option");

        opcion.value =
            categoria.id_categoria;

        opcion.textContent =
            categoria.grupo
                ? `${categoria.grupo} - ${categoria.nombre}`
                : categoria.nombre;


        filtroCategoria.appendChild(opcion);

    });


    filtroCategoria.disabled = false;


    const publicacionesFiltradas =
        publicaciones.filter(publicacion =>
            publicacion.id_reino === idReino
        );


    mensajeFiltro.textContent =
        `Mostrando publicaciones de ${reinoSeleccionado.nombre}`;


    mostrarPublicaciones(
        publicacionesFiltradas
    );

});
filtroCategoria.addEventListener("change", () => {

    const idReino =
        Number(filtroReino.value);

    const idCategoria =
        Number(filtroCategoria.value);


    let publicacionesFiltradas;


    if (!idCategoria) {

        publicacionesFiltradas =
            publicaciones.filter(publicacion =>
                publicacion.id_reino === idReino
            );

    } else {

        publicacionesFiltradas =
            publicaciones.filter(publicacion =>
                publicacion.id_categoria === idCategoria
            );

    }


    mostrarPublicaciones(
        publicacionesFiltradas
    );

});