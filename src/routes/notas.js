const notasController = require('../controller/notas.controller.js')

const express = require('express');
const router = express.Router();

//Obtener Todo
router.get('/notas', notasController.getAll);

//Obtener por ID
router.get('/notas/:id', notasController.getById);

//Registro de notas automático
router.post('/notas/:asignaturaId', notasController.registrarNotasAsignatura);

//Obtener notas de un estudiante por id
router.get('/notas/estudiante/:id', notasController.notasEstudiante);

//Asignar nota a un estudiante
router.put('/notas/:id', notasController.asignarNota);

//Obtener notas por actividad y asignatura
router.get('/traernotas', notasController.obtenerNotasPorActividadYAsignatura);

//Obtener actividades por asignatura
router.get('/traeractividades/asignatura/estudiante/', notasController.obtenerNotasEstudiante);

//Obtener actividades por asignatura
router.get('/traeractividades/asignatura/actividad/', notasController.obtenerActividadesNotas);

module.exports = router;