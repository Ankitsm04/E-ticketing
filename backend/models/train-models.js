const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  train_number: String,
  train_name: String,
  source_code: String,
  source_name: String,
  destination_code: String,
  destination_name: String,
  departure_time: String,
  arrival_time: String,
  duration: String,
  days_of_operation: [String],
  status: String
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
