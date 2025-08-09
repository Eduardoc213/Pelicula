module.exports = (sequelize, Sequelize) => {
  const Pelicula = sequelize.define("pelicula", {
    id_pelicula: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sinopsis: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    actores: {
      type: Sequelize.STRING,
      allowNull: false
    },
    duracion: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    categoria: {
      type: Sequelize.STRING,
      allowNull: false
    },
    anio_lanzamiento: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    clasificacion: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    timestamps: false 
    
  });

  return Pelicula;
};
