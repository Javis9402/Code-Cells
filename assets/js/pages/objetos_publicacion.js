const publicaciones = [
        // 1. Cuquita / Insecto
    {
        id_publicacion: 1,
        titulo: "Cuquita encontrada entre las plantas",
        nombre_comun: "Cuquita",
        nombre_cientifico: null,
        descripcion: "Insecto de coloración negra, naranja y blanca observado sobre la vegetación.",
        imagen: "../assets/img/objetos/insectos.jpg",

        fecha_publicacion: "2026-09-18",
        fecha_observacion: "2026-09-18",

        id_usuario: 100,
            usuario: "Juan_Mar",
              id_reino: 5, 
        id_categoria: 17, // Animalia > Invertebrados > Insectos

        momento_observacion: "dia",
        temporada: "lluvias",
        lugar_observacion: "exterior",
        actividad_observada: "descanso",

        importancia_medica: "no_se",
        comentario_conservacion: "Observar sin manipular y respetar el organismo en su ambiente.",

        endemismo: null,
        estatus_proteccion: null,
        sexo: "no_se",

        verificado: false,
    likes: 0,
    comentarios: []
    },

    // 2. Staphylococcus
    {
        id_publicacion: 2,
        titulo: "Observación microscópica de Staphylococcus",
        nombre_comun: "Estafilococo",
        nombre_cientifico: "Staphylococcus aureus",
        descripcion: "Bacterias con forma esférica agrupadas en conjuntos semejantes a racimos.",
        imagen: "../assets/img/objetos/monera.jpg",

        fecha_publicacion: "2026-09-18",
        fecha_observacion: "2026-09-18",

        id_usuario: 101,
              usuario: "Jairo",
              id_reino: 1, 
        id_categoria: 1, // Monera

        momento_observacion: "no_aplica",
        temporada: "no_aplica",
        lugar_observacion: "laboratorio",
        actividad_observada: "no_aplica",

        importancia_medica: "si",
        comentario_conservacion: null,

        endemismo: null,
        estatus_proteccion: null,
        sexo: "no_aplica",

        verificado: true,
         likes: 2,
    comentarios: []
    },

    // 3. Helecho
    {
        id_publicacion: 3,
        titulo: "Helecho observado en zona boscosa",
        nombre_comun: "Helecho",
        nombre_cientifico: null,
        descripcion: "Helecho de frondas verdes observado creciendo en un ambiente húmedo y sombreado.",
        imagen: "../assets/img/objetos/plantae.jpg",

        fecha_publicacion: "2026-09-18",
              usuario: "Diego",
        fecha_observacion: "2026-09-18",

        id_usuario: 102,
        id_reino: 4, 
        id_categoria:  9, 
       //Plantae > Helechos

        momento_observacion: "dia",
        temporada: "lluvias",
        lugar_observacion: "bosque",
        actividad_observada: "no_aplica",

        importancia_medica: "no_se",
        comentario_conservacion: "Evitar arrancar las plantas y conservar la humedad y vegetación del sitio.",

        endemismo: null,
        estatus_proteccion: null,
        sexo: "no_aplica",

        verificado: false,
         likes: 2,
    comentarios: []
    },

    // 4. Pochote
    {
        id_publicacion: 4,
        titulo: "Pochote de tronco espinoso",
        nombre_comun: "Pochote",
        nombre_cientifico: null,
        descripcion: "Árbol de tronco robusto cubierto de estructuras espinosas, característico de ambientes tropicales.",
        imagen: "../assets/img/objetos/pochote.jpg",

        fecha_publicacion: "2026-09-18",
        fecha_observacion: "2026-09-18",

        id_usuario: 103,
        
          usuario: "Fer",
             id_reino: 4, 
        id_categoria:11, // Plantae > Angiospermas

        momento_observacion: "dia",
        temporada: "secas",
        lugar_observacion: "exterior",
        actividad_observada: "no_aplica",

        importancia_medica: "no_se",
        comentario_conservacion: "Evitar dañar su corteza y conservar los árboles nativos.",

        endemismo: null,
        estatus_proteccion: null,
        sexo: "no_aplica",

        verificado: false,
         likes: 2,
    comentarios: []
    },

    // 5. Alga / Protista
    {
        id_publicacion: 5,
        titulo: "Algas observadas en ambiente marino",
        nombre_comun: "Sargazo",
        nombre_cientifico: "Sargassum sp.",
        descripcion: "Alga marina de coloración parda observada flotando en el agua.",
        imagen: "../assets/img/objetos/protista.jpg",

        fecha_publicacion: "2026-09-18",
        fecha_observacion: "2026-09-18",

        id_usuario: 104,
          usuario: "Javier",
             id_reino: 2, 
        id_categoria: 4, // Protista, según clasificación educativa del proyecto

        momento_observacion: "dia",
        temporada: "no_se",
        lugar_observacion: "mar",
        actividad_observada: "flotando",

        importancia_medica: "no_se",
        comentario_conservacion: "Observar sin alterar el ambiente marino.",

        endemismo: null,
        estatus_proteccion: null,
        sexo: "no_aplica",

        verificado: false,
         likes: 0,
    comentarios: []
    },

    // 6. Ajolote
    {
        id_publicacion: 6,
        titulo: "Ajolote mexicano",
        nombre_comun: "Ajolote",
        nombre_cientifico: "Ambystoma mexicanum",
        descripcion: "Anfibio mexicano reconocido por conservar características larvarias durante su vida adulta.",
        imagen: "../assets/img/objetos/ajolote.jpg",

        fecha_publicacion: "2026-09-18",
        fecha_observacion: "2026-09-18",

        id_usuario: 105,
         usuario: "Devani",
            id_reino: 5, 
        id_categoria: 15, // Animalia > Vertebrados > Anfibios

        momento_observacion: "dia",
        temporada: "no_se",
        lugar_observacion: "ambiente_acuatico",
        actividad_observada: "descanso",

        importancia_medica: "no",
        comentario_conservacion: "No capturar ejemplares y proteger su hábitat acuático.",

        endemismo: "endemica",
        estatus_proteccion: null,
        sexo: "no_se",

        verificado: true,
         likes: 1,
    comentarios: []
    },

    // 7. Gorrión
    {
        id_publicacion: 7,
        titulo: "Gorrión observado entre las flores",
        nombre_comun: "Gorrión serrano",
        nombre_cientifico: null,
        descripcion: "Ave pequeña observada posada entre flores durante el día.",
        imagen: "../assets/img/objetos/ave.jpg",

        fecha_publicacion: "2026-09-18",
        fecha_observacion: "2026-09-18",

        id_usuario: 106,
        usuario: "Rosario Chaparro",
         id_reino: 5, 
        id_categoria: 13, // Animalia > Vertebrados > Aves

        momento_observacion: "dia",
        temporada: "secas",
        lugar_observacion: "exterior",
        actividad_observada: "descanso",

        importancia_medica: "no",
        comentario_conservacion: "Evitar molestar a las aves y conservar la vegetación que utilizan como refugio.",

        endemismo: null,
        estatus_proteccion: null,
        sexo: "no_se",

        verificado: false,
         likes: 10,
    comentarios: []
    },

    // 8. Hongo
    {
        id_publicacion: 8,
        titulo: "Hongo rosado sobre madera",
        nombre_comun: "Hongo de copa",
        nombre_cientifico: null,
        descripcion: "Hongo de cuerpo fructífero rosado observado creciendo sobre madera húmeda.",
        imagen: "../assets/img/objetos/Hongo.jpg",

        fecha_publicacion: "2026-09-18",
        fecha_observacion: "2026-09-18",

        id_usuario: 107,
        usuario: "Cristian Mejía",
         id_reino: 3, 
        id_categoria: 5, // Fungi

        momento_observacion: "dia",
        temporada: "lluvias",
        lugar_observacion: "bosque",
        actividad_observada: "creciendo_sobre_madera",

        importancia_medica: "no_se",
        comentario_conservacion: "No consumir hongos silvestres sin una identificación experta.",

        endemismo: null,
        estatus_proteccion: null,
        sexo: "no_aplica",

        verificado: false,
         likes: 0,
    comentarios: []
    },

    // 9. Pinus
    {
        id_publicacion: 9,
        titulo: "Pino observado en el bosque",
        nombre_comun: "Pino",
        nombre_cientifico: "Pinus sp.",
        descripcion: "Árbol de hojas aciculares y estructuras reproductivas en forma de conos.",
        imagen: "../assets/img/objetos/pinus.jpg",

        fecha_publicacion: "2026-09-18",
        fecha_observacion: "2026-09-18",

        id_usuario: 108,
        usuario: "Mireya Alanis",
         id_reino: 4, 
        id_categoria:10, // Plantae > Gimnospermas

        momento_observacion: "dia",
        temporada: "no_se",
        lugar_observacion: "bosque",
        actividad_observada: "no_aplica",

        importancia_medica: "no_se",
        comentario_conservacion: "Evitar dañar los ejemplares y conservar las zonas boscosas.",

        endemismo: null,
        estatus_proteccion: null,
        sexo: "no_aplica",

        verificado: false,
         likes: 3,
    comentarios: []
    },

   // 10. Murcielago
  {
    id_publicacion: 10,
    titulo: "Murciélago observado al anochecer",
    nombre_comun: "Murciélago",
    nombre_cientifico: null,

    descripcion:
        "Mamífero volador observado durante el atardecer cerca de una zona con vegetación.",

    imagen: "../assets/img/objetos/murcielago.jpg",

    fecha_publicacion: "2026-09-18",
    fecha_observacion: "2026-09-18",

    id_usuario: 109,
    usuario: "Adrián Beltrán",
       id_reino: 5, 
    id_categoria: 12,

    momento_observacion: "atardecer",
    temporada: "no_se",
    lugar_observacion: "exterior",
    actividad_observada: "volando",

    importancia_medica: "no_se",

    comentario_conservacion:
        "Observar a distancia y evitar alterar sus sitios de refugio.",

    endemismo: null,
    estatus_proteccion: null,
    sexo: "no_se",

    verificado: false,
     likes: 4,
    comentarios: []
}

];