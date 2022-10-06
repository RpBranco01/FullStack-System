const Meeting = require('../models/Meeting');

exports.getMeetings = function (req, res, next) {
    Meeting.find({}, function (err, meetings) {
        if (err) return next(err);
        res.send(meetings);
    });
}

exports.getMeeting = function (req, res, next) {
    Meeting.findById(req.params.id, function (err, meeting) {
        if (err) { return next(err); }
        res.send(meeting);
    });
};

exports.getMeetingsByUser = function (req, res, next) {
    Meeting.find({ users_id: req.params.id }, function (err, meetings) {
        if (err) return next(err);
        res.send(meetings);
    })
}

exports.createMeeting = function (req, res, next) {
    var meeting = new Meeting();
    meeting.duration = req.body.duration;
    meeting.users_id = req.body.users_id;
    meeting.available_dates = req.body.available_dates;

    meeting.save(function (err) {
        if (err) { return next(err); }
        res.send(meeting);
    });
}

exports.updateMeeting = function (req, res, next) {
    Meeting.findById(req.params.id, function (err, meeting) {
        if (err) { return next(err); }

        meeting.duration = req.body.duration;
        meeting.users_id = req.body.users_id;
        meeting.available_dates = req.body.available_dates;
        meeting.begin = req.body.begin;
        meeting.end = req.body.end;

        meeting.save(function (err) {
            if (err) { return next(err); }
            res.send(meeting);
        });
    });
}

exports.deleteMeeting = function (req, res, next) {
    Meeting.findById(req.params.id, function (err, meeting) {
        if (err) {
            return next(err);
        }

        meeting.deleteOne(meeting, function (err) {
            if (err) {
                return next(err);
            }
            res.send(meeting)
        });
    });
}