const rolController = require('../controller/rol.controller.js')
const express = require('express');
const router = express.Router();

//Consultar todos los roles 
router.get('/roles', rolController.getAll);

//Crear un nuevo rol
router.post('/rol', rolController.create);


module.exports = router;