const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.get('/:username', userController.getUser);
router.get('/', userController.getUsers);
router.put('/:id', userController.updateUser);

module.exports = router;