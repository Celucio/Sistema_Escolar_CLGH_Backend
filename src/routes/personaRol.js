const personaRolController = require('../controller/personaRol.controller.js');

const express = require('express');
const router = express.Router();

//consultar todos los roles de la tabla
router.get('/personaRol', personaRolController.getAll);

//Asignar un rol
router.post('/personaRol', personaRolController.create);


module.exports = router;
