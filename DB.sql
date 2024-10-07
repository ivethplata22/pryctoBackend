CREATE TABLE `clientes` (
  `id_cliente` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(100),
  `email` varchar(100),
  `telefono` varchar(15),
  `direccion` varchar(255),
  `ingreso_mensual` decimal(10,2),
  `fecha_registro` date,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE `sucursales` (
  `id_sucursal` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre_sucursal` varchar(100),
  `direccion` varchar(255),
  `telefono` varchar(15),
  `gerente_sucursal` varchar(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE `solicitudes` (
  `id_solicitud` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cliente` int,
  `id_sucursal` int,
  `monto_solicitado` decimal(10,2),
  `plazo_meses` int,
  `tasa_interes` decimal(5,2),
  `estado_solicitud` ENUM ('aprobado', 'rechazado'),
  `fecha_solicitud` date,
  `fecha_respuesta` date,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL
);

ALTER TABLE `solicitudes` ADD FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);

ALTER TABLE `solicitudes` ADD FOREIGN KEY (`id_sucursal`) REFERENCES `sucursales` (`id_sucursal`);
