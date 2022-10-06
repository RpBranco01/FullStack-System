const express = require('express');
const router = express.Router();

const unavailabilityController = require('../controllers/UnavailabilityController');

router.post('/', unavailabilityController.createUnavailability);
router.get('/:id', unavailabilityController.getUnavailability);
router.get('/user/:id', unavailabilityController.getUnavailabilitiesByUser);



module.exports = router;