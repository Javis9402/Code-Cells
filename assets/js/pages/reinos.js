import { cerrarSesion } from "../core/utils.js";

/* =========================================================
   INSTARAMA - REINOS BIOLÓGICOS
   Archivo: reinos.js
   FUNCIONES:
   1. Descubrir el reino de una observación.
   2. Practicar lo aprendido.
   3. Mostrar progreso.
   4. Mostrar resultados.
   5. Reiniciar actividades.
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       ELEMENTOS DEL HTML
        ===================================================== */
    const selectorModo = document.getElementById("selectorModo");
    const btnDescubrir = document.getElementById("btnDescubrir");
    const btnPracticar = document.getElementById("btnPracticar");
    const panelActividad = document.getElementById("panelActividad");
    const actividadTitulo = document.getElementById("actividadTitulo");
    const actividadDescripcion = document.getElementById("actividadDescripcion");
    const progresoTexto = document.getElementById("progresoTexto");
    const barraProgreso = document.getElementById("barraProgreso");
    const preguntaContenedor = document.getElementById("preguntaContenedor");
    const opcionesContenedor = document.getElementById("opcionesContenedor");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnReiniciar = document.getElementById("btnReiniciar");
    const resultadoActividad = document.getElementById("resultadoActividad");
    /* =====================================================
       ESTADO GENERAL
    ===================================================== */
    let modoActual = "";
    let preguntaActual = 0;
    let respuestasDescubrir = [];
    let preguntasPracticaActuales = [];
    let respuestasPractica = [];
    let puntajePractica = 0;
    /* =====================================================
       PREGUNTAS PARA DESCUBRIR UN REINO
    ===================================================== */
    const preguntasDescubrir = [
        {
            pregunta: "¿Qué tipo de célula tiene el organismo?",
            ayuda: "Observa si tiene un núcleo definido.",
            opciones: [
                {
                    texto: "Procariota",
                    descripcion: "No tiene núcleo definido",
                    valor: "procariota"
                },
                {
                    texto: "Eucariota",
                    descripcion: "Tiene núcleo definido",
                    valor: "eucariota"
                },
                {
                    texto: "No lo sé",
                    descripcion: "Quiero continuar",
                    valor: "desconocido"
                }
            ]
        },
        {
            pregunta: "¿Cuántas células forman al organismo?",
            ayuda: "Piensa si está formado por una o por muchas células.",
            opciones: [
                {
                    texto: "Unicelular",
                    descripcion: "Está formado por una sola célula",
                    valor: "unicelular"
                },
                {
                    texto: "Pluricelular",
                    descripcion: "Está formado por muchas células",
                    valor: "pluricelular"
                },
                {
                    texto: "No lo sé",
                    descripcion: "No puedo identificarlo",
                    valor: "desconocido"
                }
            ]
        },
        {
            pregunta: "¿Cómo obtiene su alimento?",
            ayuda: "Selecciona la opción que más se parezca a lo que observaste.",
            opciones: [
                {
                    texto: "Produce su alimento",
                    descripcion: "Por ejemplo, las plantas",
                    valor: "autotrofo"
                },
                {
                    texto: "Ingiere alimento",
                    descripcion: "Consume otros organismos",
                    valor: "ingiere"
                },
                {
                    texto: "Absorbe nutrientes",
                    descripcion: "Por ejemplo, los hongos",
                    valor: "absorbe"
                },
                {
                    texto: "No lo sé",
                    descripcion: "No pude observarlo",
                    valor: "desconocido"
                }
            ]
        },
        {
            pregunta: "¿Cómo es su movilidad?",
            ayuda: "El movimiento ayuda a orientar la clasificación, pero no la determina por sí solo.",
            opciones: [
                {
                    texto: "Se desplaza",
                    descripcion: "Puede moverse activamente",
                    valor: "movil"
                },
                {
                    texto: "No se desplaza",
                    descripcion: "Permanece fijo",
                    valor: "inmovil"
                },
                {
                    texto: "Puede variar",
                    descripcion: "Depende de la etapa o del organismo",
                    valor: "variable"
                },
                {
                    texto: "No lo sé",
                    descripcion: "No pude observarlo",
                    valor: "desconocido"
                }
            ]
        },
             {
            pregunta: "¿A qué se parece más tu observación?",
            ayuda: "Elige la opción visualmente más cercana.",
            opciones: [
                {
                    texto: "Bacteria",
                    descripcion: "Microorganismo procariota",
                    valor: "bacteria"
                },
                {
                    texto: "Protozoo o alga",
                    descripcion: "Organismo parecido a protistas",
                    valor: "protista"
                },
                {
                    texto: "Hongo",
                    descripcion: "Hongo, moho o levadura",
                    valor: "hongo"
                },
                {
                    texto: "Planta",
                    descripcion: "Musgo, helecho, árbol o planta con flor",
                    valor: "planta"
                },
                {
                    texto: "Animal",
                    descripcion: "Vertebrado o invertebrado",
                    valor: "animal"
                },
                {
                    texto: "No estoy seguro",
                    descripcion: "Quiero ver el resultado con lo anterior",
                    valor: "desconocido"
                }
            ]
        }
    ];
    /* =====================================================
       BANCO DE PREGUNTAS PARA PRACTICAR
    ===================================================== */
    const bancoPractica = [
        {
            pregunta: "¿Qué reino incluye organismos procariotas como las bacterias?",
            opciones: [
                "Monera",
                "Protista",
                "Fungi",
                "Animalia"
            ],
            correcta: 0,
            explicacion: "En el sistema de cinco reinos, las bacterias se clasifican dentro de Monera."
        },
        {
            pregunta: "¿Qué característica distingue a una célula eucariota?",
            opciones: [
                "Tiene núcleo definido",
                "Siempre es unicelular",
                "Nunca tiene ADN",
                "No posee membrana"
            ],
            correcta: 0,
            explicacion: "Las células eucariotas poseen un núcleo definido que contiene su material genético."
        },
        {
            pregunta: "¿Qué reino obtiene principalmente nutrientes mediante absorción?",
            opciones: [
                "Animalia",
                "Fungi",
                "Plantae",
                "Monera"
            ],
            correcta: 1,
            explicacion: "Los hongos son heterótrofos y obtienen nutrientes principalmente mediante absorción."
        },
        {
            pregunta: "¿A qué reino pertenece un helecho?",
            opciones: [
                "Protista",
                "Animalia",
                "Plantae",
                "Fungi"
            ],
            correcta: 2,
            explicacion: "Los helechos son plantas y pertenecen al reino Plantae."
        },
        {
            pregunta: "¿A qué reino pertenece una mariposa?",
            opciones: [
                "Animalia",
                "Protista",
                "Monera",
                "Plantae"
            ],
            correcta: 0,
            explicacion: "La mariposa es un animal invertebrado y pertenece al reino Animalia."
        },
        {
            pregunta: "¿Cuál de estos organismos pertenece al reino Fungi?",
            opciones: [
                "Champiñón",
                "Helecho",
                "Jaguar",
                "Bacteria"
            ],
            correcta: 0,
            explicacion: "Los champiñones son cuerpos fructíferos de hongos y pertenecen al reino Fungi."
        },
        {
            pregunta: "¿Cuál de estos grupos contiene principalmente organismos eucariotas unicelulares?",
            opciones: [
                "Protista",
                "Animalia",
                "Plantae",
                "Monera"
            ],
            correcta: 0,
            explicacion: "El reino Protista incluye muchos organismos eucariotas unicelulares."
        },
        {
            pregunta: "¿Qué reino incluye organismos que normalmente producen su alimento mediante fotosíntesis?",
            opciones: [
                "Fungi",
                "Animalia",
                "Plantae",
                "Monera"
            ],
            correcta: 2,
            explicacion: "Las plantas son principalmente autótrofas y producen alimento mediante fotosíntesis."
        },
        {
            pregunta: "Salmonella es una bacteria. ¿A qué reino pertenece en el sistema de cinco reinos?",
            opciones: [
                "Fungi",
                "Monera",
                "Protista",
                "Animalia"
            ],
            correcta: 1,
            explicacion: "Salmonella es una bacteria procariota y, en este sistema, pertenece a Monera."
        },
        {
            pregunta: "¿Cuál de estos organismos es pluricelular y heterótrofo por ingestión?",
            opciones: [
                "Venado",
                "Helecho",
                "Bacteria",
                "Levadura"
            ],
            correcta: 0,
            explicacion: "El venado es un animal pluricelular que obtiene nutrientes ingiriendo alimento."
        }
    ];
    /* =====================================================
       BOTÓN: DESCUBRIR UN REINO
    ===================================================== */
    if (btnDescubrir) {
        btnDescubrir.addEventListener("click", () => {
            iniciarDescubrir();
        });
    }
    /* =====================================================
       BOTÓN: PRACTICAR
    ===================================================== */
    if (btnPracticar) {
        btnPracticar.addEventListener("click", () => {
            iniciarPractica();
        });
    }
    /* =====================================================
       INICIAR DESCUBRIR
    ===================================================== */
    function iniciarDescubrir() {
        modoActual = "descubrir";
        preguntaActual = 0;
        respuestasDescubrir = [];
        ocultarResultado();
        if (panelActividad) {
            panelActividad.classList.add("activo");
        }
        if (actividadTitulo) {
            actividadTitulo.textContent = "Descubre el reino de tu observación";
        }
        if (actividadDescripcion) {
            actividadDescripcion.textContent = "Responde según las características del organismo que observaste.";
        }
        mostrarPreguntaDescubrir();
        desplazarseActividad();
    }
    /* =====================================================
       MOSTRAR PREGUNTA DE DESCUBRIMIENTO
    ===================================================== */
    function mostrarPreguntaDescubrir() {
        const datos = preguntasDescubrir[preguntaActual];
        actualizarProgreso(
            preguntaActual + 1,
            preguntasDescubrir.length
        );
        preguntaContenedor.innerHTML = `
            <span class="pregunta-numero">
                Pregunta ${preguntaActual + 1}
            </span>
            <h3>${datos.pregunta}</h3>
            <p>${datos.ayuda}</p>
        `;
        opcionesContenedor.innerHTML = "";
        datos.opciones.forEach((opcion) => {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "opcion-respuesta";
            boton.innerHTML = `
                <strong>${opcion.texto}</strong>
                <span>${opcion.descripcion}</span>
            `;
            const respuestaGuardada =
                respuestasDescubrir[preguntaActual];
            if (
                respuestaGuardada &&
                respuestaGuardada.valor === opcion.valor
            ) {
                boton.classList.add("seleccionada");
            }
            boton.addEventListener("click", () => {
                seleccionarRespuestaDescubrir(opcion);
            });
            opcionesContenedor.appendChild(boton);
        });
        actualizarBotonAnterior();
    }
    /* =====================================================
       GUARDAR RESPUESTA DE DESCUBRIMIENTO
    ===================================================== */
    function seleccionarRespuestaDescubrir(opcion) {
        respuestasDescubrir[preguntaActual] = opcion;
        const botones =
            opcionesContenedor.querySelectorAll(".opcion-respuesta");
        botones.forEach((boton) => {
            boton.classList.remove("seleccionada");
        });
        event.currentTarget.classList.add("seleccionada");
        setTimeout(() => {
            if (
                preguntaActual <
                preguntasDescubrir.length - 1
            ) {
                preguntaActual++;
                mostrarPreguntaDescubrir();
            } else {
                calcularReino();
            }
        }, 250);
    }
    /* =====================================================
       CALCULAR EL REINO MÁS PROBABLE
    ==================================================== */
    function calcularReino() {
        const puntos = {
            Monera: 0,
            Protista: 0,
            Fungi: 0,
            Plantae: 0,
            Animalia: 0
        };
        const valores = respuestasDescubrir.map(
            respuesta => respuesta?.valor
        );
        /* TIPO DE CÉLULA */
        if (valores[0] === "procariota") {
            puntos.Monera += 7;
        }
        if (valores[0] === "eucariota") {
            puntos.Protista += 2;
            puntos.Fungi += 2;
            puntos.Plantae += 2;
            puntos.Animalia += 2;
        }
        /* NÚMERO DE CÉLULAS */
        if (valores[1] === "unicelular") {
            puntos.Monera += 3;
            puntos.Protista += 4;
            puntos.Fungi += 1;
        }
        if (valores[1] === "pluricelular") {
            puntos.Fungi += 2;
            puntos.Plantae += 4;
            puntos.Animalia += 4;
        }
        /* ALIMENTACIÓN */
        if (valores[2] === "autotrofo") {
            puntos.Plantae += 5;
            puntos.Protista += 2;
            puntos.Monera += 1;
        }
        if (valores[2] === "ingiere") {
            puntos.Animalia += 5;
            puntos.Protista += 2;
        }
        if (valores[2] === "absorbe") {
            puntos.Fungi += 6;
        }
        /* MOVILIDAD */
        if (valores[3] === "movil") {
            puntos.Animalia += 3;
            puntos.Protista += 2;
        }
        if (valores[3] === "inmovil") {
            puntos.Plantae += 2;
            puntos.Fungi += 2;
        }

        if (valores[3] === "variable") {
            puntos.Protista += 3;
        }
        /* APARIENCIA */
        if (valores[4] === "bacteria") {
            puntos.Monera += 6;
        }
        if (valores[4] === "protista") {
            puntos.Protista += 6;
        }
        if (valores[4] === "hongo") {
            puntos.Fungi += 6;
        }
        if (valores[4] === "planta") {
            puntos.Plantae += 6;
        }

        if (valores[4] === "animal") {
            puntos.Animalia += 6;
        }
        const clasificacion = Object.entries(puntos)
            .sort((a, b) => b[1] - a[1]);
        const reinoGanador = clasificacion[0][0];
        const puntosGanador = clasificacion[0][1];
        const segundoLugar = clasificacion[1][1];
        let confianza = "orientativa";
        if (puntosGanador - segundoLugar >= 5) {
            confianza = "alta";
        } else if (puntosGanador - segundoLugar >= 2) {
            confianza = "media";
        }
        mostrarResultadoReino(
            reinoGanador,
            confianza,
            puntosGanador
        );
    }
    /* =====================================================
       INFORMACIÓN DEL RESULTADO
    ===================================================== */
    const informacionReinos = {
        Monera: {
            icono: "🦠",
            texto: "Tu observación presenta características compatibles con organismos procariotas y principalmente unicelulares.",
            enlace: "#monera"
        },
        Protista: {
            icono: "🔬",
            texto: "Tu observación presenta características compatibles con organismos eucariotas muy diversos, muchos de ellos unicelulares.",
            enlace: "#protista"
        },
        Fungi: {
            icono: "🍄",
            texto: "Tu observación presenta características compatibles con hongos, especialmente por su forma de obtener nutrientes mediante absorción.",
            enlace: "#fungi"
        },
        Plantae: {
            icono: "🌿",
            texto: "Tu observación presenta características compatibles con organismos vegetales, eucariotas y principalmente autótrofos.",
            enlace: "#plantae"
        },
        Animalia: {
            icono: "🐾",
            texto: "Tu observación presenta características compatibles con animales pluricelulares y heterótrofos.",
            enlace: "#animalia"
        }
    };
    /* =====================================================
       MOSTRAR RESULTADO DEL REINO
    ==================================================== */
    function mostrarResultadoReino(
        reino,
        confianza,
        puntos
    ) {
        const info = informacionReinos[reino];
        preguntaContenedor.innerHTML = "";
        opcionesContenedor.innerHTML = "";
        actualizarProgreso(
            preguntasDescubrir.length,
            preguntasDescubrir.length
        );
        resultadoActividad.innerHTML = `
            <div class="resultado-icono">
                ${info.icono}
            </div>
            <span class="resultado-etiqueta">
                Resultado probable
            </span>
            <h3>
                Reino ${reino}
            </h3>
            <p>
                ${info.texto}
            </p>
            <div class="resultado-confianza">
                Coincidencia: ${confianza}
            </div>
            <div class="resultado-botones">
                <a
                    href="${info.enlace}"
                    class="btn-resultado-reino"
                >
                    Conocer Reino ${reino}
                </a>
                <button
                    type="button"
                    class="btn-repetir"
                    id="repetirDescubrir"
                >
                    Intentar otra vez
                </button>
            </div>
            <small class="resultado-nota">
                Esta herramienta es educativa y ofrece
                una clasificación orientativa.
            </small>
        `;
        resultadoActividad.classList.add("activo");
        const repetir =
            document.getElementById("repetirDescubrir");
        repetir.addEventListener("click", () => {
            iniciarDescubrir();
        });
        actualizarBotonAnterior();
    }
    /* =====================================================
       INICIAR PRÁCTICA
    ===================================================== */
    function iniciarPractica() {
        modoActual = "practicar";
        preguntaActual = 0;
        puntajePractica = 0;
        respuestasPractica = [];
        ocultarResultado();
        preguntasPracticaActuales =
            mezclarArray([...bancoPractica]).slice(0, 5);
        if (panelActividad) {
            panelActividad.classList.add("activo");
        }
        if (actividadTitulo) {
            actividadTitulo.textContent = "Pon a prueba lo aprendido";
        }
        if (actividadDescripcion) {
            actividadDescripcion.textContent = "Responde cinco preguntas y descubre cuánto aprendiste.";
        }
        mostrarPreguntaPractica();

        desplazarseActividad();
    }
    /* =====================================================
       MOSTRAR PREGUNTA DE PRÁCTICA
    ===================================================== */
    function mostrarPreguntaPractica() {
        const datos =
            preguntasPracticaActuales[preguntaActual];
        actualizarProgreso(
            preguntaActual + 1,
            preguntasPracticaActuales.length
        );
        preguntaContenedor.innerHTML = `
            <span class="pregunta-numero">
                Pregunta ${preguntaActual + 1}
            </span>
            <h3>
                ${datos.pregunta}
            </h3>
        `;
        opcionesContenedor.innerHTML = "";
        datos.opciones.forEach((opcion, indice) => {
            const boton =
                document.createElement("button");
            boton.type = "button";
            boton.className = "opcion-respuesta";
            boton.innerHTML = `
                <span class="letra-opcion">
                    ${String.fromCharCode(65 + indice)}
                </span>
                <strong>
                    ${opcion}
                </strong>
            `;
            boton.addEventListener("click", () => {
                responderPractica(
                    indice,
                    boton
                );
            });
            opcionesContenedor.appendChild(boton);
        });
        actualizarBotonAnterior();
    }
    /* =====================================================
       RESPONDER PRÁCTICA
    ==================================================== */
    function responderPractica(
        indiceSeleccionado,
        botonSeleccionado
    ) {
        const pregunta =
            preguntasPracticaActuales[preguntaActual];

        const botones =
            opcionesContenedor.querySelectorAll(
                ".opcion-respuesta"
            );
        botones.forEach((boton) => {
            boton.disabled = true;
        });
        const esCorrecta =
            indiceSeleccionado === pregunta.correcta;
        if (esCorrecta) {
            botonSeleccionado.classList.add("correcta");
            puntajePractica++;
        } else {
            botonSeleccionado.classList.add("incorrecta");
            botones[
                pregunta.correcta
            ].classList.add("correcta");
        }
        respuestasPractica[preguntaActual] = {
            seleccion: indiceSeleccionado,
            correcta: esCorrecta
        };
        const feedback =
            document.createElement("div");
        feedback.className =
            esCorrecta
                ? "feedback-respuesta correcto"
                : "feedback-respuesta incorrecto";
        feedback.innerHTML = `
            <strong>
                ${esCorrecta
                    ? "¡Muy bien!"
                    : "Sigue practicando"}
            </strong>
            <p>
                ${pregunta.explicacion}
            </p>
            <button
                type="button"
                class="btn-siguiente-pregunta"
                id="btnSiguientePregunta"
            >
                ${
                    preguntaActual <
                    preguntasPracticaActuales.length - 1
                        ? "Siguiente pregunta →"
                        : "Ver resultado"
                }
            </button>
        `;
        opcionesContenedor.appendChild(feedback);
        document
            .getElementById("btnSiguientePregunta")
            .addEventListener("click", () => {
                if (
                    preguntaActual <
                    preguntasPracticaActuales.length - 1
                ) {
                    preguntaActual++;
                    mostrarPreguntaPractica();
                } else {
                    mostrarResultadoPractica();
                }
            });
    }
    /* =====================================================
       RESULTADO DE PRÁCTICA
    ===================================================== */
    function mostrarResultadoPractica() {
        preguntaContenedor.innerHTML = "";
        opcionesContenedor.innerHTML = "";
        actualizarProgreso(
            preguntasPracticaActuales.length,
            preguntasPracticaActuales.length
        );
        let mensaje = "";
        let icono = "";
        if (puntajePractica === 5) {
            mensaje = "¡Excelente observador de biodiversidad!";
            icono = "🏆";
        } else if (puntajePractica >= 4) {
            mensaje = "¡Muy buen trabajo!";
            icono = "🌿";
        } else if (puntajePractica >= 3) {
            mensaje = "Vas por muy buen camino.";
            icono = "🔍";
        } else {
            mensaje = "Sigue explorando y aprendiendo.";
            icono = "🌱";
        }
        resultadoActividad.innerHTML = `
            <div class="resultado-icono">
                ${icono}
            </div>
            <span class="resultado-etiqueta">
                Resultado
            </span>
            <h3>
                ${puntajePractica} / 5
            </h3>
            <p>
                ${mensaje}
            </p>
            <button
                type="button"
                class="btn-repetir"
                id="repetirPractica"
            >
                Jugar otra vez
            </button>
        `;
        resultadoActividad.classList.add("activo");
        document
            .getElementById("repetirPractica")
            .addEventListener("click", () => {
                iniciarPractica();
            });
        actualizarBotonAnterior();
    }
    /* =====================================================
       BOTÓN ANTERIOR
    ===================================================== */
    if (btnAnterior) {
        btnAnterior.addEventListener("click", () => {
            if (preguntaActual <= 0) {
                volverSelector();
                return;
            }
            preguntaActual--;
            ocultarResultado();
            if (modoActual === "descubrir") {
                mostrarPreguntaDescubrir();
            }
            if (modoActual === "practicar") {
                mostrarPreguntaPractica();
            }
        });
    }
    /* =====================================================
       REINICIAR / VOLVER AL SELECTOR
    ===================================================== */
    if (btnReiniciar) {
        btnReiniciar.addEventListener("click", () => {
            volverSelector();
        });
    }
    function volverSelector() {
        modoActual = "";
        preguntaActual = 0;
        respuestasDescubrir = [];
        respuestasPractica = [];
        puntajePractica = 0;
        if (panelActividad) {
            panelActividad.classList.remove("activo");
        }
        ocultarResultado();
        if (selectorModo) {
            selectorModo.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }
    /* =====================================================
       ACTUALIZAR BARRA DE PROGRESO
    ===================================================== */
    function actualizarProgreso(
        actual,
        total
    ) {
        const porcentaje =
            Math.round((actual / total) * 100);

        if (progresoTexto) {
            progresoTexto.textContent =
                `${actual} de ${total}`;
        }

        if (barraProgreso) {
            barraProgreso.style.width =
                `${porcentaje}%`;
        }
    }
    /* =====================================================
       BOTÓN ANTERIOR
    ===================================================== */
    function actualizarBotonAnterior() {
        if (!btnAnterior) {
            return;
        }

        if (preguntaActual === 0) {
            btnAnterior.textContent =
                "← Volver";
        } else {
            btnAnterior.textContent =
                "← Anterior";
        }
    }
    /* =====================================================
       OCULTAR RESULTADOS
    ===================================================== */
    function ocultarResultado() {
        if (!resultadoActividad) {
            return;
        }

        resultadoActividad.classList.remove(
            "activo"
        );

        resultadoActividad.innerHTML = "";
    }
    /* =====================================================
       MEZCLAR PREGUNTAS
       Hace diferente cada partida.
    ===================================================== */
    function mezclarArray(array) {
        for (
            let i = array.length - 1;
            i > 0;
            i--
        ) {
            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                array[i],
                array[j]
            ] = [
                array[j],
                array[i]
            ];
        }
        return array;
    }
    /* =====================================================
       DESPLAZARSE HACIA EL CUESTIONARIO
    ===================================================== */
    function desplazarseActividad() {
        setTimeout(() => {
            if (panelActividad) {
                panelActividad.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, 100);
    }

});

document.addEventListener("click", (e) => {
    const enlace = e.target.closest("[data-cerrar-sesion]");
    if (!enlace) return;
    e.preventDefault();
    cerrarSesion();
});