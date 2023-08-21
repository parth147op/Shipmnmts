const Question = require('../models/question');

exports.createQuestion = async (req, res) => {
    try{
        const {title,body,author} = req.body;
        const questionTitle = await Question.findOne({title});
        if(questionTitle){
            return res.status(404).json({
                status: 'fail',
                message: 'Question title already exists'
            });
        }

        const question = new Question({
            title,
            body,
            author:req.user._id,
        });
        await question.save();
        res.status(200).json({
            status: 'success',
            data: {
                authorEmail: req.user.email,
                question
            }
        });
    }catch(err){
        console.log(err);
    }
}

exports.getQuestion = async (req, res) => {
    try{
        const question = await Question.findById(req.params.questionId).populate('author').populate('comments');;
        if(!question){
            return res.status(404).json({
                status: 'fail',
                message: 'Question not found'
            });
        }
        res.json(question);
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });

    }
}

exports.getAllQuestions = async (req, res) => {
    try{
        const questions = await Question.find().populate('author').populate('comments');
        res.json(questions);
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateQuestion = async (req, res) => {
    try{
        const question = await Question.findByIdAndUpdate(req.params.questionId, req.body, {
            new: true,
            runValidators: true
        });
        if(!question){
            return res.status(404).json({
                status: 'fail',
                message: 'Question not found'
            });
        }
        res.json(question);
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.deleteQuestion = async (req, res) => {
    try{
        const question = await Question.findByIdAndDelete(req.params.questionId);
        if(!question){
            return res.status(404).json({
                status: 'fail',
                message: 'Question not found'
            });
        }
        res.json({
            status: 'success',
            message: 'Question deleted successfully'
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.upvoteQuestion = async (req, res) => {
    try{
        const question = await Question.findByIdAndUpdate(req.params.questionId,{ $inc: { votes: 1 } }, {
            new: true,
        });
        if(!question){
            return res.status(404).json({
                status: 'fail',
                message: 'Question not found'
            });
        }
        res.json({
            status: 'success',
            message: 'Question upvoted successfully',
            data: {
                question
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.downvoteQuestion = async (req, res) => {
    try{
        const question = await Question.findByIdAndUpdate(
            req.params.questionId,
            { $inc: { votes: -1 } }, // Decrement the votes field by 1
            { new: true }  // This option returns the updated document
        );
        if(!question){
            return res.status(404).json({
                status: 'fail',
                message: 'Question not found'
            });
        }
        res.json({
            status: 'success',
            message: 'Question downvoted successfully',
            data: {
                question
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });

    }
}
