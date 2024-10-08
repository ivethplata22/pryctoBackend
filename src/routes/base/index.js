const { Router } = require('express');

// Controller
const CreditoController = require('../../controllers/credito');
const ClienteController = require('../../controllers/cliente');
const credito = new CreditoController();
const cliente = new ClienteController();

// Middlewares
const MiddleCredito = require('../../middlewares/back/credito');
const MiddleCliente = require('../../middlewares/back/cliente');

const router = Router();

// Ruta localhost:PORT/b

// C - Crear solicitud de crédito - Datos Completos
router.post('/solicitudCreditoCompleto', MiddleCredito.soliCompleta, credito.solicitudCreditoCompleto);

// C - Crear solicitud de crédito - Usuario cargado
router.post('/solicitudCredito', MiddleCredito.solicitud, credito.solicitudCredito);

// C - Crear varias solicitudes de crédito
router.post('/solicitudesCredito', MiddleCredito.solicitudesCredito, credito.solicitudesCredito);

// R - Obtener solicitudes de crédito por ID Cliente
router.get('/solicitudes/:id_cliente', MiddleCredito.obtenerSolicitudes, credito.obtenerSolicitudes);

// R - Obtener Cliente por ID
router.get('/cliente/:id_cliente', MiddleCliente.obtenerCliente, cliente.obtenerCliente);

// U - Actualizar datos de un Cliente
router.put('/actualizar/:id_cliente', MiddleCliente.actualizarCliente, cliente.actualizarCliente);

module.exports = router;