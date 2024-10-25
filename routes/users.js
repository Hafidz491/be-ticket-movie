var express = require("express");
const UserController = require("../controllers/userController");
const User = require("../models/User");
var router = express.Router();
let Users = [];

/* GET users listing. */
router.post("/signup", UserController.signupUser);

module.exports = router;
