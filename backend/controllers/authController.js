const User = require("../models/User");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, department, enrollment } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      department,
      enrollment
    });

    res.status(201).json({
      message: "Registered successfully ✅",
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    res.json({
      message: "Login successful ✅",
      token: "fake-token",
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};