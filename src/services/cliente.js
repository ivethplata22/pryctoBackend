const AppController = require('../controllers/appController');
const { sequelize } = require('../../config/db');

class ClienteService extends AppController {

    constructor() {
        super();

        this.crearCliente = this.crearCliente.bind(this);
    }

    // C R U D

    // C - Crear Cliente
    // solicitudCreditoCompleto - credito controller
    // solicitudesCredito - credito controller
    async crearCliente(uuidcliente, nombre, email, telefono, direccion, ingresomensual) {
        try {
            const [ results ] = await sequelize.query(
                'CALL insertar_cliente(:uuid_cliente, :nombre_cliente, :email, :telefono, :direccion, :ingreso_mensual, :fecha_registro)', {
                replacements: {
                    uuid_cliente: uuidcliente,
                    nombre_cliente: nombre,
                    email,
                    telefono,
                    direccion,
                    ingreso_mensual: ingresomensual,
                    fecha_registro: new Date()
                }
            });

            return { ok: true, id_cliente: results.id_cliente };
        } catch (error) {
            console.log(error);
            return { ok: false, msg: 'Error del Servidor', server: 'Service' };
        }
    }
}

module.exports = ClienteService;