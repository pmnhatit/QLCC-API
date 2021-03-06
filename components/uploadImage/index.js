const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const uploadImageController = require('./uploadImageController');

router.put('/:user_id', uploadImageController.uploadImage);

module.exports = router;