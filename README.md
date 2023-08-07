# Proyecto Personal - Challenge para Conexa

¡Bienvenido al repositorio de mi proyecto personal creado para el desafío de la empresa Conexa! Este proyecto ha sido diseñado para demostrar mis habilidades y conocimientos en el desarrollo de software. A continuación, se detalla cómo puedes ejecutar, desarrollar y probar el proyecto.

## Inicio Rápido

Sigue estos pasos para comenzar con el proyecto en tu máquina local:

1. Clona este repositorio: `git clone https://github.com/marcosgabriel2297/API.git ó git@github.com:marcosgabriel2297/API.git`
2. Navega a los directorios directorios del proyecto: `cd log-in` Y `cd business-logic`
3. Instala las dependencias en ambos proyectos: `npm install`
4. Levanta el proyecto: `npm start`

## Comandos Disponibles

A continuación se enumeran los comandos disponibles que puedes usar en este proyecto:

- `npm start`: Inicia el proyecto en modo de producción.
- `npm run dev`: Ejecuta el proyecto en modo de desarrollo, lo que permite recargar automática y dinámicamente los cambios realizados.
- `npm test`: Ejecuta las pruebas automatizadas para garantizar la calidad del código.
- `npm run tsc`: Compila el código fuente TypeScript a JavaScript.
- `npm run doc`: Genera y visualiza la documentación del proyecto.

## Configuración del Archivo .env

Para ejecutar correctamente el proyecto, debes configurar algunas variables de entorno en un archivo `.env`. A continuación se muestran ejemplos de las variables que debes definir en tu archivo `.env`:
### Proyecto log-in

```
.env
PORT=3000
BASE_URL=http://localhost:3000/api
SERVICE_USER_URL=http://localhost:3003/api
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=conexa-challenge
JWT_SECRET=secret


.env.test
PORT=3001
BASE_URL=http://localhost:3001/api
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=conexa-challenge-test
JWT_SECRET=secret
```

### Proyecto business-logic
```
.env
PORT=3003
BASE_URL=http://localhost:3003/api
LOGIN_BASE_URL=http://localhost:3000/api
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=conexa-challenge
JWT_SECRET=secret

.env.test
PORT=3004
BASE_URL=http://localhost:3004/api
LOGIN_BASE_URL=http://localhost:3004/api
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=conexa-challenge-test
JWT_SECRET=secret
```
## Contacto

Si tienes alguna pregunta o comentario sobre este proyecto, no dudes en contactarme. Puedes encontrarme en <marcosgabriel2297@gmail.com> o en mis redes sociales.

¡Espero que disfrutes explorando este proyecto tanto como yo disfruté desarrollándolo! ¡Gracias por tu interés y consideración!

© 2023 Marcos Vera

