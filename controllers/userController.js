const User = require("../models/User");

class UserController {
  static async addUser(req, res) {
    const user = await User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async signupUser(req, res) {
    const user = await User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Please enter all fields" });
      } else {
        const checking = User.findOne({ email: req.body.email });
        if (checking) {
          return res.status(400).json({ msg: "Email already exists" });
        }
      }
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
