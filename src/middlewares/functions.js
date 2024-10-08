const { request, response } = require("express");
const AppController = require("../controllers/appController");

class FunctionsValidate extends AppController {

    constructor() {
        super();

        // Funciones de validación
        this.validarCorreo = this.validarCorreo.bind(this);
        this.validarTelefono = this.validarTelefono.bind(this);
        this.validarEstructuraValida = this.validarEstructuraValida.bind(this);
    }

    // Validar un correo
    validarCorreo = async ( req = request, res = response, next ) => {
        try {
            const { email } = req.body;

            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const correoValido = regex.test(email);

            if(!correoValido)
                return res.status(400).json({msg: 'Ingresa un correo con el formato válido'});

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Error del Servidor', server: 'Middleware'});
        }
    }

    // Validar un numero telefonico
    validarTelefono = async ( req = request, res = response, next ) => {
        try {
            const { telefono } = req.body;

            const regex = /^\d{10}$/;
            const telefonoValido = regex.test(telefono);

            if(!telefonoValido)
                return res.status(400).json({msg: 'Ingresa un número telefónico con el formato válido (10 digitos)'});

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Error del Servidor', server: 'Middleware'});
        }
    }

    // Validar estructura valida - Solicitudes Credito
    validarEstructuraValida = async ( req = request, res = response, next ) => {
        try {
            const { solicitudes } = req.body;
            const regexTel = /^\d{10}$/;
            const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const newArraySolicitudes = [];
            let band = 0;
            
            for (let solicitud of solicitudes) {
                
                // Validar los datos
                if (
                    !solicitud.nombre ||
                    !solicitud.email ||
                    !regexCorreo.test(solicitud.email) ||
                    !solicitud.telefono ||
                    !regexTel.test(solicitud.telefono) ||
                    !solicitud.direccion ||
                    typeof solicitud.ingresoM !== 'number' ||
                    typeof solicitud.monto !== 'number' ||
                    typeof solicitud.plazo !== 'number' ||
                    typeof solicitud.id_sucursal !== 'number'
                ) {
                    band = 1;
                    break;
                }
            
                // Valida la sucursal
                const sucursal = await this.models.Sucursal.findOne({
                    where: {
                        id_sucursal: solicitud.id_sucursal
                    }
                });
            
                if(!sucursal) {
                    band = 2;
                    break;
                }
            
                // Construir nuevo array de solicitudes
                newArraySolicitudes.push({
                    nombre: solicitud.nombre,
                    email: solicitud.email,
                    telefono: solicitud.telefono,
                    direccion: solicitud.direccion,
                    ingresoM: solicitud.ingresoM,
                    id_sucursal: solicitud.id_sucursal,
                    monto: solicitud.monto,
                    plazo: solicitud.plazo
                });
            }

            if(band === 1)
                return res.status(400).json({ msg: 'Error en el formato de las solicitudes' });

            if(band === 2)
                return res.status(400).json({msg: 'No se encontró alguna sucursal'});

            req.body.solicitudes = [...newArraySolicitudes];

            return res.status(200).json({msg: '', solicitudes});

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Error del Servidor', server: 'Middleware'});
        }
    }
}

module.exports = FunctionsValidate;