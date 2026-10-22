# Code-Cells - InstaRama

## Estructura del proyecto

```
├── README.md
├── index.html                          # Landing page / Bienvenida
│
├── pages/                              # Vistas secundarias
│   ├── login.html                      # Inicio de sesión
│   ├── registro.html                   # Registro de usuario
│   ├── feed.html                       # Muro social
│   ├── objetos.html                    # Feed de objetos / observaciones
│   ├── publicacion.html                # Crear publicación
│   ├── gestionarPublicaciones.html     # Editar / eliminar publicaciones propias
│   ├── perfil.html                     # Perfil del usuario
│   ├── reinos.html                     # Clasificación de los reinos
│   ├── buscar-reino.html               # Identificación rápida de reinos
│   ├── contacto.html                   # Formulario de contacto
│   ├── acercaDe.html                   # Misión, visión y equipo
│   ├── proyecto.html                   # Información del proyecto
│   └── testRenderHeaderFooter.html     # Página de prueba del header/footer
│
├── assets/
│   ├── css/
│   │   ├── base/                       # Estilos compartidos por varias páginas
│   │   │   ├── global.css              # Reset, fuentes y estilos comunes
│   │   │   ├── paleta.css              # Paleta oficial de colores
│   │   │   ├── styles.css              # Header, footer y layout general
│   │   │   ├── contactanos.css         # Estilos del layout que inyecta render.js
│   │   │   ├── alerts.css              # Alertas personalizadas
│   │   │   └── form.css                # Formularios
│   │   │
│   │   └── pages/                      # Un archivo por página
│   │       ├── index.css · landing.css
│   │       ├── login.css · registro.css · auth.css
│   │       ├── feed.css · objetos.css
│   │       ├── publicacion.css · gestionarPublicacion.css · perfil.css
│   │       ├── clasificacion.css · identificacion-reinos.css
│   │       └── acercaDe.css
│   │
│   ├── js/
│   │   ├── core/                       # Lógica compartida por todas las páginas
│   │   │   ├── main.js                 # Cursor personalizado y comportamiento general
│   │   │   ├── render.js               # Inyecta header, footer y estilos comunes
│   │   │   ├── plantillasLayout.js     # Plantillas HTML del header/footer
│   │   │   └── utils.js                # Helpers (sesión, nombre de página, etc.)
│   │   │
│   │   ├── pages/                      # Lógica específica de cada página
│   │   │   ├── login.js · registro.js
│   │   │   ├── feed_objeto.js · categorias.js · objetos_publicacion.js
│   │   │   ├── publicacion.js · gestionarPublicacion.js · perfil.js
│   │   │   ├── reinos.js · clasificacion.js · identificacion-reinos.js
│   │   │   ├── validacionForm.js · formulario-mandar-cor.js
│   │   │   └── carrusel.js
│   │   │
│   │   └── Services/                   # Llamadas a la API
│   │       ├── AuthService.js · UserService.js
│   │       ├── PostService.js · CommentService.js · ReportService.js
│   │       └── KingdomService.js · ContactFormService.js
│   │
│   └── img/                            # Imágenes agrupadas por página o uso
│       ├── general/                    # Recursos generales (Cursor/, etc.)
│       ├── logo/                       # Logotipos
│       ├── icons/                      # Íconos
│       ├── mode-clear/ · mode-dark/    # Variantes de logo por tema
│       ├── landing/                    # Fondo y fotos del equipo
│       ├── acercaDe/ · conocenos/
│       ├── clasificacion/ · objetos/
│       ├── publicacion/ · registro/
│       └── alerts/
│
└── utils/
    └── alerts.js                       # Sistema de alertas
```

# GIT
#### Notas para los commits

* Feat: Nueva funcionalidad
* Fix: Correcion de un error
* refactor: Mejoras en el codigo sin cambiar su comportamiento 
* docs: Documentacion
* test: tests
* Chore: Mantenimiento o Configuracion

### Un buen commit ayuda a entender que cambio y porque