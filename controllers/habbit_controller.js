const Habbit = require('../models/habbit');

module.exports.create = async (req, res) => {
    try {
        const existingHabbit = await Habbit.findOne({ habbit: req.body.habbit });
        if (existingHabbit) {
            // Habit already exists, send a user-friendly message
            return res.status(400).send("Habit already exists.");
        }
        await Habbit.create({ habbit: req.body.habbit });
        return res.redirect('back');
    } catch (err) {
        console.error(`Error in creating the habit: ${err}`);
        return res.status(500).send("Error in creating the habit.");
    }
};
