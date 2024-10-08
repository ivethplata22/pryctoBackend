const { request, response } = require("express");
const AppController = require("./appController");

class CreditoController extends AppController {

    constructor() {
        super();

        this.solicitudCreditoCompleto = this.solicitudCreditoCompleto.bind(this);
        this.solicitudCredito = this.solicitudCredito.bind(this);
        this.solicitudesCredito = this.solicitudesCredito.bind(this);
        this.obtenerSolicitudes = this.obtenerSolicitudes.bind(this);
    }

    // C - Crear solicitud de crédito - Datos Completos
    async solicitudCreditoCompleto(req = request, res = response) {
        try {
            const { nombre, email, telefono, direccion, ingresoM } = req.body;


            return res.status(200).json({msg: 'Solicitud completada con éxito'});
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }

    // C - Crear solicitud de crédito - Usuario cargado
    async solicitudCredito(req = request, res = response) {
        try {
            return res.status(200).json({msg: 'Solicitud completada con éxito'});
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }

    // C - Crear varias solicitudes de crédito
    async solicitudesCredito(req = request, res = response) {
        try {
            return res.status(200).json({msg: 'Solicitudes de crédito completadas con éxito'});
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }

    // G - Obtener solicitudes de crédito por ID Cliente
    async obtenerSolicitudes(req = request, res = response) {
        try {
            return res.status(200).json({msg: 'Mensaje'});
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }
}

module.exports = CreditoController;