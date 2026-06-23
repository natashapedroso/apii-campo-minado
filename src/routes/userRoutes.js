const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.get('/dashboard', userController.dashboard);

// GET /users/{id}
router.get('/:id', userController.getById);

// PUT /users/{id} - Adicionar saldo
router.put('/:id', userController.addSaldo);

// DELETE /users/{id}
router.delete('/:id', userController.delete);

module.exports = router;
