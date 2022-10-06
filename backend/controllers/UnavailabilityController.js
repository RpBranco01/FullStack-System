const Unavailability = require('../models/Unavailability');

exports.createUnavailability = function (req, res, next) {

    console.log("on backend");


    var unavailability = new Unavailability();
    unavailability.begin = req.body.begin;
    unavailability.end = req.body.end;
    unavailability.user_id = req.body.user_id;

    unavailability.save(function (err) {
        if (err) { return next(err); }
        res.send(unavailability);
    });
};

exports.getUnavailability = function (req, res, next) {
    Unavailability.findById(req.params.id, function (err, unavailability) {
        if (err) { return next(err); }
        res.send(unavailability);
    });
};

exports.getUnavailabilitiesByUser = function (req, res, next) {
    Unavailability.find({ user_id: req.params.id }, function (err, unavailabilities) {
        if (err) return next(err);
        res.send(unavailabilities);
    })
}