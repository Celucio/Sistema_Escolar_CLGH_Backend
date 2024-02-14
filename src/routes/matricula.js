const matriculaController = require('../controller/matricula.controller');

const express = require('express');
const router = express.Router();


//consultar todos los grados de la tabla
router.get('/matricula', matriculaController.getAll);

//Obtener matricula por id
router.get('/matricula/:id', matriculaController.getById);

//Insertar nuevo grado
router.post('/matricula/', matriculaController.create);

//Actualizar grado
router.put('/matricula/:id', matriculaController.update);

module.exports = router;
