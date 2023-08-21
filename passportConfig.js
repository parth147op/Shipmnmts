const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require('bcrypt');

passport.use('local-signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, async (req, email, password, done)=>{
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return done(null, false, req.flash('error', 'User already exists'));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password:hashedPassword
        });
        await newUser.save();
        return done(null, newUser, req.flash('success', 'Signed up successfully'));

    }catch(err){
        return done(err);
    }
}));

passport.use('local-login', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, async (req, email, password, done)=>{
    try{
        const user = await User.findOne({email});
        if(!user){
            return done(null, false, req.flash('error', 'User does not exist'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return done(null, false, req.flash('error', 'Incorrect password'));
        }
        return done(null, user, req.flash('success', 'Logged in successfully'));

    }catch(err){
        return done(err);
    }
}));

passport.serializeUser((user, done)=>{
    done(null, user._id);
});

passport.deserializeUser(async (id, done)=>{
    try{
        const user = await User.findById(id);
        done(null, user);
    }catch(err){
        done(err);
    }
}
);

module.exports = passport;
