const jwt = require('jsonwebtoken');

// Generar App Token
const generateAppJWT = ( access = '' ) => {
    return new Promise( (resolve, reject) => {
        const payload = { access };
        const privateKey = process.env.SECRETPRIVATEKEY;
        jwt.sign( payload, privateKey, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateAppJWT
}