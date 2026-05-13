const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getJwtSecret } = require("../middleware/auth");

function signUserToken(userDoc) {
  const subjects = Array.isArray(userDoc.subjects) ? userDoc.subjects : [];
  return jwt.sign(
    {
      sub: userDoc._id.toString(),
      email: userDoc.email,
      role: userDoc.role,
      name: userDoc.name,
      department: userDoc.department || "",
      subjects,
    },
    getJwtSecret(),
    { expiresIn: "7d" }
  );
}

async function verifyPassword(plain, stored) {
  if (!stored) return false;
  if (typeof stored === "string" && stored.startsWith("$2")) {
    return bcrypt.compare(plain, stored);
  }
  return plain === stored;
}

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, department, enrollment, subjects } =
      req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashed = await bcrypt.hash(password, 10);

    let facultySubjects = [];
    if (role === "Faculty" && subjects) {
      facultySubjects = Array.isArray(subjects)
        ? subjects
        : String(subjects)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "Student",
      department,
      enrollment,
      subjects: role === "Faculty" ? facultySubjects : [],
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      message: "Registered successfully ✅",
      user: userObj,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    const token = signUserToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      message: "Login successful ✅",
      token,
      user: userObj,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
