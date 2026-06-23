const express = require('express');
const gameController = require('../controllers/gameController.js');

const router = express.Router();

// POST /games/start
router.post('/start', gameController.start);

// POST /games/{gameId}/reveal
router.post('/:gameId/reveal', gameController.reveal);

// POST /games/{gameId}/cashout
router.post('/:gameId/cashout', gameController.cashout);

module.exports = router;
