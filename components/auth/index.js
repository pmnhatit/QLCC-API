const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const authController = require('./authController')

router.post('/login',passPort.authenticate('local',{session: false}), authController.login);

router.post('/signup', authController.signUp);

// router.post('/infouser',passPort.authenticate('jwt',{session: false}),userController.getUserById);

// router.post('/changeblock',passPort.authenticate('jwt',{session: false}),userController.changeBlockById)

module.exports = router;