const perCalController = require('../controller/perCalificaciones.controller.js');

const express = require('express');
const router = express.Router();

//Obtener todo
router.get('/periodoCalificaciones', perCalController.getAll);

//Crear
router.post('/periodoCalificaciones', perCalController.create);

//Actualizar
router.put('/periodoCalificaciones/:id', perCalController.update);

router.get('/periodoCalificaciones/nombre', perCalController.getByNombre);


module.exports = router;