const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const otherBillController = require('./otherBillController');

router.get('/:bill_id', passPort.authenticate('jwt',{session: false}), otherBillController.getOtherBillById);

router.get('/all/:apart_id', passPort.authenticate('jwt',{session: false}), otherBillController.getBillByApartmentId);

router.get('/month-bill/:apart_id/:month/:year', passPort.authenticate('jwt',{session: false}), otherBillController.getBillByMonth);

module.exports = router;