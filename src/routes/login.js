const authController = require('../controller/auth.controller.js');

const router = require('express').Router();

router.post('/login', authController.login);


module.exports = router;