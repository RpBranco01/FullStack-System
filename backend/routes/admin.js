const express = require('express');
const router = express.Router();

const adminController = require('../controllers/AdminController');

router.get('/', adminController.get_admins);

module.exports = router;