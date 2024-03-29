const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const allBillController = require('./allBillController');

router.get('/bill/:apart_id/:month/:year', passPort.authenticate('jwt',{session: false}), allBillController.getBillByApartId);

router.get('/all/:apart_id/:status', passPort.authenticate('jwt',{session: false}), allBillController.getAllByIsPayStatus);

router.get('/:bill_id', passPort.authenticate('jwt',{session: false}), allBillController.getBillById);

router.put('/report', passPort.authenticate('jwt',{session: false}), allBillController.updateReport);

module.exports = router;