const models = require('../models/index');

class AppController {

    constructor() {
        // Configuración de los modelos
        this.models = models;
    }

}

module.exports = AppController;