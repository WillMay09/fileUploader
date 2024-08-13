const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const {body, validationResult} = require("express-validator");
//const prisma = require('../prisma/');

exports.getSignUpForm = asyncHandler(async (req,res, next) =>{

    
    res.render('signUp');


});

exports.insertSignUpData = asyncHandler(async(req, res, next)=>{

    const{username, email, password, date_of_birth} = req.body;

    await db.insertUser(username, password, email, date_of_birth);
    //await db.selectAllUsers();
    console.log(`User with username: ${username}, Password: ${password}, Email: ${email}, DOB: ${date_of_birth}, has been added`);
    res.redirect("/");

});