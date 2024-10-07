const { request, response } = require("express");
const { validateAppJWT } = require('../helpers/validateJWT');

// Validar el App Token
const validateAppToken = async ( req = request, res = response, next ) => {
    try {
        const apptoken = req.headers.apptoken;

        // Verificar el token
        if(!apptoken)
            return res.status(400).json({msg: 'Error del Servidor', server: 'Introduce un token app de acceso'});

        // Validamos el token
        const response = await validateAppJWT(apptoken);
        if(!response.ok)
            return res.status(400).json({msg: 'Error de acceso', server: response.msg});

        next();
    } catch (error) {
        return res.status(500).json({msg: 'Error del Servidor', server: 'Middleware'});
    }
}

module.exports = {
    validateAppToken
}