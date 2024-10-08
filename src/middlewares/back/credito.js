const { check } = require('express-validator');
const { validateFields } = require('../validateFields');

// Helpers y Middlewares
const FunctionsValidate = require('../functions');
const DataBaseValidate = require('../database');
const functionsV = new FunctionsValidate();
const databaseV = new DataBaseValidate();

// Validaciones
const MiddleCredito = {
    soliCompleta: [
        check('nombre', 'El nombre del cliente es obligatorio').notEmpty(),
        check('email', 'El correo electronico es obligatorio').notEmpty(),
        check('telefono', 'El numero de telefono es obligatorio').notEmpty(),
        check('direccion', 'La direccion es obligatoria').notEmpty(),
        check('ingresomensual', 'El ingreso mensual es obligatorio').notEmpty(),
        check('id_sucursal', 'El id de la sucursal es obligatorio').notEmpty(),
        check('monto', 'El monto solicitado es obligatorio').notEmpty(),
        check('plazo', 'Plazo a meses en que se pagara').notEmpty(),
        validateFields,
        functionsV.validarCorreo,
        functionsV.validarTelefono,
        databaseV.existeSucursalID
    ],
    solicitud: [
        check('uuidcliente', 'El identificador de cliente es obligatorio').notEmpty(),
        check('id_sucursal', 'El id de la sucursal es obligatorio').notEmpty(),
        check('monto', 'El monto solicitado es obligatorio').notEmpty(),
        check('plazo', 'Plazo a meses en que se pagara').notEmpty(),
        validateFields,
        databaseV.existeClienteUUID,
        databaseV.existeSucursalID
    ],
    solicitudesCredito: [
        check('solicitudes', 'El arreglo de solicitudes es obligatorio').notEmpty(),
        validateFields,
        functionsV.validarEstructuraValida
    ],
    obtenerSolicitudes: [
        check('id_cliente', 'El id del cliente es obligatorio').notEmpty(),
        validateFields,
        databaseV.existeClienteID
    ]
};

module.exports = MiddleCredito;