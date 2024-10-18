const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = 'mongodb+srv://Raibs:Raibs1234@cluster0.9sf2b.mongodb.net/sriramAgencies';

const connectDB = async()=>{
    try {
        await mongoose.connect(DB_URL);
        console.log('MongoDB Connected SuccessFully')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;