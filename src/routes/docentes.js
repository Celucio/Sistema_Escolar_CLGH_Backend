const docenteController = require('../controller/docente.controller');

const express = require('express');
const router = express.Router();


//consultar todos los estudiantes de la tabla
router.get('/docentes', docenteController.getAllTeachers);

//Obtener docentes por cedula
router.get('/docente/:cedula', docenteController.getTeacherByCi);

//Insertar un nuevo docente
router.post('/docente/', docenteController.createTeacher);

//Actualizar el docente por id
router.put('/docente/:id',docenteController.updateTeacher);

module.exports = router;