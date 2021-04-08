const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const repairController = require('./repairController');
const checkNoticeByUser = require('./middleware');

router.get('/all/:user_id/:page/:limit', passPort.authenticate('jwt',{session: false}), repairController.getAllRepairNoticesByIdUser);

router.get('/all/:user_id/:page/:limit/:status', passPort.authenticate('jwt',{session: false}), repairController.getRepairNoticeByStatus);

router.get('/:notice_id', passPort.authenticate('jwt',{session: false}), repairController.getRepairNoticeById);

router.post('/add', passPort.authenticate('jwt',{session: false}), repairController.createRepairNotice);

router.put('/user/update-is-read', passPort.authenticate('jwt', {session: false}), repairController.changeIsRead);
//chua check delete
router.delete('/delete/:notice_id', passPort.authenticate('jwt',{session: false}), checkNoticeByUser, repairController.deleteRepairNotice);

module.exports = router;