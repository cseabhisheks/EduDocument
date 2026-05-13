const mongoose = require("mongoose");
const Document = require("../models/Document");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    await Document.updateMany(
      {
        category: "Assignment",
        uploaderRole: { $in: ["Faculty", "Admin"] },
        $or: [
          { assignmentKind: { $exists: false } },
          { assignmentKind: null },
          { assignmentKind: "" },
        ],
      },
      { $set: { assignmentKind: "handout" } }
    );
    await Document.updateMany(
      {
        category: "Assignment",
        uploaderRole: "Student",
        $or: [
          { assignmentKind: { $exists: false } },
          { assignmentKind: null },
          { assignmentKind: "" },
        ],
      },
      { $set: { assignmentKind: "submission" } }
    );
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;