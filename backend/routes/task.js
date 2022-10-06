const express = require('express');
const router = express.Router();

const taskController = require('../controllers/TaskController');

router.get('/userid/:id', taskController.getUser);
router.get('/:id', taskController.getTask);
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.get('/user/:id', taskController.getUserTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;