const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

// Creamos una instancia de Sequelize con los parámetros de conexión, incluyendo SSL para NeonDB
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,            
  dialect: dbConfig.dialect,      

  // Configuraciones específicas del dialecto (PostgreSQL), incluyendo la conexión segura SSL, Para Neon Debemos trabajarlo asi, anteriormente lo deje en el Pool y envio la correcion
  dialectOptions: {
    ssl: {
      require: true,              // Indica que la conexión debe usar SSL obligatoriamente
      rejectUnauthorized: false   // Acepta certificados autofirmados o no verificados (útil en entornos no productivos)
    }
  },

  // Configuración del pool de conexiones para optimizar el rendimiento
  pool: {
    max: dbConfig.pool.max,       // Máximo de conexiones simultáneas
    min: dbConfig.pool.min,       // Mínimo de conexiones
    acquire: dbConfig.pool.acquire, // Tiempo máximo para obtener una conexión antes de lanzar error
    idle: dbConfig.pool.idle      // Tiempo que una conexión puede estar inactiva antes de ser liberada
  }
});

// Creamos un objeto `db` que exportaremos para acceder a Sequelize y los modelos desde otras partes del proyecto
const db = {};

// Asignamos la clase Sequelize al objeto `db`, útil si se requiere usar métodos del ORM manualmente
db.Sequelize = Sequelize;

db.sequelize = sequelize;



db.pelicula = require("./pelicula.model.js")(sequelize, Sequelize);

// Asignamos los modelos al objeto `db` para que puedan ser accedidos fácilmente

const Pelicula = db.pelicula;


module.exports = db;
