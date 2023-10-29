const mongoose = require('mongoose');
const env = require('./environment');

// setting the url for database connection
mongoose.connect(process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${env.db}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('strictQuery', false);

// connecting rge db 
const db = mongoose.connection;


// to check if there is any error in connecting the db
db.on('Error', console.error.bind(console, 'Error in connecting the db'));


// if the connection with db is established it console.log the msg
db.once('open', ()=>{
    console.log("The connection with database is established!");
})