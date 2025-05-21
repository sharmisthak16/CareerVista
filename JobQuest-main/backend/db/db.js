const mongoose = require('mongoose');

exports.connectDB = async() => {
    try {
        mongoose.connect(`${process.env.MONGO_URI}`)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}