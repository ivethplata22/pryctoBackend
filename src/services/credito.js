const AppController = require('../controllers/appController');
const { sequelize } = require('../../config/db');

class CreditoService extends AppController {

    constructor() {
        super();

        this.crearSolicitud = this.crearSolicitud.bind(this);
        this.obtenerSolicitudesClienteID = this.obtenerSolicitudesClienteID.bind(this);
    }

    // C R U D

    // C - Crear Solicitud
    // solicitudCreditoCompleto - credito controller
    // solicitudCredito - credito controller
    // solicitudesCredito - credito controller
    async crearSolicitud(id_cliente, id_sucursal, montosolicitado, plazomeses, tasainteres, estadosolicitud) {
        try {
            const [ results ] = await sequelize.query(
                'CALL insertar_solicitud(:id_cliente, :id_sucursal, :monto_solicitado, :plazo_meses, :tasa_interes, :estado_solicitud, :fecha_solicitud, :fecha_respuesta)', {
                    replacements: {
                        id_cliente,
                        id_sucursal,
                        monto_solicitado: montosolicitado,
                        plazo_meses: plazomeses,
                        tasa_interes: tasainteres,
                        estado_solicitud: estadosolicitud,
                        fecha_solicitud: new Date(),
                        fecha_respuesta: new Date()
                    }
                }
            );
    
            return { ok: true, id_solicitud: results.id_solicitud };
        } catch (error) {
            console.log(error);
            return { ok: false, msg: 'Error del Servidor', server: 'Service' };
        }
    }

    // R - Obtener Solicitudes por Cliente ID
    // obtenerSolicitudes - credito controller
    async obtenerSolicitudesClienteID(id_cliente) {
        try {
            const result = await sequelize.query('CALL obtenerSolicitudesPorCliente(:id_cliente)', {
                replacements: { id_cliente },
                type: sequelize.QueryTypes.RAW // Esto debería devolver todos los resultados
            });
    
            return { ok: true, solicitudes: result };
        } catch (error) {
            console.log(error);
            return { ok: false, msg: 'Error del Servidor', server: 'Service' };
        }
    }
}

module.exports = CreditoService;