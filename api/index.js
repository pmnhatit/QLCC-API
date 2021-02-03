const express = require('express');
const router = express.Router();
const auth = require('../components/auth')
const noti = require('../components/notification');
const unitPrice = require('../components/unitPrice');
const elecBill = require('../components/electricBill');
const waterBill = require('../components/waterBill');
const otherBill = require('../components/otherBill');
const apart = require('../components/apartment');

router.use('/auth', auth);

router.use('/noti', noti);

router.use('/unit-price', unitPrice);

router.use('/elec-bill', elecBill);

router.use('/water-bill', waterBill);

router.use('/other-bill', otherBill);

router.use('/apart', apart);

module.exports = router;