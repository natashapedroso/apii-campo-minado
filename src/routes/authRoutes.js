const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

// Rota de cadastro
router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch('/reset-password', authController.resetPassword);
module.exports = router;
