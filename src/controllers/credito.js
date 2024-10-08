const { request, response } = require("express");
const { sequelize } = require('../../config/db');
const AppController = require("./appController");
const ClienteService = require('../services/cliente');
const CreditoService = require('../services/credito');
const clienteS = new ClienteService();
const creditoS = new CreditoService();

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
            const { nombre, email, telefono, direccion, ingresomensual, id_sucursal, monto, plazo } = req.body;
            const uuidCliente = Math.random().toString(36).substring(2, 8).toUpperCase();
            let tasaBase = 0.1; // Interes anual

            // Crear registro cliente
            let response = await clienteS.crearCliente(uuidCliente, nombre, email, telefono, direccion, ingresomensual);
            if(!response.ok)
                return res.status(400).json({msg: 'Error al crear cliente'});

            const { id_cliente } = response;

            // Criterios de validación
            const ingresosRequeridos = monto / 3;
            const estadoSolicitud = (ingresomensual < ingresosRequeridos) ? "rechazado" : "aprobado";
            tasaBase = (ingresomensual < monto / 3) ? tasaBase += 0.05 : (ingresomensual < monto) ? tasaBase += 0.03 : 0.1;

            // Crear registro solicitud
            response = await creditoS.crearSolicitud(id_cliente, id_sucursal, monto, plazo, tasaBase, estadoSolicitud);
            if(!response.ok)
                return res.status(400).json({msg: 'Error al crear la solicitud de crédito'});

            return res.status(200).json({msg: 'Solicitud completada con éxito', estadoSolicitud});
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }

    // C - Crear solicitud de crédito - Usuario cargado
    async solicitudCredito(req = request, res = response) {
        try {
            const { id_sucursal, monto, plazo } = req.body;
            const { ingreso_mensual: ingresomensual, id_cliente } = req.body.cliente;
            let tasaBase = 0.1; // Interes anual

            // Criterios de validación
            const ingresosRequeridos = monto / 3;
            const estadoSolicitud = (ingresomensual < ingresosRequeridos) ? "rechazado" : "aprobado";
            tasaBase = (ingresomensual < monto / 3) ? tasaBase += 0.05 : (ingresomensual < monto) ? tasaBase += 0.03 : 0.1;

            // Crear registro solicitud
            const response = await creditoS.crearSolicitud(id_cliente, id_sucursal, monto, plazo, tasaBase, estadoSolicitud);
            if(!response.ok)
                return res.status(400).json({msg: 'Error al crear la solicitud de crédito'});

            return res.status(200).json({msg: 'Solicitud completada con éxito', estadoSolicitud});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }

    // C - Crear varias solicitudes de crédito
    async solicitudesCredito(req = request, res = response) {
        const { solicitudes } = req.body;
        const transaccion = await sequelize.transaction();

        try {
            const resultados = await Promise.all(solicitudes.map(async (solicitud) => {
                console.log(solicitud);
                const { nombre, email, telefono, direccion, ingresomensual, id_sucursal, monto, plazo } = solicitud;
                const uuidCliente = Math.random().toString(36).substring(2, 8).toUpperCase();
                let tasaBase = 0.1; // Interés anual
    
                // Crear registro cliente
                let response = await clienteS.crearCliente(uuidCliente, nombre, email, telefono, direccion, ingresomensual);
                if (!response.ok)
                    throw new Error('Error al crear cliente'); // Lanzar error si la creación del cliente falla
    
                const { id_cliente } = response;
    
                // Criterios de validación
                const ingresosRequeridos = monto / 3;
                const estadoSolicitud = (ingresomensual < ingresosRequeridos) ? "rechazado" : "aprobado";
                tasaBase = (ingresomensual < monto / 3) ? tasaBase += 0.05 : (ingresomensual < monto) ? tasaBase += 0.03 : 0.1;
    
                // Crear registro solicitud
                response = await creditoS.crearSolicitud(id_cliente, id_sucursal, monto, plazo, tasaBase, estadoSolicitud);
                if (!response.ok) {
                    throw new Error('Error al crear la solicitud de crédito'); // Lanzar error si la creación de la solicitud falla
                }
    
                return { id_cliente, estadoSolicitud }; // Devolver información útil
            }));

            await transaccion.commit();
            return res.status(200).json({ msg: 'Todas las solicitudes completadas con éxito', resultados });
        } catch (error) {
            await transaccion.rollback();
            console.log(error);
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