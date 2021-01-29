const express = require('express');
const router = express.Router();
const auth = require('../components/auth')
const noti = require('../components/notification');

router.use('/auth', auth);

router.use('/noti', noti);

module.exports = router;