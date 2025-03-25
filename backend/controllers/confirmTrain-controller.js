const train = require('../models/confirmed-journey');

const confirmTrain = async (req , res) =>{
    try {
        const {train_name, train_number, passenger_name} = req.body;
        if (!train_name || !train_number || !passenger_name) {
            return res.status(400).json({message: 'Please fill all fields'});
        }
        const confirm = new train({
            train_name,
            train_number,
            passenger_name
        })
        await confirm.save();
        res.status(200).json({message: 'Train confirmed successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {confirmTrain};