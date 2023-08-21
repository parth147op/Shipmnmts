const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: { 
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    votes: {
        type: Number,
        default: 0
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }

    ]
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;