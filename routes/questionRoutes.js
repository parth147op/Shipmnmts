const express = require('express');
const mongoose = require('mongoose');
const Question = require('../models/question');
const Comment = require('../models/comments');
const User = require('../models/user');
const questionController = require('../controller/questionController');
const passport = require('../passportConfig');

const router = express.Router();

router.post('/create',questionController.createQuestion);

router.get('/:questionId',questionController.getQuestion);

router.get('/',questionController.getAllQuestions);

router.put('/:questionId',questionController.updateQuestion);

router.delete('/:questionId',questionController.deleteQuestion);

router.post('/:questionId/upvote',questionController.upvoteQuestion);

router.post('/:questionId/downvote',questionController.downvoteQuestion);

module.exports = router; 