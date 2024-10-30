var express = require("express");
const UserController = require("../controllers/userController");
const User = require("../models/User");
var router = express.Router();

/* GET users listing. */
router.post("/signup", UserController.signupUser);
router.post("/auth/login", UserController.loginUser);
router.get("/detail/:id", UserController.detailUser);

module.exports = router;
