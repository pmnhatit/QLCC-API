const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const apartController = require('./apartController');

router.get('/all-aparts', passPort.authenticate('jwt', {session: false}), apartController.getAllApartment);

router.get('/all-aparts/:user_id', passPort.authenticate('jwt',{session: false}), apartController.getApartmentByIdUser);

router.get('/:id', passPort.authenticate('jwt',{session: false}), apartController.getApartmentById);

router.post('/add', passPort.authenticate('jwt',{session: false}), apartController.createApartment);

module.exports = router;