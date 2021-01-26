const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const userController = require('./userController')

router.post('/login',passPort.authenticate('local',{session: false}), userController.login);

router.post('/signup', userController.signUp);

// router.post('/infouser',passPort.authenticate('jwt',{session: false}),userController.getUserById);

// router.post('/changeblock',passPort.authenticate('jwt',{session: false}),userController.changeBlockById)

module.exports = router;