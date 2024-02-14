const docenteController = require('../controller/docente.controller');

const express = require('express');
const router = express.Router();


//consultar todos los estudiantes de la tabla
router.get('/docente', docenteController.getAllTeachers);

//Docentes disponibles
router.get('/docentes/disponibles',docenteController.docenteDisponible);

//Obtener docentes por id
router.get('/docente/:id', docenteController.getTeacherById);

//Obtener docentes por cedula
router.get('/docente/:ci', docenteController.getTeacherByCi);

//Insertar un nuevo docente
router.post('/docente/', docenteController.createTeacher);

//Actualizar el docente por id
router.put('/docente/:id',docenteController.updateTeacher);




module.exports = router;
