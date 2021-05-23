const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const postController = require('./postController');

router.get('/all-post', passPort.authenticate('jwt',{session: false}), postController.getPost);

router.post('/create', passPort.authenticate('jwt',{session: false}), postController.createPost);

module.exports = router;