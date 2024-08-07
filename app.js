const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config
const indexRouter = require("./routes/indexRouter");
const logInRouter = require("./routes/logInRouter");
const signUpRouter = require("./routes/signUpRouter");



//template engine
app.set('views',path.join(__dirname,'views'));
app.set("view engine", 'ejs');
app.use(express.urlencoded({extended: true}));


//database connection
const pool = new Pool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 2000,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,


});


//Routes
app.use('/', indexRouter);
app.use('/login', logInRouter);
app.use('/signUp', signUpRouter);












//basic server setup
app.listen(PORT,() =>{console.log(`App is listening on ${PORT}`);});