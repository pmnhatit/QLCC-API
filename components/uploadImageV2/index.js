const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const uploadV2Controller = require('./uploadController');

router.get('/signed-url', passPort.authenticate('jwt',{session: false}), uploadV2Controller.getSignedUrl);

router.get('/image-url', passPort.authenticate('jwt',{session: false}), uploadV2Controller.getImageUrl);

module.exports = router;