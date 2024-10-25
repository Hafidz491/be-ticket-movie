const User = require("../models/User");

class UserController {
  static async signupUser(req, res) {
    try {
      // validation
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
      const checking = await User.findOne({ email: req.body.email });
      if (checking) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const user = await User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
