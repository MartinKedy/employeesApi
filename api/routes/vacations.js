const express = require('express');
const router = express.Router();

const VacationsController = require('../controllers/vacations');
const checkAuth = require('../middleware/check-auth');

router.post( '/create',checkAuth, VacationsController.create );
router.get('/getallusersvacations', checkAuth, VacationsController.getAllUsersVacations );

module.exports = router;