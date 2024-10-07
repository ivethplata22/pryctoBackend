const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../config/db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3010;

        // Conectar a Base de Datos
        this.conectarDB();

        // Validaciones
        this.middlewares();

        // Ruta principal de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    async middlewares() {
        // Configuración de acceso al api
        this.app.use( cors({
            origin: process.env.CORS, // Permitir solo el acceso desde esta URL
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
            credentials: true, // Permitir cookies
        }) );

        // Conversion y lectura del body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use('/',require('./routes/index.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}/`);
        });
    }

}

module.exports = Server;