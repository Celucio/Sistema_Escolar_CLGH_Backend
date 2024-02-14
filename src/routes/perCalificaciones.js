const perCalController = require('../controller/perCalificaciones.controller.js');

const express = require('express');
const router = express.Router();

//Obtener todo
router.get('/periodoCalificaciones', perCalController.getAll);

//Obtener por id
router.get('/periodoCalificaciones/:id', perCalController.getById);

//Crear
router.post('/periodoCalificaciones', perCalController.create);

//Actualizar
router.put('/periodoCalificaciones/:id', perCalController.update);

module.exports = router;
