const notasController = require('../controller/notas.controller.js')

const express = require('express');
const router = express.Router();

//Obtener Todo
router.get('/notas', notasController.getAll);

//Registro de notas automático
router.post('/notas/:asignaturaId', (req, res) => {
    notasController.registrarNotasAsignatura(req, res)
  });

module.exports = router;