const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoConfig = require('./config/mongoConfig');
const UsersRoutes = require('./api/routes/users');
const VacationsRoutes = require('./api/routes/vacations');

mongoose.connect(mongoConfig.url, { useNewUrlParser: true }).then(() => {
    console.log("MONGO connected")
}).catch( err => {
    console.log("Mongo connection failed: " + err);
    process.exit();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//header set, CORS errors prevent
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH., DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.use('/users', UsersRoutes);
app.use('/vacations', VacationsRoutes);

app.use((req, res, next ) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;

