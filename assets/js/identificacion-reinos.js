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
        "sargazo": "Protista",
        "sargazos": "Protista",
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
        "manita muscaria": "Fungi",
        "amanita muscaria": "Fungi",
        "amanitas": "Fungi",
        "amanita": "Fungi",
        "penicillium": "Fungi",
        "penicilliums": "Fungi",
        "velo de novia": "Fungi",
        "velo de novias": "Fungi",
        "hongo de sombrero": "Fungi",
        "hongos de sombrero": "Fungi",
        "shitakate": "Fungi",
        "shitakes": "Fungi",
        "shiitake": "Fungi",
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
        "pasto": "Plantae",
        "grama": "Plantae",
        "hierba": "Plantae",
        "arbusto": "Plantae",
        "arbustos": "Plantae",
        "flor": "Plantae",
        "flores": "Plantae",
        "fruto": "Plantae",
        "frutos": "Plantae",
        "semilla": "Plantae",
        "semillas": "Plantae",
        "raiz": "Plantae",
        "raices": "Plantae",
        "hoja": "Plantae",
        "hojas": "Plantae",
        "tallo": "Plantae",
        "tallos": "Plantae",
        "clorofila": "Plantae",
        "fotosintesis": "Plantae",
        "fotosíntesis": "Plantae",
        "autotrofos": "Plantae",
        "autotrofos": "Plantae",
        "autotróficos": "Plantae",
        "autotróficas": "Plantae",
        "Dalia": "Plantae",
        "Tulipan": "Plantae",
        "Lirio": "Plantae",
        "mimosa": "Plantae",
        "jacaranda": "Plantae",
        "jacarandas": "Plantae",
        "palmera": "Plantae",
        "palmeras": "Plantae",
        "palmilla": "Plantae",
        "palmillas": "Plantae",
        "helechos": "Plantae",
        "musgos": "Plantae",
        "orquideas": "Plantae",
        "rosas": "Plantae",
        "girasoles": "Plantae",
        "retoño": "Plantae",
        "retoños": "Plantae",
        "brote": "Plantae",
        "brotes": "Plantae",
        "semillero": "Plantae",
        "semilleros": "Plantae",
        "vasculares": "Plantae",
        "Rhodophyta": "Plantae",
        "Chlorophyta": "Plantae",
        "Phaeophyceae": "Plantae",  
        "Bryophyta": "Plantae",
        "Marchantiophyta": "Plantae",
        "Anthocerotophyta": "Plantae",  
        "Equisetophyta": "Plantae",
        "Lycopodiophyta": "Plantae",
        "Polypodiophyta": "Plantae",    
        "viridantas": "Plantae",
        "Streptophyta": "Plantae",
        "Charophyta": "Plantae",    
        "Angiospermas": "Plantae",
        "Gimnospermas": "Plantae",
        "Pteridofitas": "Plantae",
        "durazno": "Plantae",
        "duraznos": "Plantae",
        "manzano": "Plantae",
        "manzanos": "Plantae",
        "naranjo": "Plantae",
        "naranjos": "Plantae",
        "perales": "Plantae",
        "peral": "Plantae",
        "limonero": "Plantae",
        "manzanilla": "Plantae",
        "menta": "Plantae",
        "romero": "Plantae",
        "xilema": "Plantae",
        "floema": "Plantae",
        "estomas": "Plantae",   
        "lignina": "Plantae",
        "cuticula": "Plantae",
        "cutículas": "Plantae",
        "pectina": "Plantae",
        "pectinas": "Plantae",
        "celulosa": "Plantae",
        "centeno": "Plantae",
        "trigo": "Plantae",
        "maiz": "Plantae",
        "arroz": "Plantae",
        "soya": "Plantae",
        "soja": "Plantae",
        "frijol": "Plantae",
        "frijoles": "Plantae",
        "lenteja": "Plantae",
        "lentejas": "Plantae",
        "garbanzo": "Plantae",
        "garbanzos": "Plantae", 
        "acelga": "Plantae",
        "acelgas": "Plantae",
        "espinaca": "Plantae",  
        "espinacas": "Plantae",
        "lechuga": "Plantae",
        "lechugas": "Plantae",  
        "melisa": "Plantae",
        "menta": "Plantae",
        "romero": "Plantae",
        "bromelia": "Plantae",
        "magueyes": "Plantae",
        "pithaya": "Plantae",
        "pitahaya": "Plantae",
        "pitahayas": "Plantae",
        "nopalitos": "Plantae",
        "ciclamen": "Plantae",
        "begonia": "Plantae",
        "petunia": "Plantae",
        "echeveria": "Plantae",
        "agave": "Plantae",
        "gerbera": "Plantae",
        "aster": "Plantae",
        "crisantemo": "Plantae",
        "crisantemos": "Plantae",
        "diente de león": "Plantae",
        "tronco de Brasil": "Plantae",
        "cactus de Navidad": "Plantae",
        "cactus de Pascua": "Plantae",  
        "dalia": "Plantae",
        "tulipan": "Plantae",
        "lirio": "Plantae",
        "azalea": "Plantae",
        "hortensia": "Plantae",
        "hortensias": "Plantae",
        "jacinto": "Plantae",
        "jacintos": "Plantae",
        "clavel": "Plantae",
        "arce": "Plantae",  
        "coleos": "Plantae",
        "lirio": "Plantae",
        "bambu": "Plantae",
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
        "ave": "Animalia",
        "insecto": "Animalia",
        "insectos": "Animalia",
        "reptil": "Animalia",
        "reptiles": "Animalia",
        "anfibio": "Animalia",
        "anfibios": "Animalia",
        "mamifero": "Animalia",
        "mamiferos": "Animalia",
        "aves": "Animalia",
        "pajaro": "Animalia",
        "pajaros": "Animalia",
        "viuda negra": "Animalia",
        "araña viuda negra": "Animalia",
        "arañas viuda negra": "Animalia",
        "tarantula": "Animalia",
        "tarantulas": "Animalia",
        "iguana": "Animalia",
        "mono": "Animalia",
        "monos": "Animalia",
        "delfin": "Animalia",
        "delfines": "Animalia",
        "ballena": "Animalia",
        "ballenas": "Animalia",
        "orca": "Animalia",
        "orcas": "Animalia",
        "tiburon martillo": "Animalia",
        "tiburon martillos": "Animalia",
        "tiburon blanco": "Animalia",
        "tiburon blancos": "Animalia",
        "ballena azul": "Animalia",
        "ballenas azules": "Animalia",
        "tiburon ballena": "Animalia",
        "tiburon ballenas": "Animalia",
        "capibara": "Animalia",
        "capibaras": "Animalia",
        "canguro": "Animalia",
        "canguros": "Animalia",
        "ornitorrinco": "Animalia",
        "ornitorrincos": "Animalia",
        "loro": "Animalia",
        "loros": "Animalia",
        "guacamaya": "Animalia",
        "tortuga": "Animalia",
        "tortugas": "Animalia",
        "cocodrilo": "Animalia",
        "cocodrilos": "Animalia",
        "hipopotamo": "Animalia",
        "hipopotamos": "Animalia",
        "hamster": "Animalia",
        "hamsters": "Animalia",
        "raton": "Animalia",
        "ratones": "Animalia",
        "rata": "Animalia",
        "ratas": "Animalia",    
        "cucaracha": "Animalia",
        "cucarachas": "Animalia",
        "mariposas": "Animalia",
        "abejas": "Animalia",
        "hormigas": "Animalia",
        "moscas": "Animalia",
        "caballo": "Animalia",
        "caballos": "Animalia",
        "vaca": "Animalia",
        "leon": "Animalia",
        "leones": "Animalia",
        "tigre": "Animalia",
        "oso": "Animalia",
        "zorro": "Animalia",
        "jirafa": "Animalia",
        "cascabel": "Animalia",

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
       CREAR DICCIONARIO NORMALIZADO
       ===================================================== */

    const organismosNormalizados = {};

    Object.entries(organismos).forEach(([nombre, reino]) => {
        organismosNormalizados[normalizarTexto(nombre)] = reino;
    });

    /* =====================================================
       BUSCAR EL REINO
       ===================================================== */
        function buscarReino(texto) {
        const busqueda = normalizarTexto(texto);
        if (!busqueda) {
            return null;
        }
        /* Coincidencia exacta */
        if (organismosNormalizados[busqueda]) {
            return organismosNormalizados[busqueda];
        }
        /* Permite escribir frases:
           "encontre una mariposa"
           "vi un hongo"
        */
        const palabrasConocidas = Object.keys(organismosNormalizados)
            .sort((a, b) => b.length - a.length);
        const encontrada = palabrasConocidas.find((organismo) => {
            const expresion = new RegExp(
                `(^|\\s)${escaparExpresion(organismo)}(?=\\s|$|[.,;!?])`,
                "i"
            );
            return expresion.test(busqueda);
        });
        if (encontrada) {
            return organismosNormalizados[encontrada];
        }
        return null;
    }
