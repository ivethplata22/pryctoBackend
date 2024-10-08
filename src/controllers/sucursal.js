const { request, response } = require("express");
const AppController = require("./appController");
const SucursalService = require('../services/sucursal');
const sucursalS = new SucursalService();

class SucursalController extends AppController {

    constructor() {
        super();

        this.obtenerSucursales = this.obtenerSucursales.bind(this);
    }

    // R - Obtener Sucursales
    async obtenerSucursales(req = request, res = response) {
        try {
            const response = await sucursalS.obtenerSucursales();

            if(!response.ok)
                return res.status(400).json({msg: 'Error al obtener sucursales'});

            return res.status(200).json(response.sucursales);
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Controller'});
        }
    }
}

module.exports = SucursalController;