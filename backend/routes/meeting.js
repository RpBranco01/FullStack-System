const express = require('express');
const router = express.Router();

const meetingController = require('../controllers/MeetingController');

router.get('/', meetingController.getMeetings);
router.post('/', meetingController.createMeeting);
router.put('/:id', meetingController.updateMeeting);
router.get('/:id', meetingController.getMeeting);
router.get('/user/:id', meetingController.getMeetingsByUser);
router.delete('/:id', meetingController.deleteMeeting);




module.exports = router;