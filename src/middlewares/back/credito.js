const { check } = require('express-validator');
const { validateFields } = require('../validateFields');

// Helpers y Middlewares

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
        validateFields
    ],
    solicitud: [
        check('uuidcliente', 'El identificador de cliente es obligatorio').notEmpty(),
        check('id_sucursal', 'El id de la sucursal es obligatorio').notEmpty(),
        check('monto', 'El monto solicitado es obligatorio').notEmpty(),
        check('plazo', 'Plazo a meses en que se pagara').notEmpty(),
        validateFields
    ],
    solicitudesCredito: [
        check('solicitudes', 'El arreglo de solicitudes es obligatorio').notEmpty(),
        validateFields
    ],
    obtenerSolicitudes: [
        check('id_cliente', 'El id del cliente es obligatorio').notEmpty(),
        validateFields
    ]
};

module.exports = MiddleCredito;