const docenteController = require('../controller/docente.controller');

const express = require('express');
const router = express.Router();


//consultar todos los estudiantes de la tabla
router.get('/docente', docenteController.getAllTeachers);
router.get('/docente', async (req, res) => {
    try {
      const docentes = await prisma.persona.findMany({
        where: {
          tipoPersona: 'D'
        },
        select: {
          id: true,
          nombre: true,
          apellido: true
        }
      });
      res.json(docentes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener docentes' });
    }
  });

//Obtener docentes por cedula
router.get('/docente/:cedula', docenteController.getTeacherByCi);

//Insertar un nuevo docente
router.post('/docente/', docenteController.createTeacher);

//Actualizar el docente por id
router.put('/docente/:id',docenteController.updateTeacher);

router.get('/docente/correo/:correo', docenteController.getTeacherByCorreo);
//Obtener estudiante por cedula
router.get('/docente/cedula/:cedula', docenteController.getTeacherByCi);

//obtener estudiante por celular
router.get('/docente/celular/:celular', docenteController.getTeacherByCelular);


module.exports = router;