const mongoose = require('mongoose');
const env = require('./environment');

// setting the URL for database connection
mongoose.connect(`${env.db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Set the 'strictQuery' option to false to handle the deprecation warning.
mongoose.set('strictQuery', false);

// Connecting to the database
const db = mongoose.connection;

// To check if there is any error in connecting the database
db.on('error', console.error.bind(console, 'Error in connecting to the database'));

// If the connection with the database is established, it logs a message.
db.once('open', () => {
    console.log('The connection with the database is established!');
});
