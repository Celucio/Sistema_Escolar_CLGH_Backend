const gradoController = require('../controller/grado.controller');

const express = require('express');
const router = express.Router();


//consultar todos los grados de la tabla
router.get('/grado', gradoController.getAll);

//Insertar nuevo grado
router.post('/grado/', gradoController.create);

//Actualizar grado
router.put('/grado/:id', gradoController.update);

router.get('/grado/gradosNoAsignados', gradoController.getGradosNoAsignados);
router.get('/grado/traer/:id', gradoController.getById);

module.exports = router;