const Habbit = require('../models/habbit');
const Tracker = require('../models/tracker');


module.exports.createTracker = async (req, res) => {
    try {
        // find the habit id for which the tracker is being created
        let habit = await Habbit.findById(req.body.habbit);  
        // checking if the habit is present if presen then it will create the tracker
        if (habit) {
            let tracker = await Tracker.create({
                habbit: req.body.habbit,
                status: req.body.status,
                date: req.body.date,
                day: req.body.day
            });
            // then it will push the tracker array in habbit model
            habit.tracker.push(tracker);
            habit.save();

            return res.redirect('back');
        }
    } catch (err) {
        console.error(`Error in creating the habit: ${err}`);
        return res.status(500).send("Error in updating the tracker.");
    }
};
