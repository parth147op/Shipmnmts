const express = require('express');
const mongoose = require('mongoose');
const Question = require('../models/question');
const Comment = require('../models/comments');
const User = require('../models/user');
const questionController = require('../controller/questionController');
const passport = require('../passportConfig');
function isAuthenicated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.json({message:'You are not authenticated'})
}
const router = express.Router();

router.post('/create',isAuthenicated,questionController.createQuestion);

router.get('/:questionId',questionController.getQuestion);

router.get('/',questionController.getAllQuestions);

router.put('/:questionId',isAuthenicated,questionController.updateQuestion);

router.delete('/:questionId',isAuthenicated,questionController.deleteQuestion);

router.post('/:questionId/upvote',isAuthenicated,questionController.upvoteQuestion);

router.post('/:questionId/downvote',isAuthenicated,questionController.downvoteQuestion);

module.exports = router; 