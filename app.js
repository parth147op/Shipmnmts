const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const passport = require('./passportConfig');
const app = express();

mongoose.connect('mongodb+srv://Parth147:parth001@cluster0.aztrh.mongodb.net/Stack-Overflow-Clone?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'stackflow-clone',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Parth147:parth001@cluster0.aztrh.mongodb.net/Stack-Overflow-Clone?retryWrites=true&w=majority'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(flash());
// Set up middleware to make flash messages available in all views
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/', userRoutes);
app.use('/questions',questionRoutes);
app.use('/comments/',commentRoutes);

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
