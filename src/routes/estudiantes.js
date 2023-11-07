const estudianteController = require('../controller/estudiante.controller');

const express = require('express');
const router = express.Router();

//consultar todos los estudiantes de la tabla
router.get('/estudiantes', estudianteController.getAllStudents);

//Obtener estudiante por cedula
// router.get('/estudiante/:ci', estudianteController.getStudentByCi);

// //Insertar un nuevo registro estudiante
// router.post('/estudiante/', estudianteController.createStudent);

// //Actualizar un estudiante por id
// router.put('/estudiante/:id', estudianteController.updateStudent);


module.exports = router;