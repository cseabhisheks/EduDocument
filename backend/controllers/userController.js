const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/User");

function stripPassword(user) {
  const o = user.toObject ? user.toObject() : { ...user };
  delete o.password;
  return o;
}

// GET /api/users — Admin only; optional ?role=Faculty|Student
exports.listUsers = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const { role } = req.query;
    const filter = {};
    if (role) filter.role = role;
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/users/department-students — Faculty (same dept) or Admin (all)
exports.listDepartmentStudents = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "Admin" && role !== "Faculty") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const filter = { role: "Student" };
    if (role === "Faculty") {
      filter.department = req.user.department || "";
    }
    const users = await User.find(filter).select("-password").sort({ name: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PATCH /api/users/:id — Admin only
exports.updateUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name, email, role, department, enrollment, subjects, password } =
      req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;
    if (department !== undefined) user.department = department;
    if (enrollment !== undefined) user.enrollment = enrollment;

    if (subjects !== undefined) {
      user.subjects = Array.isArray(subjects)
        ? subjects
        : String(subjects)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }

    if (password && String(password).length > 0) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (user.role !== "Faculty") {
      user.subjects = [];
    }

    await user.save();
    res.json(stripPassword(user));
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /api/users/:id — Admin only
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (req.params.id === req.user.sub) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
