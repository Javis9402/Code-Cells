/* ==========================================
   Java Scrip 
   CRUD de POST - feed.html
   ========================================== */

// Espera a que el HTML cargue completamente
document.addEventListener('DOMContentLoaded', function () {
   // Variables formulario
   const inputArchivo = document.getElementById('formFile');
   const imagenPreview = document.getElementById('imagenPreview');
   const textarea = document.getElementById('floatingTextarea');
   const selectCategoria = document.getElementById('selectCategoria');
   const selectSubCategoria = document.getElementById('selectSubCategoria')
   const contenedorSubCategoria = document.getElementById('contenedorSubCategoria');
   const formulario = document.getElementById('formularioPublicacion');

   // Variables alertas
   const alertaExito = document.getElementById('alertaExito');
   const alertaAdvertencia = document.getElementById('alertaAdvertencia');
   const alertaError = document.getElementById('alertaError');
   const alertaCategoria = document.getElementById('alertaCategoria');

   // Variables publicación terminada
   const contenedorFormulario = document.getElementById('contenedorFormulario');
   const contenedorPublicacionTerminada = document.getElementById('contenedorPublicacionTerminada');
   const imagenPublicada = document.getElementById('imagenPublicada');
   const textoPublicado = document.getElementById('textoPublicado');
   const insigniaCategoria = document.getElementById('insigniaCategoria');

   // Botones
   const btnCancelarPrincipal = document.getElementById('btnCancelarPrincipal');  // Botón cancelar gris
   const btnConfirmarCancelar = document.getElementById('btnConfirmarCancelar'); // Botón cancelar rojo

   // Lógica Categoría
   if (selectCategoria) {
      selectCategoria.addEventListener('change', function () {
         // Si elige Animalia, se vuelve obligatorio
         if (selectCategoria.value === 'Animalia') {
            contenedorSubCategoria.classList.remove('d-none');
            selectSubCategoria.setAttribute('required', 'true');
         } else {
            // Si elige otra opción, deja de ser obligatorio
            contenedorSubCategoria.classList.add('d-none');
            selectSubCategoria.removeAttribute('required');
            selectSubCategoria.value = '';
         }
      });
   }

   // Función ocultar alertas
   function ocultarAlertas() {
      if (alertaExito) { alertaExito.classList.add('d-none'); alertaExito.classList.remove('d-flex', 'show'); }
      if (alertaAdvertencia) { alertaAdvertencia.classList.add('d-none'); alertaAdvertencia.classList.remove('d-flex', 'show'); }
      if (alertaError) { alertaError.classList.add('d-none'); alertaError.classList.remove('d-flex', 'show'); }
      if (alertaCategoria) { alertaCategoria.classList.add('d-none'); alertaCategoria.classList.remove('d-flex', 'show') }
   }

   // Lectura del usuario
   let userLogged = localStorage.getItem('usuarioActual');
   if (!userLogged) {
      userLogged = "Explorador_Bótanico";
   }
   const nombreEncabezado = document.getElementById('nombreUsuarioEncabezado');
   const nombreCuerpo = document.getElementById('nombreUsuarioCuerpo');
   if (nombreEncabezado && nombreCuerpo) {
      nombreEncabezado.textContent = userLogged;
      nombreCuerpo.textContent = userLogged;
   }

   // Lógica principal
   if (inputArchivo && imagenPreview) {
      // Guarda la ruta de la imagen predeterminada por si el usuario cancela
      const rutaPredeterminada = imagenPreview.src;

      // Lógica cuando el usuario elige un archivo
      inputArchivo.addEventListener('change', function (e) {
         const archivo = e.target.files[0];

         if (archivo) {
            // Al seleccionar un archivo, se crea una URL temporal y reemplaza la imagen
            const urlTemporal = URL.createObjectURL(archivo);
            imagenPreview.src = urlTemporal;
         } else {
            // Si abrió la ventana pero después cancela, se restaura la imagen predeterminada
            imagenPreview.src = rutaPredeterminada;
         }
      });

      // Lógica botón "Cancelar" en el formulario
      if (btnCancelarPrincipal) {
         btnCancelarPrincipal.addEventListener('click', function () {
            // Verifica si hay un archivo cargado o texto escrito
            const tieneArchivo = inputArchivo.value !== '';
            // .trim() borra los espacios en blanco
            const tieneTexto = textarea.value.trim() !== '';
            const tieneCategoria = selectCategoria.value !== '';

            if (tieneArchivo || tieneTexto) {
               // Si el usuario modificó algo, se llama al Modal
               const modalElement = document.getElementById('modalCancelar');
               const modalBootstrap = new bootstrap.Modal(modalElement);
               modalBootstrap.show();
            } else {
               // Si está totalmente vació, manda directo al feed
               window.location.href = '../pages/feed.html';
            }
         });
      }

      // Lógica para el botón "confirmar cancelación" en el Modal
      if (btnConfirmarCancelar) {
         btnConfirmarCancelar.addEventListener('click', function () {
            // Restaurar imagen predeterminada
            imagenPreview.src = rutaPredeterminada;
            // Vaciar el input para que olvide el archivo que el usuario eligió
            inputArchivo.value = '';
            // Vaciar el texto de la descripción
            if (textarea) textarea.value = ''; // Medida de seguridad extra
            if (selectCategoria) selectCategoria.value = '';
            if (selectSubCategoria) selectSubCategoria.value = '';
            // Redirección al feed
            window.location.href = '../pages/feed.html';
         });
      }

      // Lógica envío de formulario
      if (formulario) {
         formulario.addEventListener('submit', function (e) {
            // Previene que la página se recargue
            e.preventDefault();
            // Oculta alertas abiertas
            ocultarAlertas();

            // Lee datos del usuario
            const tieneArchivo = inputArchivo.value !== '';
            const tieneTexto = textarea.value.trim() !== '';
            const tieneCategoria = selectCategoria.value != '';

            // Si requiere subcategoria y se eligió
            const requiereSubCategoria = selectCategoria.value === 'Animalia';
            const tieneSubCategoria = selectSubCategoria.value !== '';

            // Validaciones
            if (!tieneArchivo) {
               // Alerta roja: Falta foto
               alertaError.classList.remove('d-none');
               alertaError.classList.add('d-flex', 'show');
            }
            else if (!tieneCategoria) {
               // Alerta azul: Sin clasificar
               alertaCategoria.querySelector('div').textContent = '¡Por favor elige la categoria de tu descubrimiento!';
               alertaCategoria.classList.remove('d-none');
               alertaCategoria.classList.add('d-flex', 'show');
            }
            else if (requiereSubCategoria && !tieneSubCategoria) {
               alertaCategoria.querySelector('div').textContent = '¡No olvides clasificar tu descubrimiento!';
               alertaCategoria.classList.remove('d-none');
               alertaCategoria.classList.add('d-flex', 'show');
            }
            else if (!tieneTexto) {
               // Alerta amarilla: Falta descripción
               alertaAdvertencia.classList.remove('d-none');
               alertaAdvertencia.classList.add('d-flex', 'show');
            }
            else {
               // Lógica de éxito
               if (contenedorFormulario && contenedorPublicacionTerminada && imagenPublicada && textoPublicado && insigniaCategoria) {
                  // Inserta la imagen y texto de la publicación
                  imagenPublicada.src = imagenPreview.src;
                  textoPublicado.textContent = textarea.value;

                  // Si eligió Animalia se mostrará con la subcategoría
                  if (selectCategoria.value === 'Animalia') {
                     insigniaCategoria.textContent = `Animalia - ${selectSubCategoria.value}`;
                  } else {
                     // Limpia el texto de la opción elegida
                     insigniaCategoria.textContent = selectCategoria.value;
                  }

                  // Oculta el formulario y muestra la publicación terminada
                  contenedorFormulario.classList.add('d-none');
                  contenedorPublicacionTerminada.classList.remove('d-none');
               }

               // Alerta de éxito
               alertaExito.classList.remove('d-none');
               alertaExito.classList.add('d-flex', 'show');

               // Objeto JavaScript (JSON)


               // Limpia formulario automáticamente
               formulario.reset();
               // Oculta el menú de SubCategoría
               contenedorSubCategoria.classList.add('d-none');

               // Espera 2 segundos y redirige al muro
               setTimeout(function () {
                  window.location.href = '../pages/feed.html';
               }, 4000);

            }
         });
      }
   }
});
