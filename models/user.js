const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String
    },
    score: {
        type: Number 
    },
    timerTime: {
        type: Number
    }

});
module.exports = mongoose.model('User', userSchema);