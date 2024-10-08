const { Sequelize } = require('sequelize');
// Obtenemos las configuraciones de la base de datos
const dataDbConfig = require('./db.json');
// Obtenemos el ambiente en que se ejecuta
const env = process.env.NODE_ENV || 'development';
// Asignamos los datos de la base dependiendo el ambiente desarrollo
const dbConfig = dataDbConfig[env];

// Crear una instancia de Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    timezone: dbConfig.timezone,
    logging: false,
});

// Probar la conexión a la base de datos
const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a base de datos exitosa');
    } catch (error) {
        console.error('Error de conexión', error);
        throw new Error('Error al conectar con la base de datos');
    }
};

module.exports = {
    dbConnection,
    sequelize
}