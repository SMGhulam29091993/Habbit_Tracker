const mongoose = require('mongoose');


const habbitSchema = new  mongoose.Schema({
    habbit : {
        type : String,
        require : true
    },
    status : {
        type : String,
        require : true
    },
    streakCount : {
        type : Number,
    },
    day : {
        type : String,
        require : true
    },
    date : {
        type: String,
        require : true
    }
})

const Habbit = new mongoose.model('Habbit', habbitSchema);

module.exports = Habbit;