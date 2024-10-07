'use strict';

module.exports = (sequelize, DataTypes) => {
    const Solicitud = sequelize.define('Solicitud', {
        id_solicitud: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_sucursal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        monto_solicitado: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        plazo_meses: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tasa_interes: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        estado_solicitud: {
            type: DataTypes.ENUM('aprobado', 'rechazado'),
            allowNull: true
        },
        fecha_solicitud: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fecha_respuesta: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        deleted_at: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    }, {
        tableName: 'solicitudes',
        underscored: true,
        timestamps: true,
        paranoid: true
    });

    Solicitud.associate = models => {

        Solicitud.belongsTo(models.Cliente, {
            foreignKey: 'id_cliente',
            as: 'cliente'
        });

        Solicitud.belongsTo(models.Sucursal, {
            foreignKey: 'id_sucursal',
            as: 'sucursal'
        });

    };

    return Solicitud;
};