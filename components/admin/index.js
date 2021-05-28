const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const adminController = require('./adminController');

router.get('/token-device', passPort.authenticate('jwt',{session: false}), adminController.getTokenDevice);

module.exports = router;