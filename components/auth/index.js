const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const authController = require('./authController')

router.get('/users-block/:block_id', passPort.authenticate('jwt',{session: false}), authController.getAllUserByBlockId);

router.get('/all', passPort.authenticate('jwt',{session: false}), authController.getAllUser);

router.post('/login',passPort.authenticate('local',{session: false}), authController.login);

router.put('/update-info', passPort.authenticate('jwt',{session: false}), authController.updateInfo);

router.put('/update-avatar', authController.updateAvatar);

router.put('/update-token-device', passPort.authenticate('jwt',{session: false}), authController.updateTokenDevice);

router.put('/change-pass', passPort.authenticate('jwt',{session: false}), authController.changePassword);

module.exports = router;