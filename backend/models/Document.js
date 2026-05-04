const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: String,
  department: String,
  subject: String,
  category: String,
  fileName: String,
  fileUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentSchema);