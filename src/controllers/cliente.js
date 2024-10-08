const { request, response } = require("express");
const AppController = require("./appController");

class ClienteController extends AppController {

    constructor() {
        super();

        this.actualizarCliente = this.actualizarCliente.bind(this);
    }

    // U - Actualizar datos de un Cliente
    async actualizarCliente(req = request, res = response) {
        try {
            return res.status(200).json({msg: 'Cliente actualizado con éxito'});
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }
}

module.exports = ClienteController;