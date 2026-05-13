const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "Student"
  },
  department: String,
  enrollment: String,
  /** Subjects this faculty member teaches (used to match student assignments). */
  subjects: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);