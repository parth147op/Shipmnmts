const express = require('express');
const Comment = require('../models/comments');
const Question = require('../models/question');
const User = require('../models/user');
const commentController = require('../controller/commentController');
function isAuthenicated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.json({message:'You are not authenticated'})
}

const router = express.Router();

router.post('/:questionId/create',isAuthenicated,commentController.createComment);

router.get('/:questionId/:commentId',commentController.getComment);

router.get('/:questionId/',commentController.getAllCommentsofQuestion);

module.exports = router;