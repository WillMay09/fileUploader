const express = require('express');
const signUpController = require("../controllers/signUpController")
const router = express.Router();
const validate = require("../middleware/validateInput");


router.get('/',signUpController.getSignUpForm );

router.post('/',validate.validateUserInput, signUpController.insertSignUpData);


module.exports = router;