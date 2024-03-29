const express = require('express');
const router = express.Router();
const auth = require('../components/auth')
const noti = require('../components/notification');
const elecBill = require('../components/electricBill');
const waterBill = require('../components/waterBill');
const otherBill = require('../components/otherBill');
const apart = require('../components/apartment');
const repair = require('../components/repair');
const uploadImage = require('../components/uploadImage');
const block = require('../components/block');
const pushNoti = require('../components/pushNotification');
const uploadv2 = require('../components/uploadImageV2');
const allBill = require('../components/allBill');
const billNoti = require('../components/billNotifiction');
const notiParking = require('../components/notificationParking');
const service = require('../components/service');
const registerService = require('../components/registerService');
const post = require('../components/post');
const admin = require('../components/admin');

router.use('/auth', auth);

router.use('/noti', noti);

router.use('/elec-bill', elecBill);

router.use('/water-bill', waterBill);

router.use('/other-bill', otherBill);

router.use('/apart', apart);

router.use('/repair', repair);

router.use('/upload-image', uploadImage);

router.use('/block', block);

router.use('/push-noti', pushNoti);

router.use('/uploadv2', uploadv2);

router.use('/all-bill', allBill);

router.use('/bill-noti', billNoti);

router.use('/noti-parking', notiParking);

router.use('/service', service);

router.use('/register-service', registerService);

router.use('/post', post);

router.use('/admin', admin);

module.exports = router;