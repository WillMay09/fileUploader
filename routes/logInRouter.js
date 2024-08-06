const express = require("express");
const logInController = require("../controllers/logInController");
const router = express.Router();


router.get("/", logInController.getLoginPage);



module.exports = router;