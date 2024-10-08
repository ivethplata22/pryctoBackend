const AppController = require('../controllers/appController');
const { sequelize } = require('../../config/db');

class SucursalService extends AppController {

    constructor() {
        super();

        this.obtenerSucursales = this.obtenerSucursales.bind(this);
    }

    // C R U D

    // R - Obtener Sucursales
    // obtenerSucursales - sucursal controller
    async obtenerSucursales() {
        try {
            const results = await sequelize.query('CALL obtener_sucursales()', {
                type: sequelize.QueryTypes.RAW
            });
    
            return { ok: true, sucursales: results };
        } catch (error) {
            console.log(error);
            return { ok: false, msg: 'Error del Servidor', server: 'Service' };
        }
    }
    
}

module.exports = SucursalService;