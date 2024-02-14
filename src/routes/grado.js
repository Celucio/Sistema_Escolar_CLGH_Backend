const gradoController = require('../controller/grado.controller');

const express = require('express');
const router = express.Router();


//consultar todos los grados de la tabla
router.get('/grado', gradoController.getAll);

//consultar un grado por id
router.get('/grado/:id', gradoController.getById);

//Insertar nuevo grado
router.post('/grado/', gradoController.create);

//Actualizar grado
router.put('/grado/:id', gradoController.update);

module.exports = router;
