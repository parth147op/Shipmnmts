const express = require('express');
const Comment = require('../models/comments');
const Question = require('../models/question');
const User = require('../models/user');
const commentController = require('../controller/commentController');
const router = express.Router();

router.post('/:questionId/create',commentController.createComment);

router.get('/:questionId/:commentId',commentController.getComment);

router.get('/:questionId/',commentController.getAllCommentsofQuestion);

module.exports = router;