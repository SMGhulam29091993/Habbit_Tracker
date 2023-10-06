const Habbit = require('../models/habbit');

module.exports.update = async (req, res) => {
    try {
        const habitId = req.params.id;
        const habit = await Habbit.findById(habitId);
        
        if (!habit) {
            return res.status(404).send('Habit not found');
        }

        // Render the updateHabbit view with habit data
        res.render('updateHabbit', {
            title: `${habit.habbit}`,
            habit : habit,
            updatePage: true
        });
        res.render('_header', { updatePage: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
