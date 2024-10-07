const jwt = require('jsonwebtoken');

// Validamos el App Token
const validateAppJWT = async (apptoken) => {
    try {
        const privateKey = process.env.SECRETPRIVATEKEY;

        // Extraemos el contenido del token
        const { access } = jwt.verify(apptoken, privateKey);

        // Validamos que tenga datos
        if(!access)
            return { ok: false, msg: 'Sin datos' };

        // Validamos el acceso
        if( access !== 'P_ajdsty4-u45:kd_A' )
            return { ok: false, msg: 'Acceso denegado' };

        return { ok: true };
    } catch (error) {
        return { ok: false, msg: 'Error al validar JWT App' };
    }
}

module.exports = {
    validateAppJWT
}