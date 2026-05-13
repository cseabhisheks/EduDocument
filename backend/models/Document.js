const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({

  title: String,

  department: String,

  subject: String,

  category: String,

  fileName: String,

  fileUrl: String,

  uploadedBy: String,

  uploaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  uploaderRole: {
    type: String,
    default: "",
  },

  /** When category is Assignment: teacher handout vs student submission */
  assignmentKind: {
    type: String,
    enum: ["handout", "submission"],
    default: undefined,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports =
  mongoose.model(
    "Document",
    documentSchema
  );