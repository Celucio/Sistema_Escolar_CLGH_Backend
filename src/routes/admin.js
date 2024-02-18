const adminController = require('../controller/admin.controller.js');

const express = require('express');
const router = express.Router();

//consultar todos los administradores de la tabla
router.get('/admin', adminController.getAll);

//consultar un administrador por id
router.get('/admin/:id', adminController.getById);

//Insertar nuevo administrador
router.post('/admin', adminController.create);

//Actualizar administrador
router.put('/admin/:id', adminController.update);

//Obtener admin por correo
router.get('/admin/correo/:correo', adminController.getAdminByCorreo);
//Obtener admin por cedula
router.get('/admin/cedula/:cedula', adminController.getAdminByCi);
//Obtener admin por celular
router.get('/admin/celular/:celular', adminController.getAdminByCelular);


module.exports = router;