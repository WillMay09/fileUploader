const express = require("express");
const path = require("path");
const { store } = require("./db/pool");
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('passport');
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
    secret: "deez_nuts",
    resave: false,
    saveUninitialized: false,
    cookie: {//cookie is placed in http response header

            secure: false,
            maxAge: 1000 * 60 * 60 * 24

    }
}));



app.use(express.urlencoded({extended: true}));


//database connection



//Routes
app.use('/', indexRouter);
app.use('/login', logInRouter);
app.use('/signUp', signUpRouter);












//basic server setup
app.listen(PORT,() =>{console.log(`App is listening on ${PORT}`);});