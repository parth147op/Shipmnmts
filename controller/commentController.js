const Question = require('../models/question');
const Comment = require('../models/comments');
exports.createComment = async (req, res) => {
    try{
        const question1 = await Question.findById(req.params.questionId);
        if(!question1){
            return res.status(404).json({
                status: 'fail',
                message: 'Question not found'
            });
        }
        const body = req.body.body;
        const comment = new Comment({
            body,
            author:req.user._id,
            question:question1._id
        });
        await comment.save();
        res.status(200).json({
            status: 'success',
            data: {
                authorEmail: req.user.email,
                comment
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getComment = async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(404).json({
                status: 'fail',
                message: 'Comment not found'
            });
        }
        res.staus(200).json({
            status: 'success',
            data: {
                comment
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getAllCommentsofQuestion = async (req, res) => {
    try{
        const question = await Question.findById(req.params.questionId);
        if(!question){
            return res.status(404).json({
                status: 'fail',
                message: 'Question not found'
            });
        }
        const comments = await Comment.find({question:question._id});
        res.status(200).json({
            status: 'success',
            data: {
                comments
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}
