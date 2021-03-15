const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const authController = require('./authController')

router.post('/login',passPort.authenticate('local',{session: false}), authController.login);

router.post('/signup', authController.signUp);

router.put('/update-info', passPort.authenticate('jwt',{session: false}), authController.updateInfo);

// router.post('/changeblock',passPort.authenticate('jwt',{session: false}),userController.changeBlockById)

module.exports = router;