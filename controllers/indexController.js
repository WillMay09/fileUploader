const asyncHandler = require("express-async-handler");

exports.getPublicCollection = asyncHandler(async (req, res, next) =>{

    res.render("index");

});