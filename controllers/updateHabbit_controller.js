const Habbit = require('../models/habbit');
const Tracker = require('../models/tracker');

module.exports.update = async (req, res) => {
    try {
        const habitId = req.params.id;
        const habit = await Habbit.findById(habitId).populate('tracker').exec();
        
        if (!habit) {
            return res.status(404).send('Habit not found');
        }

        let streakCount = 0; // Initialize streakCount

        // Loop through the trackers and update streakCount based on status
        for (let tracker of habit.tracker) {
            if (tracker.status === 'Done') {
                streakCount++; // Increment streakCount for "done" trackers
            } else if (tracker.status === 'Not-done') {
                streakCount = 0; // Reset streakCount for "not-done" trackers
            }
            tracker.streakCount = streakCount; // Update the streakCount of the tracker
            await tracker.save(); // Save the updated tracker
        }

        // Render the updateHabbit view with habit data and updated trackers
        res.render('updateHabbit', {
            title: `${habit.habbit}`,
            habit: habit,
            all_trackers: habit.tracker,
            updatePage: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
