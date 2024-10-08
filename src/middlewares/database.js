const { request, response } = require("express");
const AppController = require("../controllers/appController");

class DataBaseValidate extends AppController {

    constructor() {
        super();
        
        // Si existe por ID
        this.existeSucursalID = this.existeSucursalID.bind(this);
        this.existeClienteUUID = this.existeClienteUUID.bind(this);
        this.existeClienteID = this.existeClienteID.bind(this);
    }

    // Existe Sucursal Por ID
    existeSucursalID = async ( req = request, res = response, next ) => {
        try {
            const id_sucursal = (req.params.id_sucursal) ? req.params.id_sucursal : req.body.id_sucursal;

            const sucursal = await this.models.Sucursal.findOne({
                where: {
                    id_sucursal
                }
            });

            if(!sucursal)
                return res.status(400).json({msg: 'No se encontró la sucursal'});

            next();
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Middleware'});
        }
    }

    // Existe Cliente Por UUID
    existeClienteUUID = async ( req = request, res = response, next ) => {
        try {
            const uuidcliente = (req.params.uuidcliente) ? req.params.uuidcliente.toUpperCase() : req.body.uuidcliente.toUpperCase();

            const cliente = await this.models.Cliente.findOne({
                where: {
                    uuid_cliente: uuidcliente
                },
                attributes: {
                    exclude: ['created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt']
                }
            });

            if(!cliente)
                return res.status(400).json({msg: 'No se encontró el cliente'});

            req.body.cliente = JSON.parse(JSON.stringify(cliente));

            next();
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Middleware'});
        }
    }

    // Existe Cliente Por ID
    existeClienteID = async ( req = request, res = response, next ) => {
        try {
            const id_cliente = (req.params.id_cliente) ? req.params.id_cliente : req.body.id_cliente;

            const cliente = await this.models.Cliente.findOne({
                where: {
                    id_cliente
                },
                attributes: {
                    exclude: ['created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt']
                }
            });

            if(!cliente)
                return res.status(400).json({msg: 'No se encontró el cliente'});

            req.body.cliente = JSON.parse(JSON.stringify(cliente));

            next();
        } catch (error) {
            return res.status(500).json({msg: 'Error del Servidor', server: 'Middleware'});
        }
    }

}

module.exports = DataBaseValidate;