const { validationResult } = require("express-validator");

// Validar los campos de entrada
const validateFields = ( req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.errors, msg: 'Faltan datos'});

    next();
}

module.exports = {
    validateFields
}