const rolController = require('../controller/rol.controller.js')
const express = require('express');
const router = express.Router();

//Consultar todos los roles 
router.get('/rol', rolController.getAll);

//Consultar un rol por id
router.get('/rol/:id', rolController.getById);

//Crear un nuevo rol
router.post('/rol', rolController.create);

//Actualizar un rol
router.put('/rol/:id', rolController.update);

module.exports = router;