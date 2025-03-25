const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const confirmedJourneySchema = new Schema({
    train_number: {
        type: String,
        required: true
    },
    train_name: {
        type: String,
        required: true
    },
    passenger_name: {
        type: String,
        required: true
    },
});

const ConfirmedJourney = mongoose.model('ConfirmedJourney', confirmedJourneySchema);

module.exports = ConfirmedJourney;