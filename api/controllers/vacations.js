const mongoose = require('mongoose');

const Vacations = require('../models/vacations');

exports.create = (req, res, next) => {

    console.log(new Date(req.body.from_date));

    const newVacation = new Vacations({
        _id: new mongoose.Types.ObjectId(),
        user_system_id: req.userData.system_id,
        from_date: new Date(req.body.from_date),
        to_date: new Date(req.body.to_date)
    });

    newVacation.save()
        .then( data => {
            res.status(201).json({
                message: 'Vacataion created',
                vacation: {
                    _id: data._id,
                    user_system_id: data.user_system_id,
                    from_date: dateToString(data.from_date),
                    to_date: dateToString(data.to_date)
                }
            })
        })
        .catch( err => {
            console.log("Error when Vacation creating: " + err);
            res.status(500).json({error: err});
        });

};

exports.getAllUsersVacations = (req, res, next) => {

    Vacations.find({user_system_id: req.userData.system_id})
        .exec()
        .then( data => {

            const response = {
                count: data.length,
                vacations: data
            };

            res.status(200).json(response);

        })
        .catch(err => {
            console.log("Error when Vacations fetching: " + err);
            res.status(500).json({error: err});
        })
};

const dateToString = date => {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
};