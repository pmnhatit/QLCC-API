const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const waterBillController = require('./waterBillController');

router.get('/:bill_id', passPort.authenticate('jwt',{session: false}), waterBillController.getWaterBillById);

router.get('/all/:apart_id', passPort.authenticate('jwt',{session: false}), waterBillController.getBillByApartmentId);

router.get('/month-bill/:apart_id/:month/:year', passPort.authenticate('jwt',{session: false}), waterBillController.getBillByMonth);

module.exports = router;