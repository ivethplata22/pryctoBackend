-- Store Procedures CRUD Tabla Clientes /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

DELIMITER //

CREATE PROCEDURE insertar_cliente (
    IN p_uuid_cliente VARCHAR(10),
    IN p_nombre_cliente VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_telefono VARCHAR(15),
    IN p_direccion VARCHAR(255),
    IN p_ingreso_mensual DECIMAL(10,2),
    IN p_fecha_registro DATE
)
BEGIN
    INSERT INTO clientes (
        uuid_cliente,
        nombre_cliente, 
        email, 
        telefono, 
        direccion, 
        ingreso_mensual, 
        fecha_registro
    )
    VALUES (
        p_uuid_cliente,
        p_nombre_cliente, 
        p_email, 
        p_telefono, 
        p_direccion, 
        p_ingreso_mensual, 
        p_fecha_registro
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE obtener_clientes ()
BEGIN
    SELECT * FROM clientes;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE obtener_cliente (
    IN p_id_cliente INT
)
BEGIN
    SELECT * FROM clientes
    WHERE id_cliente = p_id_cliente;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE actualizar_cliente (
    IN p_id_cliente INT,
    IN p_uuid_cliente VARCHAR(10),
    IN p_nombre_cliente VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_telefono VARCHAR(15),
    IN p_direccion VARCHAR(255),
    IN p_ingreso_mensual DECIMAL(10,2)
)
BEGIN
    UPDATE clientes
    SET 
        uuid_cliente = p_uuid_cliente,
        nombre_cliente = p_nombre_cliente,
        email = p_email,
        telefono = p_telefono,
        direccion = p_direccion,
        ingreso_mensual = p_ingreso_mensual,
        updated_at = CURRENT_TIMESTAMP
    WHERE id_cliente = p_id_cliente;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE eliminar_cliente (
    IN p_id_cliente INT
)
BEGIN
    DELETE FROM clientes
    WHERE id_cliente = p_id_cliente;
END //

DELIMITER ;

-- Store Procedures CRUD Tabla Sucursales /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

DELIMITER //

CREATE PROCEDURE insertar_sucursal (
    IN p_nombre_sucursal VARCHAR(100),
    IN p_direccion VARCHAR(255),
    IN p_telefono VARCHAR(15),
    IN p_gerente_sucursal VARCHAR(100)
)
BEGIN
    INSERT INTO sucursales (
        nombre_sucursal, 
        direccion, 
        telefono, 
        gerente_sucursal
    )
    VALUES (
        p_nombre_sucursal, 
        p_direccion, 
        p_telefono, 
        p_gerente_sucursal
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE obtener_sucursales ()
BEGIN
    SELECT * FROM sucursales;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE obtener_sucursal (
    IN p_id_sucursal INT
)
BEGIN
    SELECT * FROM sucursales
    WHERE id_sucursal = p_id_sucursal;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE actualizar_sucursal (
    IN p_id_sucursal INT,
    IN p_nombre_sucursal VARCHAR(100),
    IN p_direccion VARCHAR(255),
    IN p_telefono VARCHAR(15),
    IN p_gerente_sucursal VARCHAR(100)
)
BEGIN
    UPDATE sucursales
    SET 
        nombre_sucursal = p_nombre_sucursal,
        direccion = p_direccion,
        telefono = p_telefono,
        gerente_sucursal = p_gerente_sucursal,
        updated_at = CURRENT_TIMESTAMP
    WHERE id_sucursal = p_id_sucursal;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE eliminar_sucursal (
    IN p_id_sucursal INT
)
BEGIN
    DELETE FROM sucursales
    WHERE id_sucursal = p_id_sucursal;
END //

DELIMITER ;

-- Store Procedures CRUD Tabla Solicitudes /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

DELIMITER //

CREATE PROCEDURE insertar_solicitud (
    IN p_id_cliente INT,
    IN p_id_sucursal INT,
    IN p_monto_solicitado DECIMAL(10,2),
    IN p_plazo_meses INT,
    IN p_tasa_interes DECIMAL(5,2),
    IN p_estado_solicitud ENUM('aprobado', 'rechazado'),
    IN p_fecha_solicitud DATE
)
BEGIN
    INSERT INTO solicitudes (
        id_cliente, 
        id_sucursal, 
        monto_solicitado, 
        plazo_meses, 
        tasa_interes, 
        estado_solicitud, 
        fecha_solicitud
    )
    VALUES (
        p_id_cliente, 
        p_id_sucursal, 
        p_monto_solicitado, 
        p_plazo_meses, 
        p_tasa_interes, 
        p_estado_solicitud, 
        p_fecha_solicitud
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE obtener_solicitudes ()
BEGIN
    SELECT * FROM solicitudes;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE obtener_solicitud (
    IN p_id_solicitud INT
)
BEGIN
    SELECT * FROM solicitudes
    WHERE id_solicitud = p_id_solicitud;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE actualizar_solicitud (
    IN p_id_solicitud INT,
    IN p_id_cliente INT,
    IN p_id_sucursal INT,
    IN p_monto_solicitado DECIMAL(10,2),
    IN p_plazo_meses INT,
    IN p_tasa_interes DECIMAL(5,2),
    IN p_estado_solicitud ENUM('aprobado', 'rechazado'),
    IN p_fecha_solicitud DATE,
    IN p_fecha_respuesta DATE
)
BEGIN
    UPDATE solicitudes
    SET 
        id_cliente = p_id_cliente,
        id_sucursal = p_id_sucursal,
        monto_solicitado = p_monto_solicitado,
        plazo_meses = p_plazo_meses,
        tasa_interes = p_tasa_interes,
        estado_solicitud = p_estado_solicitud,
        fecha_solicitud = p_fecha_solicitud,
        fecha_respuesta = p_fecha_respuesta,
        updated_at = CURRENT_TIMESTAMP
    WHERE id_solicitud = p_id_solicitud;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE eliminar_solicitud (
    IN p_id_solicitud INT
)
BEGIN
    DELETE FROM solicitudes
    WHERE id_solicitud = p_id_solicitud;
END //

DELIMITER ;

-- Store Procedures ADICIONALES /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- Procedimiento para obtener el estado de una solicitud

DELIMITER //

CREATE PROCEDURE obtener_estado_solicitud (
    IN p_id_solicitud INT
)
BEGIN
    SELECT estado_solicitud FROM solicitudes
    WHERE id_solicitud = p_id_solicitud;
END //

DELIMITER ;

-- Procedimiento para contar solicitudes por estado

DELIMITER //

CREATE PROCEDURE contar_solicitudes_por_estado ()
BEGIN
    SELECT estado_solicitud, COUNT(*) AS total
    FROM solicitudes
    GROUP BY estado_solicitud;
END //

DELIMITER ;

-- Procedimiento para obtener solicitudes por cliente

DELIMITER //

CREATE PROCEDURE obtener_solicitudes_por_cliente (
    IN p_id_cliente INT
)
BEGIN
    SELECT * FROM solicitudes
    WHERE id_cliente = p_id_cliente;
END //

DELIMITER ;

-- Procedimiento para actualizar el estado de una solicitud

DELIMITER //

CREATE PROCEDURE actualizar_estado_solicitud (
    IN p_id_solicitud INT,
    IN p_nuevo_estado ENUM('aprobado', 'rechazado')
)
BEGIN
    UPDATE solicitudes
    SET estado_solicitud = p_nuevo_estado,
        updated_at = CURRENT_TIMESTAMP
    WHERE id_solicitud = p_id_solicitud;
END //

DELIMITER ;

-- Procedimiento para obtener las solicitudes recientes

DELIMITER //

CREATE PROCEDURE obtener_solicitudes_recientes (
    IN p_numero_registros INT
)
BEGIN
    SELECT * FROM solicitudes
    ORDER BY fecha_solicitud DESC
    LIMIT p_numero_registros;
END //

DELIMITER ;
