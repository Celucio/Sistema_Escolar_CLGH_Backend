const actividadController = require('../controller/actividades.controller.js')

const express = require('express');
const router = express.Router();

//Obtener todo
router.get('/actividades', actividadController.getAll);

//Obtener por ID
router.get('/actividades/:id', actividadController.getById);

//Crear
router.post('/actividades', actividadController.create);

//Actualizar por ID
router.put('/actividades/:id', actividadController.update);

//Obtener actividades por asignatura
router.get('/actividades/asignatura/:asignaturaId', actividadController.actividadesPorAsignatura);

//Obtener actividades por periodo de calificaciones
router.get('/actividades/periodo/:perCalId/asignatura/:asignaturaId', actividadController.actividadesPorPeriodoCalificaciones);

module.exports = router;
