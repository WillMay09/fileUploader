const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const {body, validationResult} = require("express-validator");
const genPassword = require("../db/passwordUtil").genPassword;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getSignUpForm = asyncHandler(async (req,res, next) =>{


    
    res.render('signUp');


});

exports.insertSignUpData = asyncHandler(async(req, res, next)=>{

    const{username, email, password, date_of_birth} = req.body;

   //prisma implementation
    const hashedPassword = genPassword(password);//contains salt and hashed Password
     // Convert the date_of_birth from 'YYYY-MM-DD' to ISO-8601 DateTime
     const formattedDateOfBirth = new Date(date_of_birth + 'T00:00:00Z');

    const user = {

        username: username,
        hash: hashedPassword.hash,
        email: email,
        date_of_birth: formattedDateOfBirth,
        salt: hashedPassword.salt,
        

    };

    await prisma.users.create({

        data: user
    });
   
   
   
    //await db.insertUser(username, password, email, date_of_birth);
    //await db.selectAllUsers();
    console.log(`User with username: ${username}, Password: ${password}, Email: ${email}, DOB: ${date_of_birth}, has been added`);
    res.redirect("/");

});