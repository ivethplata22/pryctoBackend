const path = require('path');
const Sequelize = require('sequelize');
const fs = require('fs');
// Obtenemos el ambiente en que se ejecuta
const env = process.env.NODE_ENV || 'development';
// Obtenemos las configuraciones de la base de datos
const dataDbConfig = require('../../config/db.json');
let dbConfig = {};
const basename = path.basename(__filename);
const db = {};

// Asignamos los datos de la base dependiendo el ambiente desarrollo
if(env === 'development')
    dbConfig = dataDbConfig.development;
else
    dbConfig = dataDbConfig.production;

if (process.env.DEBUG_MODE == 0) {
    dbConfig.logging = false;
}

// Se crea instancia de sequelize con la configuración de la base de datos
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig);

// Cargar todos los modelos
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file !== "migration.js") && (file.slice(-3) === '.js');
})
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});

// Asociar los modelo con sus relaciones definidas
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
});

// Añadir el objeto sequelize y Sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;