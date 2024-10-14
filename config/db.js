const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = 'mongodb+srv://akplmathan:Mathan2003@cluster0.kz3flho.mongodb.net/varathaEnterprices';

const connectDB = async()=>{
    try {
        await mongoose.connect(DB_URL);
        console.log('MongoDB Connected SuccessFully')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;