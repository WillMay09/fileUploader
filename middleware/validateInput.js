const { body, validationResult } = require('express-validator');
//body allows you to specify which fields in the request body should be validated

const validateUserInput = [ 
    
    body('username')
        .trim()
        .isString()
        .withMessage('Username must be a String')
        .isLength({max:20})
        .withMessage("Username can be a maximum of 20 characters"),

        body('password')
        .trim()
        .isString()
        .withMessage('Password must be a String')
        .isLength({min: 8})
        .withMessage("Password must be atleast 8 characters long")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
         .withMessage("Password must contain atleast 1 special character"),
        

        body('email')
        .trim()
        .isString()
        .withMessage("Email must be a String"),

        body('date_of_birth')
        .custom((value)=>{
            
            const inputDate = new Date(value);
            const today = new Date();

            if(inputDate >= today){

                throw Error('Date of Birth cannot be in the future');
            }

            return true;

        }),
    
    
    
    (req, res, next)=>{
        const errors = validationResult(req);
        //if there are errors in the validation process
        if(!errors.isEmpty()){

         return res.render('signUp.ejs', {errors: errors.array(), values: req.body})
        }

        next();

}];
module.exports = {validateUserInput};