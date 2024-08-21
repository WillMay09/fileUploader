const express = require("express");
const logInController = require("../controllers/logInController");
const logInValidator = require("../middleware/logInValidation");
const router = express.Router();


router.get("/", logInController.getLoginPage);

router.post('/',logInValidator.validateLogIn,logInController.postLoginPage);



module.exports = router;