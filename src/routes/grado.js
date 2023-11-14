const gradoController = require('../controller/grado.controller');

const express = require('express');
const router = express.Router();


//consultar todos los grados de la tabla
router.get('/grados', gradoController.getAll);

//Insertar nuevo grado
router.post('/grado/', gradoController.create);

module.exports = router;