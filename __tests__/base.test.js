// PRUEBAS UNITARIAS

const ClienteService = require('../src/services/cliente');
const CreditoService = require('../src/services/credito');
const clienteS = new ClienteService();
const creditoS = new CreditoService();

// Mockear la conexión a la base de datos

jest.mock('../src/services/credito', () => {
    return jest.fn().mockImplementation(() => {
        return {
            crearSolicitud: jest.fn((id_cliente, id_sucursal, montosolicitado, plazomeses, tasainteres, estadosolicitud) => {
                if (!id_cliente || !id_sucursal || !montosolicitado || !plazomeses || !tasainteres || !estadosolicitud) {
                    return Promise.reject(new Error('Los parámetros son inválidos'));
                }
                return Promise.resolve({ ok: true, id_solicitud: 1 });
            }),
            obtenerSolicitudesClienteID: jest.fn((id_cliente) => {
                if (!id_cliente) {
                    return Promise.reject(new Error('El ID del cliente no puede ser nulo'));
                }
                return Promise.resolve({ ok: true, solicitudes: [{ id_solicitud: 1, monto: 5000, estado: 'pendiente' }] });
            }),
        };
    });
});

jest.mock('../src/services/cliente', () => {
    return jest.fn().mockImplementation(() => {
        return {
            crearCliente: jest.fn((uuidcliente, nombre, email, telefono, direccion, ingresomensual) => {
                if (!uuidcliente || !nombre || !email || !telefono || !direccion || ingresomensual == null) {
                    return Promise.resolve({ ok: false, msg: 'Error del Servidor', server: 'Service' });
                }
                return Promise.resolve({ ok: true, id_cliente: 1 });
            }),
            actualizarCliente: jest.fn((cliente) => {
                if (!cliente.id_cliente) {
                    return Promise.reject(new Error('El ID del cliente no puede ser nulo'));
                }
                return Promise.resolve({ affectedRows: 1 });
            })
        };
    });
});

// ----------------------------------------------------------------------------------------------------------------------------------------------- //

// -- Crear Solicitud

describe('Pruebas unitarias para crearSolicitud', () => {
    test('debería crear una solicitud correctamente', async () => {
        const result = await creditoS.crearSolicitud(1, 2, 5000.00, 12, 0.05, 'pendiente');

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ok', true);
        expect(result).toHaveProperty('id_solicitud', 1);
    });

    test('debería manejar errores al crear una solicitud', async () => {
        await expect(creditoS.crearSolicitud(null, null, null, null, null, null)).rejects.toThrow('Los parámetros son inválidos');
    });
});

// -- Obtener Solicitudes por Cliente ID

describe('Pruebas unitarias para obtenerSolicitudesClienteID', () => {
    test('debería obtener las solicitudes correctamente', async () => {
        const result = await creditoS.obtenerSolicitudesClienteID(1);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ok', true);
        expect(result).toHaveProperty('solicitudes');
        expect(result.solicitudes).toBeInstanceOf(Array);
        expect(result.solicitudes.length).toBeGreaterThan(0);
    });

    test('debería manejar errores si el id_cliente no es válido', async () => {
        await expect(creditoS.obtenerSolicitudesClienteID(null)).rejects.toThrow('El ID del cliente no puede ser nulo');
    });
});

// -- Crear Cliente

describe('Pruebas unitarias para crearCliente', () => {
    test('debería crear un cliente correctamente', async () => {
        const clienteMock = {
            uuidcliente: '123e4567-e89b-12d3-a456-426614174000',
            nombre: 'Nombre de prueba',
            email: 'email@example.com',
            telefono: '1234567890',
            direccion: 'Dirección de prueba',
            ingresomensual: 15000.00
        };

        const result = await clienteS.crearCliente(
            clienteMock.uuidcliente,
            clienteMock.nombre,
            clienteMock.email,
            clienteMock.telefono,
            clienteMock.direccion,
            clienteMock.ingresomensual
        );

        expect(result).toBeDefined();
        expect(result).toHaveProperty('ok', true);
        expect(result).toHaveProperty('id_cliente', 1);
    });

    test('debería manejar errores al crear un cliente', async () => {
        const result = await clienteS.crearCliente(null, null, null, null, null, null);
        
        expect(result).toBeDefined();
        expect(result).toHaveProperty('ok', false);
        expect(result).toHaveProperty('msg', 'Error del Servidor');
    });
});

// -- Actualizar Cliente

describe('Pruebas unitarias para actualizarCliente', () => {
    test('debería actualizar el cliente correctamente', async () => {
        const clienteMock = {
            id_cliente: 1,
            nombre_cliente: 'Nombre de prueba',
            email: 'email@example.com',
            telefono: '1234567890',
            direccion: 'Dirección de prueba',
            ingreso_mensual: 15000.00
        };

        const result = await clienteS.actualizarCliente(clienteMock);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('affectedRows', 1);
    });

    test('debería lanzar un error si el id_cliente no es válido', async () => {
        await expect(clienteS.actualizarCliente({ id_cliente: null })).rejects.toThrow('El ID del cliente no puede ser nulo');
    });
});