const PersonaController = require('../controller/persona.controller.js');

const express = require('express');
const router = express.Router();

router.get('/persona/asignaturas/:id', PersonaController.asignaturasPorIdPersona);

router.get('/persona/:id', PersonaController.obtenerPersonaPorId);

module.exports = router;