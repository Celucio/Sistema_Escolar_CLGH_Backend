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

module.exports = router;