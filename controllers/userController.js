const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static async signupUser(req, res) {
    try {
      // validation
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }

      //   check if user exists
      const checking = await User.findOne({ email: req.body.email });
      if (checking) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const user = await User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });

      const newUser = await user.save();
      res.status(201).json(newUser);
      console.log("Berhasil Membuat akun!");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async loginUser(req, res) {
    try {
      // validation input form
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields!" });
      }

      //   check if user exists
      const user = await User.findOne({ email });
      console.log("Login Berhasil!");
      if (!user) {
        return res.status(400).json({ msg: "User does not exist!" });
      }

      //   checking valid password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Password!" });
      }

      //   make jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({
        message: "Login Berhasil!",
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async detailUser(req, res) {
    try {
      // get ID
      const id = req.params.id;

      // checking user id
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "User not found!" });
      }

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
