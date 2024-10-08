const { check } = require('express-validator');
const { validateFields } = require('../validateFields');

// Helpers y Middlewares
const FunctionsValidate = require('../functions');
const DataBaseValidate = require('../database');
const functionsV = new FunctionsValidate();
const databaseV = new DataBaseValidate();

// Validaciones
const MiddleCliente = {
    obtenerCliente: [
        check('id_cliente', 'El id del cliente es obligatorio').notEmpty(),
        validateFields,
        databaseV.existeClienteID
    ],
    actualizarCliente: [
        check('id_cliente', 'El id del cliente es obligatorio').notEmpty(),
        check('nombre', 'El nombre del cliente es obligatorio').notEmpty(),
        check('email', 'El correo electronico es obligatorio').notEmpty(),
        check('telefono', 'El numero de telefono es obligatorio').notEmpty(),
        check('direccion', 'La direccion es obligatoria').notEmpty(),
        check('ingresomensual', 'El ingreso mensual es obligatorio').notEmpty(),
        validateFields,
        databaseV.existeClienteID,
        functionsV.validarCorreo,
        functionsV.validarTelefono
    ],
};

module.exports = MiddleCliente;