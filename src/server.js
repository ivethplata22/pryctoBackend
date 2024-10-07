const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3010;

        // Validaciones
        this.middlewares();
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

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}/`);
        });
    }

}

module.exports = Server;