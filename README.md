🖼️ WebAround: Galería de Arte con Autenticación

🔗 Visitar el sitio

Este proyecto es una galería de arte en línea donde usuarios pueden registrarse, iniciar sesión y compartir imágenes de lugares que representan sus raíces. El backend está construido con Node.js y Express, conectado a MongoDB. El frontend está desarrollado con React y Vite, usando React Router y React Hook Form.
🚀 Instalación

Clona el repositorio y ejecuta:

npm install

🧩 Frontend
🌟 Tecnologías Usadas

    React + Vite

    HTML5 semántico

    CSS (BEM, Flexbox, Grid, Position)

    JSX

    JavaScript moderno (ES6+)

    Git + GitHub

    GitHub Pages (despliegue anterior)

    Figma (diseño)

    React Router DOM

    React Hook Form

📦 Dependencias

"react": "^18.3.1",
"react-dom": "^18.3.1",
"react-hook-form": "^7.54.2",
"react-router-dom": "^7.3.0"

🛠️ DevDependencies

"@eslint/js": "^9.17.0",
"@types/react": "^18.3.18",
"@types/react-dom": "^18.3.5",
"@vitejs/plugin-react": "^4.3.4",
"eslint": "^9.17.0",
"eslint-plugin-react": "^7.37.2",
"eslint-plugin-react-hooks": "^5.0.0",
"eslint-plugin-react-refresh": "^0.4.16",
"globals": "^15.14.0",
"vite": "^6.0.5"

⚙️ Funcionalidad

    Registro e inicio de sesión

    Edición del perfil

    Visualización y carga de imágenes (tarjetas)

    Likes y eliminación de tarjetas

    Mantener sesión activa

    Cierre de sesión

    Validaciones con formularios controlados

🔧 Backend
🛠️ Tecnologías

    Node.js

    Express

    MongoDB + Mongoose

    dotenv

    Postman (pruebas)

    Google Cloud (despliegue)

    Git + GitHub

📦 Dependencias

"bcryptjs": "^3.0.2",
"celebrate": "^15.0.3",
"cors": "^2.8.5",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"express-winston": "^4.2.0",
"joi": "^17.13.3",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.10.1",
"validator": "^13.15.0",
"winston": "^3.17.0"

🧪 DevDependencies

"eslint": "^8.56.0",
"eslint-config-airbnb-base": "^15.0.0",
"eslint-plugin-import": "^2.31.0",
"nodemon": "^3.1.9"

⚙️ Funcionalidad

    API RESTful protegida por autenticación con JWT

    Controladores y middlewares organizados

    Validación robusta con Joi y Celebrate

    Manejo centralizado de errores

    Logging con Winston

    CORS y configuración segura

📡 Rutas de la API
Método	Ruta	Descripción
GET	/users/me	Obtener info del usuario actual
GET	/cards	Obtener todas las tarjetas
POST	/signup	Registro de nuevo usuario
POST	/signin	Inicio de sesión
POST	/cards	Crear una nueva tarjeta
PATCH	/users/me	Actualizar nombre y descripción
PATCH	/users/me/avatar	Cambiar avatar del usuario
PUT	/cards/:cardId/likes	Dar like a una tarjeta
DELETE	/cards/:cardId	Borrar una tarjeta
DELETE	/cards/:cardId/likes	Quitar like de una tarjeta

✨ Características Adicionales

    Despliegue completo en Google Cloud VM con dominio personalizado

    Persistencia del servidor con PM2

    Configuración de HTTPS opcional

    Código estructurado y modular

👩‍💻 Autora

Sarah Handal
Frontend & Backend Developer | TripleTen Bootcamp

GitHub: @Seri-han
