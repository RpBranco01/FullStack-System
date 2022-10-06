const express = require('express');
const router = express.Router();

const teamController = require('../controllers/TeamController');

// FUNCTIONS
router.post('/', teamController.createTeam);
router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeam);
router.put('/:id', teamController.updateTeam);

module.exports = router;