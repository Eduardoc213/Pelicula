// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Pelicula = db.pelicula;
const Op = db.Sequelize.Op; 

// Create and Save a new pelicula
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a pelicula, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const pelicula = {
        id_pelicula: req.body.id_pelicula, // si no viene el id_pelicula se autoincrementa por defecto
        nombre: req.body.nombre,
        sinopsis: req.body.sinopsis,
        actores: req.body.actores,
        duracion: req.body.duracion,
        tipo: req.body.tipo,
        categoria: req.body.categoria,
        anio_lanzamiento: req.body.anio_lanzamiento,
        clasificacion: req.body.clasificacion
        
    };

    // Save a new pelicula into the database
    Pelicula.create(pelicula)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pelicula."
            });
        });
};

// Retrieve all Peliculas from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Pelicula.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Peliculas."
            });
        });
};

// Find a single Pelicula with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pelicula.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pelicula with id=" + id
            });
        });
};

// Update a Pelicula by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pelicula.update(req.body, {
        where: { id_pelicula: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pelicula was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pelicula with id=${id}. Maybe Pelicula was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pelicula with id=" + id + " " + err.message
            });
        });
};

// Delete a Pelicula with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos
    Pelicula.destroy({
        where: { id_pelicula: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pelicula was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pelicula with id=${id}. La pelicula no fue encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pelicula with id=" + id + " " + err.message
            });
        });
};

// Delete all Peliculas from the database.
exports.deleteAll = (req, res) => {
    Pelicula.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Peliculas were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Peliculas."
            });
        });
};

// find all active Peliculas, basado en el atributo disponible vamos a buscar que solo las peliculas activas
exports.findAllStatus = (req, res) => {
    Pelicula.findAll({ where: { disponible: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    " Some error occurred while retrieving Peliculas." + err.message
            });
        });
};

// Buscar una película por nombre
exports.findByName = (req, res) => {
    const nombre = req.params.nombre;
    Pelicula.findOne({ where: { nombre: nombre } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la película con nombre ${nombre}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al buscar la película por nombre: ${err.message}`
            });
        });
};