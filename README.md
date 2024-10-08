# API NODE

## Versión de Node

    v20.12.0

## Versión de NPM

    10.5.0

## Versión de XAMPP

    XAMPP Control Panel v3.2.2

## Notas de instalación

La carpeta node_modules se puede borrar y para volver a instalar las dependencias usar el siguiente comando en la raíz del proyecto:

    npm install

Crear un archivo .env en la raíz del proyecto y agregar los puertos que desee usar.

    PORT="PUERTO DEL BACKEND"
    SECRETPRIVATEKEY="CLAVE SECRETA"
    NODE_ENV="MODO DESARROLLO"
    CORS="URL que tiene acceso a la API"

Crear un archivo en la carpeta config llamado db.json donde se pondrán los datos necesarios para establecer conexión con las bases de datos en el ambiente de desarrollo y producción.

    {
        "development": {
            "user": "usuario",
            "host": "host",
            "database": "base de datos",
            "password": "contraseña",
            "port": 3306,
            "dialect": "mysql",
            "timezone": "-06:00"
        },
        "production": {
            "user": "usuario",
            "host": "host",
            "database": "base de datos",
            "password": "contraseña",
            "port": 3306,
            "dialect": "mysql",
            "timezone": "-06:00"
        }
    }

## Iniciar el backend

En la raíz del proyecto ejecutar:

    npm start

## Pruebas unitarias

En la raíz del proyecto ejecutar:

    npm test

## Distribución de carpetas

Dentro se encuentran las pruebas unitarias.

    __tests__

Configuración y conexión de base de datos.

    config

Modulos de Node.

    node_modules

Controladores donde se llevan a cabo las actividad principal del endpoint.

    controllers

Generadores y validadores de tokens.

    helpers

Validaciones de datos para los endpoints de la aplicación.

    middlewares

Modelos de la base de datos y sus relaciones.

    models

Rutas de la aplicación con las que se construyen los endpoints. Aquí se hacen las validaciones de acceso y separación por roles.

    routes

Consultas a base de datos. Funciones que se usan en varias partes del código. Suelen ser C R U D específicos.

    services

## Archivos

Archivo donde empieza el proyecto.

    app.js

Archivo con configuraciones principales del servidor

    server.js

Babel permite escribir código más reciente de JavaScript (ES6+, ESNext) y transformarlo en una versión más antigua que sea compatible con una amplia gama de navegadores y entornos.

    .babelrc

Archivo que contiene las variables globales del proyecto.

    .env

Archivos ignorados para almacenar en repositorio.

    .gitignore

Se especifica las rutas de los directorios donde Sequelize buscará y generará archivos relacionados con migraciones.

    .sequelizerc

Packages donde se almacenan las dependencias y sus versiones en el proyecto.

    package-lock.json
    package.json

Archivo con sintaxis de la Base de Datos

    DB.sql

Archivo con sintaxis de Store Procedures

    SP.sql