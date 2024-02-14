const tipoController = require('../controller/tipo.controller.js');
const express = require('express');
const router = express.Router();

//Obtener todos los tipos de actividades
router.get('/tipoActividad', tipoController.getAll);

//Obtener un tipo de actividad por id
router.get('/tipoActividad/:id', tipoController.getById);

//Crear un tipo de actividad
router.post('/tipoActividad', tipoController.create);

//Actualizar
router.put('/tipoActividad/:id', tipoController.update);


module.exports = router;
