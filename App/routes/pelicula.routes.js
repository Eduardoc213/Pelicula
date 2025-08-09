module.exports = app => {
    const pelicula = require("../controllers/pelicula.controller.js");
    var router = require("express").Router();
    // Create a new Pelicula
    router.post("/create/", pelicula.create);
    // Retrieve all Peliculas
    router.get("/", pelicula.findAll);
    // Retrieve all published Peliculas

    // Retrieve a single Pelicula with id
    router.get("/:id", pelicula.findOne);

    // Update a Pelicula with id
    router.put("/update/:id", pelicula.update);
    // Delete a Pelicula with id
    router.delete("/delete/:id", pelicula.delete);

    // Retrieve by name
    router.get("/name/:nombre", pelicula.findByName);

    app.use("/api/pelicula", router);
};