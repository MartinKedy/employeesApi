const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router.post('/create', UserController.create);

router.post('/login', UserController.login);

router.get('/getall', UserController.getAll);

module.exports = router;