const matriculaController = require('../controller/matricula.controller');

const express = require('express');
const router = express.Router();


//consultar todos los grados de la tabla
router.get('/matriculas', matriculaController.getAll);

//Insertar nuevo grado
router.post('/matricula/', matriculaController.create);

//Obtener matricula por id
router.get('/matricula/:id', matriculaController.getById);

module.exports = router;