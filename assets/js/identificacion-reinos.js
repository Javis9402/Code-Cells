/* =========================================================
   IDENTIFICADOR RÁPIDO DE REINOS
   El usuario escribe el nombre de un organismo y se muestra
   automáticamente el reino probable.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const inputBuscarReino = document.getElementById("inputBuscarReino");
    const resultadoReino = document.getElementById("resultadoReino");
    const nombreReino = document.getElementById("nombreReinoDetectado");
    const descripcionReino = document.getElementById("descripcionReinoDetectado");
    const imagenReino = document.getElementById("imagenReinoDetectado");
    if (!inputBuscarReino) {
        return;
    }
    /* =====================================================
       INFORMACIÓN VISUAL DE CADA REINO
       ===================================================== */
    const informacionReinos = {
        Monera: {
            icono: "🧫",
            imagen: "../assets/img/clasificacion/monera.png",
            descripcion: "Organismo procariota, principalmente unicelular."
        },
        Protista: {
            icono: "🦠",
            imagen: "../assets/img/clasificacion/protista.png",
            descripcion: "Organismo eucariota, principalmente unicelular."
        },
        Fungi: {
            icono: "🍄",
            imagen: "../assets/img/clasificacion/fungi.png",
            descripcion: "Organismo eucariota que obtiene nutrientes por absorción."
        },
        Plantae: {
            icono: "🌿",
            imagen: "../assets/img/clasificacion/plantas.png",
            descripcion: "Organismo eucariota, pluricelular y principalmente autótrofo."
        },
        Animalia: {
            icono: "🐾",
            imagen: "../assets/img/clasificacion/animal.png",
            descripcion: "Organismo eucariota, pluricelular y heterótrofo."
        }
    };
    /* =====================================================
       PALABRAS QUE EL USUARIO PUEDE ESCRIBIR
             ===================================================== */
    const organismos = {
        /* MONERA */
        "bacteria": "Monera",
        "bacterias": "Monera",
        "salmonella": "Monera",
        "salmonela": "Monera",
        "e coli": "Monera",
        "escherichia coli": "Monera",
        "cianobacteria": "Monera",
        "cianobacterias": "Monera",
        "lactobacilo": "Monera",
        "lactobacillus": "Monera",
        "estreptococo": "Monera",
        "streptococcus": "Monera",
        "estafilococo": "Monera",
        "staphylococcus": "Monera",
        "bacilo": "Monera",
        "coco": "Monera",
        /* PROTISTA */
        "amiba": "Protista",
        "ameba": "Protista",
        "amoeba": "Protista",
        "paramecio": "Protista",
        "paramecium": "Protista",
        "euglena": "Protista",
        "protozoo": "Protista",
        "protozoario": "Protista",
        "microalga": "Protista",
        "microalgas": "Protista",
        "diatomea": "Protista",
        "diatomeas": "Protista",
        "algas unicelulares": "Protista",
        "Foraminifera": "Protista",
        "foraminifera": "Protista",
        "radiolaria": "Protista",
        "radiolarios": "Protista",
        "ciliado": "Protista",
        "ciliados": "Protista",
        "flagelado": "Protista",
        "flagelados": "Protista",
        "esporozoario": "Protista",
        "esporozoarios": "Protista",
        "plasmodium": "Protista",       
        "toxoplasma": "Protista",
        "giardia": "Protista",
        "trypanosoma": "Protista",
        "trypanosomas": "Protista",     
        "leishmania": "Protista",   
        "algas pardas": "Protista",
        "algas rojas": "Protista",
        "algas verdes": "Protista",
        "Stramenopiles": "Protista",
        "planton": "Protista",
        "plancton": "Protista",
        "fitoplancton": "Protista",
        "zooplancton": "Protista",
        "oomicetos": "Protista",
        "oomycetes": "Protista",
        "algas": "Protista",
        "alga": "Protista",
        "Alveolata": "Protista",
        "Excavata": "Protista",
        "Rhizaria": "Protista",
        "Amoebozoa": "Protista",
        "Opisthokonta": "Protista",
        /* FUNGI */
        "hongo": "Fungi",
        "hongos": "Fungi",
        "champiñon": "Fungi",
        "champiñones": "Fungi",
        "seta": "Fungi",
        "setas": "Fungi",
        "moho": "Fungi",
        "levadura": "Fungi",
        "levaduras": "Fungi",
        "penicillium": "Fungi",
        "saccharomyces": "Fungi",
        "aspergillus": "Fungi",
        "basidiomycota": "Fungi",
        "ascomycota": "Fungi",
        "glomeromycota": "Fungi",
        "chytridiomycota": "Fungi",
        "neocallimastigomycota": "Fungi",
         "zygomycota": "Fungi",
         "blastocladiomycota": "Fungi",
         "microsporidia": "Fungi",
         "cryptomycota": "Fungi",
         "liquens": "Fungi",
        "liquen": "Fungi",
        "lichenes": "Fungi",
        "lichen": "Fungi",
        "micorriza": "Fungi",
        "micorrizas": "Fungi",
        "micorriza arbuscular": "Fungi",
        "micorriza arbusculares": "Fungi",
        "micorriza ectomicorriza": "Fungi",
        "micorriza ectomicorrizas": "Fungi",    
        "hifas": "Fungi",
        "hifa": "Fungi",
        "esporas": "Fungi",
        "espora": "Fungi",
        "micelio": "Fungi",
        "micelios": "Fungi",
        "basidiospora": "Fungi",
        "basidiosporas": "Fungi",
        "ascospora": "Fungi",
        "ascosporas": "Fungi",  
        "cuerpos fructíferos": "Fungi",
        "cuerpo fructífero": "Fungi",
        "cuerpo fructíferos": "Fungi",
        "cuerpos fructífero": "Fungi",
        "quitina": "Fungi",
        "quitinas": "Fungi",
        "quitridios": "Fungi",
        "opistoporidios": "Fungi",
        "apotecio": "Fungi",
        "basidiocarpos": "Fungi",
        "himenio": "Fungi",
        "himenios": "Fungi",
        "basidio": "Fungi",
        "basidios": "Fungi",
        "ascoma": "Fungi",
        "ascomas": "Fungi", 
        "peridio": "Fungi",
        "peridios": "Fungi",
        "esporangio": "Fungi",
        "esporangios": "Fungi",
        "zoospora": "Fungi",
        "zoosporas": "Fungi",
        "conidioforo": "Fungi",
        "conidioforos": "Fungi",
        "conidio": "Fungi",
        "conidios": "Fungi",
        "esporangioforo": "Fungi",
        "esporangioforos": "Fungi", 
        "esporangiozoide": "Fungi",
        "esporangiozoides": "Fungi",
        "esporangiospore": "Fungi",
        "tiña": "Fungi",
        "tiñas": "Fungi",
        "pie de atleta": "Fungi",
        "royas": "Fungi",
        "roya": "Fungi",
        "mildiu": "Fungi",  
        "mildius": "Fungi",
        "tizón": "Fungi",
        "tizones": "Fungi",
        "candidiasis": "Fungi",
        "mucilaginoso": "Fungi",
        "mucilaginosos": "Fungi",
        "ameboides": "Fungi",
        "Mixomicotes": "Fungi",
        "Plasmodioforomicotes": "Fungi",
        "Labyrinthulomycotes": "Fungi",
        " absorbotróficos": "Fungi",
        "absorcion de nutrientes": "Fungi",
        "absorción de nutrientes": "Fungi",
        "absorbe nutrientes": "Fungi",
        "Pseudohongos": "Fungi",



        /* PLANTAE */
        "planta": "Plantae",
        "plantas": "Plantae",
        "arbol": "Plantae",
        "pino": "Plantae",
        "encino": "Plantae",
        "roble": "Plantae",
        "cactus": "Plantae",
        "nopal": "Plantae",
        "helecho": "Plantae",
        "musgo": "Plantae",
        "orquidea": "Plantae",
        "rosa": "Plantae",
        "girasol": "Plantae",
        "pasto": "Plantae",
        /* ANIMALIA */
        "animal": "Animalia",
        "perro": "Animalia",
        "gato": "Animalia",
        "mariposa": "Animalia",
        "abeja": "Animalia",
        "hormiga": "Animalia",
        "mosca": "Animalia",
        "araña": "Animalia",
        "escorpion": "Animalia",
        "alacran": "Animalia",
        "serpiente": "Animalia",
        "lagartija": "Animalia",
        "rana": "Animalia",
        "pez": "Animalia",
        "tiburon": "Animalia",
        "pulpo": "Animalia",
        "caracol": "Animalia",
        "lombriz": "Animalia",
        "gusano": "Animalia",
        "coyote": "Animalia",
        "venado": "Animalia",
        "jaguar": "Animalia",
        "conejo": "Animalia",
        "aguila": "Animalia",
        "colibri": "Animalia",
        "ave": "Animalia"
    };
    /* =====================================================
       QUITAR MAYÚSCULAS, ACENTOS Y ESPACIOS EXTRA
       "Árbol", "ARBOL" y "arbol" funcionan igual.
       ===================================================== */
    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ");
    }
    /* =====================================================
       BUSCAR EL REINO
       ===================================================== */
    function buscarReino(texto) {
        const palabra = normalizarTexto(texto);
        if (!palabra) {
            return null;
        }
        /* Primero busca coincidencia exacta */
        if (organismos[palabra]) {
            return organismos[palabra];
        }
        /* Después permite frases:
           "encontre una mariposa" también funciona
        */
        const coincidencia = Object.keys(organismos).find((organismo) => {
            return palabra.includes(organismo);
        });
        if (coincidencia) {
            return organismos[coincidencia];
        }
        return null;
    }
    /* =====================================================
       SELECCIONAR AUTOMÁTICAMENTE EL REINO EN EL FORMULARIO
       ===================================================== */
    function seleccionarCategoria(reino) {
        const selectsCategoria = document.querySelectorAll("[id='selectCategoria']");
        selectsCategoria.forEach((select) => {
            const opcionExiste = Array.from(select.options).some((opcion) => {
                return opcion.value === reino;
            });
            if (opcionExiste) {
                select.value = reino;
                /* Dispara el evento change.
                   Esto es importante si Animalia abre
                   el menú de vertebrado/invertebrado.
                */
                select.dispatchEvent(
                    new Event("change", {
                        bubbles: true
                    })
                );
            }
        });
    }
    /* =====================================================
       MOSTRAR RESULTADO
       ===================================================== */
    function mostrarReino(reino) {
        const informacion = informacionReinos[reino];
        if (!informacion) {
            return;
        }
        resultadoReino.classList.remove("d-none");
        nombreReino.textContent =
            `${informacion.icono} Reino ${reino}`;
        descripcionReino.textContent =
            informacion.descripcion;
        if (imagenReino) {
            imagenReino.src = informacion.imagen;
            imagenReino.alt = `Ejemplo visual del Reino ${reino}`;
        }
        seleccionarCategoria(reino);
    }
    /* =====================================================
       CUANDO NO ENCONTRAMOS LA PALABRA
       ===================================================== */
    function mostrarNoEncontrado() {
        resultadoReino.classList.remove("d-none");
        nombreReino.textContent =
            "🔍 No estamos seguros todavía";
        descripcionReino.textContent =
            "No encontramos esa palabra. Puedes escribir otro organismo o usar el cuestionario para descubrir su reino.";
        if (imagenReino) {
            imagenReino.src =
                "../assets/img/publicacion/imagenPredeterminada.png";
            imagenReino.alt =
                "Organismo sin clasificar";
        }
    }
    /* =====================================================
       CASO ESPECIAL: VIRUS
       Los virus no pertenecen a ninguno de los cinco reinos.
       ===================================================== */
    function esVirus(texto) {
        const palabra = normalizarTexto(texto);
        return (
            palabra === "virus" ||
            palabra.includes(" virus") ||
            palabra.includes("virus ")
        );
    }
    function mostrarVirus() {
        resultadoReino.classList.remove("d-none");
        nombreReino.textContent =
            "🧬 No pertenece a los cinco reinos";
        descripcionReino.textContent =
           "Los virus no se clasifican dentro de Monera, Protista, Fungi, Plantae o Animalia.";
        if (imagenReino) {
            imagenReino.src =
                "../assets/img/publicacion/imagenPredeterminada.png";
            imagenReino.alt =
                "Virus fuera de la clasificación de cinco reinos";
        }
    }
    /* =====================================================
       IDENTIFICAR AL ESCRIBIR
       ==================================================== */
    inputBuscarReino.addEventListener("input", () => {
        const texto = inputBuscarReino.value.trim();
        if (texto === "") {
            resultadoReino.classList.add("d-none");
            return;
        }
        if (esVirus(texto)) {
            mostrarVirus();
            return;
        }
        const reino = buscarReino(texto);
        if (reino) {
            mostrarReino(reino);
        } else if (texto.length >= 3) {
            mostrarNoEncontrado();
        }
    });
});