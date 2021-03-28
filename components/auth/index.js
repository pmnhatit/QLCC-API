const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const authController = require('./authController')

router.get('/users-block/:block_id', passPort.authenticate('jwt',{session: false}), authController.getAllUserByBlockId);

router.get('/all', passPort.authenticate('jwt',{session: false}), authController.getAllUser);

router.post('/login',passPort.authenticate('local',{session: false}), authController.login);

router.post('/signup', authController.signUp);

router.put('/update-info', passPort.authenticate('jwt',{session: false}), authController.updateInfo);

router.put('/update-avatar', authController.updateAvatar);

router.put('/update-token-device', passPort.authenticate('jwt',{session: false}), authController.updateTokenDevice);

//router.put('/update-block', passPort.authenticate('jwt',{session: false}), authController.updateBlockId); //xem xet co dung khong

// router.post('/changeblock',passPort.authenticate('jwt',{session: false}),userController.changeBlockById)

module.exports = router;