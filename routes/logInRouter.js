const express = require("express");
const logInController = require("../controllers/logInController");
const logInValidator = require("../middleware/logInValidation");
const passport = require('passport');
const router = express.Router();


router.get("/", logInController.getLoginPage);

router.post('/',logInValidator.validateLogIn,passport.authenticate('local', {failureRedirect: '/login-failure'}),logInController.postLoginPage);

//log in failure
router.get("/login-failure", logInController.getLoginFailure);



module.exports = router;