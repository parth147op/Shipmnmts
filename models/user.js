const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    },
    // questions: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Question'
    //     }
    // ],
    // answers:[   
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Answer'
    //     }
    // ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
