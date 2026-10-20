# Code-Cells - InstaRama


        ├── .gitignore
        ├── README.md
        ├── index.html                   # Página 1: Landing Page / Bienvenida
        │
        ├── pages/                       # Vistas secundarias organizadas
        │   ├── login.html               # Página 2: Inicio de sesión
        │   ├── registro.html            # Página 3: Registro de usuario
        │   ├── feed.html                # Página 4: Inicio / Muro social
        │   ├── contacto.html            # Página 5: Formulario de contacto
        │   ├── acerca-de.html           # Página 6: Misión, visión y equipo
        │   └── publicacion.html         # Página 7: Formulario de CRUD (Crear/Editar/Ver)
        │
        ├── assets/
        │   ├── css/
        │   │   ├── global.css           # Variables de color, fuentes, reset, estilos comunes
        │   │   ├── landing.css          # Estilos específicos de index.html
        │   │   ├── auth.css             # Estilos compartidos para login y registro
        │   │   ├── feed.css             # Estilos de los posts, cards y feed
        │   │   └── form.css             # Estilos para formularios (contacto y publicaciones)
        │   │
        │   ├── js/
        │   │   ├── main.js              # Lógica compartida (navbar responsivo, footer, helpers)
        │   │   ├── auth.js              # Validación de contraseñas, login, registro en LocalStorage
        │   │   ├── feed.js              # Render de publicaciones, likes, comentarios
        │   │   ├── publicacion.js       # CRUD de posts (guardar imagen, editar, eliminar con modal)
        │   │   └── contacto.js          # Validación del formulario de contacto
        │   │
        │   └── img/                     # Imágenes del proyecto
        │       ├── general/
        │       │    └── logo/           # Logotipo, isotipo, favicon
        │       ├── landing/             # Banners y visuales de la bienvenida
        │       ├── team/                # Fotos del equipo
        │       ├── placeholders/        # Imágenes de prueba para fauna/flora en el feed
        │       └──              # Recusos generales para todas las paginas
        │   

# GIT
#### Notas para los commits

* Feat: Nueva funcionalidad
* Fix: Correcion de un error
* refactor: Mejoras en el codigo sin cambiar su comportamiento 
* docs: Documentacion
* test: tests
* Chore: Mantenimiento o Configuracion

### Un buen commit ayuda a entender que cambio y porque