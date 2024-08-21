const{body, validationResult} = require("express-validator");


const validateLogIn = [

    body('username')
    .notEmpty().withMessage("username is required")
    .trim()
    .isString().withMessage("username must be a string"),
    body('password')
    .trim().
    isString().withMessage("password must be a string"),

    (req,res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){

            return res.status(400).render('login.ejs', {errors: errors.array(), values: req.body})
           }

           next();


    }
]

module.exports = {validateLogIn};
