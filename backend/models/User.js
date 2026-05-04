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
  enrollment: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);