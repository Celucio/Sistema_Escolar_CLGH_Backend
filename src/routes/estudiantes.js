const estudianteController = require('../controller/estudiante.controller');

const express = require('express');
const router = express.Router();
router.get('/traerproactividad', estudianteController.obtenerPersonasPorActividadYAsignatura);

// Obtener estudiante por correo electrónico
router.get('/estudiante/correo/:correo', estudianteController.getEstudianteByCorreo);

//consultar todos los estudiantes de la tabla
router.get('/estudiante', estudianteController.getAllStudents);

//Obtener estudiante por cedula
router.get('/estudiante/cedula/:cedula', estudianteController.getStudentByCi);

//obtener estudiante por celular
router.get('/estudiante/celular/:celular', estudianteController.getEstudianteByCelular);

//Insertar un nuevo registro estudiante
router.post('/estudiante/', estudianteController.createStudent);

//Actualizar un estudiante por id
router.put('/estudiante/:id', estudianteController.updateStudent);

//consultar todos los estudiantes de la tabla
router.get('/estudiante/traer/:id', estudianteController.getStudentById);


module.exports = router;