const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config
const indexRouter = require("./routes/indexRouter");
const logInRouter = require("./routes/logInRouter");
const signUpRouter = require("./routes/signUpRouter");

//Routes
app.use('/', indexRouter);
app.use('/login', logInRouter);
app.use('/signUp', signUpRouter);












//basic server setup
app.listen(PORT,() =>{console.log(`App is listening on ${PORT}`);});