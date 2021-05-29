const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const authController = require('./authController')

router.get('/user/:user_id', passPort.authenticate('jwt',{session: false}), authController.getUserById);

router.post('/login',passPort.authenticate('local',{session: false}), authController.login);

router.put('/update-info', passPort.authenticate('jwt',{session: false}), authController.updateInfo);

router.put('/update-avatar', authController.updateAvatar);

router.put('/update-token-device', passPort.authenticate('jwt',{session: false}), authController.updateTokenDevice);

router.put('/change-pass', passPort.authenticate('jwt',{session: false}), authController.changePassword);

router.put('/reset-code', passPort.authenticate('jwt',{session: false}), authController.updateResetPass);

router.put('/reset-password', passPort.authenticate('jwt',{session: false}), authController.resetPass);

module.exports = router;