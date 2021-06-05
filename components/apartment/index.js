const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const apartController = require('./apartController');

router.get('/all-aparts', passPort.authenticate('jwt', {session: false}), apartController.getAllApartment);

router.get('/all-aparts/:user_id', passPort.authenticate('jwt',{session: false}), apartController.getApartmentByIdUser);

router.get('/aparts-empty', passPort.authenticate('jwt',{session: false}), apartController.getAllApartsEmpty);

router.get('/:apart_id', passPort.authenticate('jwt',{session: false}), apartController.getApartmentById);

module.exports = router;