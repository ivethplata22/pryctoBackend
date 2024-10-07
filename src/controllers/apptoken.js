const { request, response } = require("express");
const { generateAppJWT } = require('../helpers/generateJWT');
const AppController = require("./appController");

class AppTokenController extends AppController {

    constructor() {
        super();
        
        this.createAppToken = this.createAppToken.bind(this);
    }

    // Crear App Token
    async createAppToken(req = request, res = response) {
        try {
            const { access } = req.params;

            // Validar acceso
            if( access !== 'P_ajdsty4-u45:kd_A' )
                return res.status(400).json({msg: 'Error de acceso'});

            // Generar App Token
            const apptoken = await generateAppJWT(access);

            return res.status(200).json({msg: 'App token generado con éxito', apptoken});
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }
}

module.exports = AppTokenController;