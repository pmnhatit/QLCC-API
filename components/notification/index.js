const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const notiController = require('./notiController');

router.get('/all/:page/:limit', passPort.authenticate('jwt',{session: false}), notiController.getAllNotification);

router.get('/user/:apart_id/:page/:limit', passPort.authenticate('jwt',{session: false}), notiController.getNotificationByUserId);

router.get('/unread/:apart_id', passPort.authenticate('jwt',{session: false}), notiController.getNotiUnreadByUserId);

router.put('/change-is-read', passPort.authenticate('jwt',{session: false}), notiController.updateIsReadStatus);

module.exports = router;