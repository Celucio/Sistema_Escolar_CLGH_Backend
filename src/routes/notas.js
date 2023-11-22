const notasController = require('../controller/notas.controller.js')

const express = require('express');
const router = express.Router();

//Obtener Todo
router.get('/notas', notasController.getAll);

//Registro de notas automático
router.post('/notas/:asignaturaId', notasController.registrarNotasAsignatura);

//Obtener notas de un estudiante por id
router.get('/notas/:id', notasController.notasEstudiante);

//Asignar nota a un estudiante
router.put('/notas/:id', notasController.asignarNota);

module.exports = router;