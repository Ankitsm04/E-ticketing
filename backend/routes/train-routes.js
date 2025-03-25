const express = require('express');
const router = express.Router();
const {addTrain, getAllTrains, searchTrains} = require('../controllers/train-controller');

router.route('/add-train').post(addTrain);
router.route('/get-all-trains').get(getAllTrains);
router.route('/').post(searchTrains);

module.exports = router;