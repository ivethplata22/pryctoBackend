// Damos acceso a las variables de entorno
require('dotenv').config();

// Instancia la clase server y ponemos en escucha el puerto de la aplicación
const Server = require('./server');
const server = new Server();
server.listen();