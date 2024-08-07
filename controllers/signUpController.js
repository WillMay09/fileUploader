const asyncHandler = require("express-async-handler");

exports.getSignUpForm = asyncHandler(async (req,res, next) =>{

    res.render('signUp');


});