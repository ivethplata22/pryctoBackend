'use strict';

module.exports = (sequelize, DataTypes) => {
    const Sucursal = sequelize.define('Sucursal', {
        id_sucursal: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre_sucursal: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        gerente_sucursal: {
            type: DataTypes.STRING(100),
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
        tableName: 'sucursales',
        underscored: true,
        timestamps: true,
        paranoid: true
    });

    Sucursal.associate = models => {

        Sucursal.hasMany(models.Solicitud, {
          foreignKey: 'id_sucursal',
          as: 'solicitudes'
        });

    };

    return Sucursal;
};