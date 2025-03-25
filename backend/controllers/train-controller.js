const Train = require('../models/train-models');

const addTrain = async (req, res) => {
    const { train_number,
        train_name,
        source_code,
        source_name,
        destination_code,
        destination_name,
        departure_time,
        arrival_time,
        duration,
        days_of_operation,
        status } = req.body;

    try {
        const train = await new Train({
            train_number,
            train_name,
            source_code,
            source_name,
            destination_code,
            destination_name,
            departure_time,
            arrival_time,
            duration,
            days_of_operation,
            status
        });
        await train.save();
        res.status(201).json({ message: 'Train added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.status(200).json(trains);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const searchTrains = async (req, res) => {
    const {source, destination} = req.body;
    try {
        const trains = await Train.find({
          source_name: source,
          destination_name: destination
        });
    
        if (trains.length > 0) {
          res.json(trains);
        } else {
          res.status(404).json({ message: 'No trains found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
}

module.exports = { addTrain, getAllTrains, searchTrains };