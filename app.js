const express = require("express");
const path = require("path");
const { pool } = require("./db/pool");
const { store } = require("./db/pool");
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('./db/passport');
var crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

//importing routes
const indexRouter = require("./routes/indexRouter");
const logInRouter = require("./routes/logInRouter");
const signUpRouter = require("./routes/signUpRouter");



//template engine
app.set('views',path.join(__dirname,'views'));
app.set("view engine", 'ejs');


//session store setup
app.use(session({
    store: store,
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    cookie: {//cookie is placed in http response header
            maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use((req,res,next) => {

        console.log(req.session);
        next();


});

// const insertSession = async () => {
//     const client = await pool.connect();
//     try {
//         await client.query('INSERT INTO sessions (sid, sess, expire) VALUES ($1, $2, $3)', ['test_sid', '{}', new Date()]);
//     } catch (err) {
//         console.error('Error inserting session:', err);
//     } finally {
//         client.release();
//     }
// };

// insertSession();

//intialize passport and session
app.use(passport.initialize());
app.use(passport.session());//we need this to access session info in db

app.use(express.urlencoded({extended: true}));






//Routes
app.use('/', indexRouter);
app.use('/login', logInRouter);
app.use('/signUp', signUpRouter);












//basic server setup
app.listen(PORT,() =>{console.log(`App is listening on ${PORT}`);});