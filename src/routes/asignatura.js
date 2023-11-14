const asignaturaController = require('../controller/asignatura.controller');

const express = require('express');
const router = express.Router();


//consultar todos las asignaturas de la tabla
router.get('/asignaturas', asignaturaController.getAllAsignatures);

//Obtener asignaturas por ID
router.get('/asignatura/:id', asignaturaController.getAsignatureById);

//Insertar nueva asignatura
router.post('/asignatura/', asignaturaController.createAsignature);

module.exports = router;