/* =====================================================
       EVITAR PROBLEMAS CON EXPRESIONES REGULARES
       ===================================================== */
    function escaparExpresion(texto) {
        return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
/* =====================================================
       MOSTRAR REINO EN PANTALLA
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
            imagenReino.alt = `Ejemplo del Reino ${reino}`;
            imagenReino.onerror = () => {
                imagenReino.src =
                    "../assets/img/publicacion/imagenPredeterminada.png";
            };
        }
        seleccionarCategoria(reino);
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
       SELECCIONAR AUTOMÁTICAMENTE
       "TIPO DE DESCUBRIMIENTO"
       ===================================================== */
    function seleccionarCategoria(reino) {
        if (!selectCategoria) {
            return;
        }
        const opcion = Array.from(selectCategoria.options)
            .find((item) => item.value === reino);
        if (!opcion) {
            return;
        }
        selectCategoria.value = reino;
        selectCategoria.dispatchEvent(
            new Event("change", {
                bubbles: true
            })
        );
    }
    /* =====================================================
       PALABRA NO ENCONTRADA
       ===================================================== */
    function mostrarNoEncontrado() {
        resultadoReino.classList.remove("d-none");
        nombreReino.textContent =
            "🔍 Organismo no identificado";
        descripcionReino.textContent =
            "No encontramos esa palabra. Prueba con otro nombre o utiliza el cuestionario de clasificación.";
        if (imagenReino) {
            imagenReino.src =
                "../assets/img/publicacion/imagenPredeterminada.png";
            imagenReino.alt =
                "Organismo todavía no clasificado";
        }
    }
    /* =====================================================
       CASO ESPECIAL: VIRUS
       ===================================================== */
    function esVirus(texto) {
        const palabra = normalizarTexto(texto);
        return (
            palabra === "virus" ||
            palabra.startsWith("virus ") ||
            palabra.endsWith(" virus") ||
            palabra.includes(" virus ")
        );
    }
    function mostrarVirus() {
        resultadoReino.classList.remove("d-none");
        nombreReino.textContent =
            "🧬 Fuera de los cinco reinos";
        descripcionReino.textContent =
            "Los virus no se clasifican dentro de Monera, Protista, Fungi, Plantae o Animalia.";
        if (imagenReino) {
            imagenReino.src =
                "../assets/img/publicacion/imagenPredeterminada.png";
            imagenReino.alt =
                "Virus fuera de la clasificación de los cinco reinos";
        }
    }
    /* =====================================================
       IDENTIFICAR AUTOMÁTICAMENTE MIENTRAS ESCRIBE
       ===================================================== */
    inputBuscarReino.addEventListener("input", () => {
        const texto = inputBuscarReino.value;
        if (texto.trim() === "") {
            resultadoReino.classList.add("d-none");
            return;
        }
        if (esVirus(texto)) {
            mostrarVirus();
            return;
        }
        const reinoEncontrado = buscarReino(texto);
        if (reinoEncontrado) {
            mostrarReino(reinoEncontrado);
            return;
        }
        if (texto.trim().length >= 3) {
            mostrarNoEncontrado();
        } else {
            resultadoReino.classList.add("d-none");
        }
    });
    console.log("Identificador de reinos cargado correctamente.");
});