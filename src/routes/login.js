const authController = require('../controller/auth.controller.js');

const router = require('express').Router();

router.post('/login', authController.login);

router.put('/cambiarcontrasena', authController.cambiarContrasena);


module.exports = router;