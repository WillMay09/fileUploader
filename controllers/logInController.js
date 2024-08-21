const asyncHandler = require("express-async-handler");

exports.getLoginPage = asyncHandler(async (req, res, next) =>{

    res.render("login.ejs");

});

exports.postLoginPage = asyncHandler(async (req,res, next)=>{


    

});