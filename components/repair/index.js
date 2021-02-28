const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const repairController = require('./repairController');

router.get('/all', passPort.authenticate('jwt',{session: false}), repairController.getAllRepairNotices);

router.get('/all/:apart_id', passPort.authenticate('jwt',{session: false}), repairController.getAllRepairNoticesForUser);

router.post('/add', passPort.authenticate('jwt',{session: false}), repairController.createRepairNotice);

router.put('/update', passPort.authenticate('jwt',{session: false}), repairController.changeStatusRepairNotice);

module.exports = router;