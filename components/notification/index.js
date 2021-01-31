const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const notiController = require('./notiController');

router.get('/all', passPort.authenticate('jwt',{session: false}), notiController.getAllNotification);

router.post('/add', passPort.authenticate('jwt',{session: false}), notiController.createNotification);

module.exports = router;