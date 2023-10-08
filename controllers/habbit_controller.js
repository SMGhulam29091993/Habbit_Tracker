const Habbit = require('../models/habbit');

module.exports.create = async (req, res) => {
    try {
        const existingHabbit = await Habbit.findOne({ habbit: req.body.habbit });
        if (existingHabbit) {
            // Habit already exists, send a user-friendly message
            return res.status(400).send("Habit already exists.");
        }
        if (!req.body.habbit) {
            // Handle empty habit name
            return res.status(400).json({ error: "Habit name is required." });
        }
        let habbit = await Habbit.create({ habbit: req.body.habbit });
        if (req.xhr){
            return res.status(200).json({
                data: {
                    habbit : habbit
                },
                message: "Habbit created!"
            });
        }

        return res.redirect('back');
    } catch (err) {
        console.error(`Error in creating the habit: ${err}`);
        return res.status(500).send("Error in creating the habit.");
    }
};


module.exports.destroy = async (req, res) => {
    try {
      let habitID = req.params.id;
      if (habitID) {
        console.log(habitID);
        let habbit = await Habbit.findById(habitID);
        if (!habbit) {
          return res.redirect('back');
        }
  
        console.log("Removing post:", habbit._id);
  
        await habbit.deleteOne({ _id: req.params.id });
  
        // Set the Cache-Control header to no-cache
        res.setHeader('Cache-Control', 'no-cache');
  
        if (req.xhr) {
          // For AJAX requests, send a JSON response
          return res.status(200).json({
            message: "Habit deleted!",
            habit_id: req.params.id,
          });
        } else {
          // For regular HTML requests, redirect back
          return res.redirect('back');
        }
      }
    } catch (err) {
      console.log(`Error in deleting the habit ${err}`);
    }
  };
  