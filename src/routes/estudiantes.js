const estudianteController = require('../controller/estudiante.controller');

const express = require('express');
const router = express.Router();

//consultar todos los estudiantes de la tabla
router.get('/estudiante', estudianteController.getAllStudents);

//Obtener los estudiantes disponibles
router.get('/estudiantes/disponibles', estudianteController.estudianteDisponible);

//Obtener estudiante por cedula
router.get('/estudiante/:id', estudianteController.getStudentById);

//Insertar un nuevo registro estudiante
router.post('/estudiante/', estudianteController.createStudent);

//Actualizar un estudiante por id
router.put('/estudiante/:id', estudianteController.updateStudent);


module.exports = router;
