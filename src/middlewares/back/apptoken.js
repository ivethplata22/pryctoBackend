const { check } = require('express-validator');
const { validateFields } = require('../validateFields');

// Helpers y Middlewares

// Validaciones
const MiddleAppToken = {
    create: [
        check('access', 'El place es obligatorio').notEmpty(),
        validateFields
    ],
};

module.exports = MiddleAppToken;