const periodoController = require('../controller/periodo.controller');

const express = require('express');
const router = express.Router();


//consultar todos los periodos de la tabla
router.get('/periodo', periodoController.getAll);

//consultar un periodo por id
router.get('/periodo/:id', periodoController.getById);

//Insertar nuevo periodo
router.post('/periodo/', periodoController.create);

//Actualizar periodo
router.put('/periodo/:id', periodoController.update);

module.exports = router;
