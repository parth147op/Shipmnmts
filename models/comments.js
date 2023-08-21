const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: String,
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    votes:{
        upvotes:{
        type: Number,
        default: 0
        },
        downvotes:{
            type: Number,
            default: 0
        }
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);