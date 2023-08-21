const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('../passportConfig');

const router = express.Router();

router.get('/', (req, res)=>{
    res.json({message:'Welcome to Stackflow clone'});
});

router.post('/register', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return next(err); // Handle error
        }
        if (!user) {
            // If user registration failed, send a failure message
            return res.status(401).json({ message: 'Registration failed', info: info });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Registration successful', user: req.user,session:req.sessionID });
        });
    })(req, res, next);
});



router.post('/login', (req, res, next) => {
    console.log(req.user);
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            return next(err); // Handle error
        }
        if (!user) {
            // If authentication failed, send a failure message
            return res.status(401).json({ message: 'Authentication failed', info: info });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Login successful', user: req.user,session:req.sessionID });
        });
    })(req, res, next);
});


router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logout successful' })
    });
});

router.get('/profile',isAuthenicated,async (req,res)=>{
    console.log(req.user);
    res.json({message:'You made it to the secure route',user:req.user});
})

function isAuthenicated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.json({message:'You are not authenticated'})
}
module.exports = router;
