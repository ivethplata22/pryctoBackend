'use strict';

module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        id_cliente: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre_cliente: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ingreso_mensual: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        fecha_registro: {
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
        tableName: 'clientes',
        underscored: true,
        timestamps: true,
        paranoid: true
    });

    Cliente.associate = models => {

        Cliente.hasMany(models.Solicitud, {
          foreignKey: 'id_cliente',
          as: 'solicitudes'
        });

    };

    return Cliente;
};