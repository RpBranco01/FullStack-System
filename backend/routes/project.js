const express = require('express');
const router = express.Router();

const projectController = require('../controllers/ProjectController');

// FUNCTIONS
router.get('/', projectController.getProjects);
router.post('/', projectController.createProject);
router.get('/:id', projectController.getProject);
router.put('/:id', projectController.updateTeamProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;