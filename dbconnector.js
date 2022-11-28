const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

var database = mongoose.connection; 
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
});

module.exports = database;