const { request, response } = require("express");
const AppController = require("./appController");
const ClienteService = require('../services/cliente');
const clienteS = new ClienteService();

class ClienteController extends AppController {

    constructor() {
        super();

        this.obtenerCliente = this.obtenerCliente.bind(this);
        this.actualizarCliente = this.actualizarCliente.bind(this);
    }

    // R - Obtener Cliente por ID
    async obtenerCliente(req = request, res = response) {
        try {
            const { cliente } = req.body;
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }

    // U - Actualizar datos de un Cliente
    async actualizarCliente(req = request, res = response) {
        try {
            const { id_cliente } = req.params;
            const { nombre, email, telefono, direccion, ingresomensual } = req.body;

            const response = await clienteS.actualizarCliente(id_cliente, nombre, email, telefono, direccion, ingresomensual);
            if(!response.ok)
                return res.status(400).json({msg: 'Error al actualizar los datos del cliente'});

            return res.status(200).json({msg: 'Datos del cliente actualizados con éxito'});
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }
}

module.exports = ClienteController;