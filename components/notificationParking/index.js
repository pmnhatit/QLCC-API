const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const notiParkingController = require('./notiParkingController');

router.get('/all/:user_id', passPort.authenticate('jwt',{session: false}), notiParkingController.getNoticesByUserId);

router.get('/unread/:user_id', passPort.authenticate('jwt',{session: false}), notiParkingController.getNoticesUnread);

router.get('/notice/:notice_id', passPort.authenticate('jwt',{session: false}), notiParkingController.getNoticeById);

router.post('/create', passPort.authenticate('jwt',{session: false}), notiParkingController.createNotice);

router.put('/change-is-read', passPort.authenticate('jwt',{session: false}), notiParkingController.changeIsRead);

module.exports = router;