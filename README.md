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
│   ├── img/                     # Imágenes del proyecto
│   │   ├── logo/                # Logotipo, isotipo, favicon
│   │   ├── landing/             # Banners y visuales de la bienvenida
│   │   ├── team/                # Fotos del equipo para "Acerca de"
│   │   └── placeholders/        # Imágenes de prueba para fauna/flora en el feed
│   │
│   └── docs/                    # En lugar de carpetas sueltas como "desarrollo"
│       ├── backlog.md           # Tareas pendientes, historias de usuario
│       └── wireframes/          # Diagramas o bocetos si los tienen