const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const registerController = require('./registerService.controller');

router.get('/all-register', passPort.authenticate('jwt',{session: false}), registerController.getRegisterService);

router.post('/create', passPort.authenticate('jwt',{session: false}), registerController.createRegisterService);

router.put('/change-is-read', passPort.authenticate('jwt',{session: false}), registerController.changeIsRead);

module.exports = router;