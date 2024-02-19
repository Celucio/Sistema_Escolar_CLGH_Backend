const authController = require('../controller/auth.controller.js');

const router = require('express').Router();

router.post('/login', authController.login);

router.put('/login/cambiarcontrasena', authController.cambiarContrasena);

router.put('/login/cambiarcontrasenaolvido', authController.cambiarContrasenaOlvido);

module.exports = router;