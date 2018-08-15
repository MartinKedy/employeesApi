const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConfig = require('../../config/mongoConfig');
const Users = require('../models/users');

exports.create = (req, res, next) => {

    Users.find({ systemId: req.body.system_id })
        .exec()
        .then( data => {

            if (data.length >= 1)
                return res.status(409).json({message: "User with id: " + req.body.system_id + " exists!"});

            bcrypt.hash(req.body.password, 10, (err, hash) => {

                if (err) {
                    console.log('Password hash error');
                    return res.status(500).json({error: err});
                }

                const newUser = new Users({
                    _id: new mongoose.Types.ObjectId(),
                    system_id: req.body.system_id,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    work_shift: req.body.work_shift,
                    password: hash
                });

                newUser.save()
                    .then( data => {
                        res.status(201).json({
                            message: 'User created',
                            user: data
                        })
                    })
                    .catch( err => {
                        console.log("Error when User creating: " + err);
                        res.status(500).json({error: err});
                    })
            });


        })
        .catch( err => {
            console.log("Error when user creating: " + err);
            res.status(500).json({error: err});
        });
};

exports.login = (req,res,next) => {

    Users.find({system_id: req.body.system_id})
        .exec()
        .then(data => {

            if(data.length < 1) return res.status(401).json({message: 'Auth failed'});

            bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                if (err) return res.status(401).json({message: 'Auth failed'});

                if (result) {

                    const token = jwt.sign({
                            system_id: data[0].system_id,
                            userId: data[0]._id
                        },
                        dbConfig.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({message: "Auth success", token: token});
                }

                return res.status(401).json({message: 'Auth failed'});
            });


        })
        .catch(err => {
            console.log("Error when user login: " + err);
            res.status(500).json({error: err});
        })
};

exports.getAll = (req, res, next) => {
    Users.find()
        .exec()
        .then( data => {

            const response = {
                count: data.length,
                users: data
            };

            res.status(200).json(response);

        })
        .catch(err => {
            console.log("Error when users fetching: " + err);
            res.status(500).json({error: err});
        })
};