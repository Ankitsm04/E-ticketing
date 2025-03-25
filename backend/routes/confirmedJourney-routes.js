const express = require('express');
const router = express.Router();
const {confirmTrain} = require('../controllers/confirmTrain-controller');

router.route('/', ).post(confirmTrain)

module.exports = router;