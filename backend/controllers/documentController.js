const mongoose = require("mongoose");
const Document = require("../models/Document");
const User = require("../models/User");

function toObjectId(id) {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) return null;
  return new mongoose.Types.ObjectId(id);
}

function buildScopeFilter(user) {
  if (!user || user.role === "Admin") {
    return {};
  }

  const uid = toObjectId(user.sub || user.id);

  if (user.role === "Faculty") {
    const dept = user.department || "";
    const teaching = Array.isArray(user.subjects) ? user.subjects : [];

    const assignmentMatch = {
      category: "Assignment",
      department: dept,
    };
    if (teaching.length > 0) {
      assignmentMatch.subject = { $in: teaching };
    }

    return {
      $or: [{ uploaderId: uid }, assignmentMatch],
    };
  }

  // Student
  const dept = user.department || "";
  if (!dept) {
    return {
      category: "Assignment",
      uploaderId: uid,
    };
  }
  return {
    $or: [
      {
        category: { $ne: "Assignment" },
        department: dept,
      },
      {
        category: "Assignment",
        uploaderId: uid,
      },
      {
        category: "Assignment",
        department: dept,
        $or: [
          { assignmentKind: "handout" },
          { uploaderRole: { $in: ["Faculty", "Admin"] } },
        ],
      },
    ],
  };
}

// 📤 Upload document
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dbUser = await User.findById(req.user.sub).select("role");
    if (!dbUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const {
      title,
      department,
      subject,
      category,
      uploadedBy,
    } = req.body;

    const role = dbUser.role;
    let finalCategory = category;

    if (role === "Student") {
      finalCategory = "Assignment";
    }

    if (role === "Student" && finalCategory !== "Assignment") {
      return res.status(403).json({ message: "Students may only submit assignments" });
    }

    const newDoc = new Document({
      title,
      department,
      subject,
      category: finalCategory,
      uploadedBy: uploadedBy || req.user.email,
      uploaderId: toObjectId(req.user.sub),
      uploaderRole: role,
      ...(finalCategory === "Assignment"
        ? {
            assignmentKind:
              role === "Student" ? "submission" : "handout",
          }
        : {}),
      fileName: req.file.originalname,
      fileUrl: req.file.path,
    });

    await newDoc.save();

    res.json({
      success: true,
      message: "Uploaded successfully",
      data: newDoc,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// 📥 Get documents (scoped by role)
exports.getDocuments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dbUser = await User.findById(req.user.sub).select(
      "role department subjects"
    );
    if (!dbUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const effectiveUser = {
      sub: req.user.sub,
      role: dbUser.role,
      department: dbUser.department || "",
      subjects: dbUser.subjects || [],
    };

    const filter = buildScopeFilter(effectiveUser);
    const docs = await Document.find(filter).sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dbUser = await User.findById(req.user.sub).select("role");
    if (!dbUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const uid = toObjectId(req.user.sub);
    const role = dbUser.role;

    if (role === "Admin") {
      await doc.deleteOne();
      return res.json({ message: "Deleted" });
    }

    if (!doc.uploaderId || !uid || !doc.uploaderId.equals(uid)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (role === "Student" && doc.category !== "Assignment") {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (
      role === "Faculty" &&
      (doc.assignmentKind === "submission" || doc.uploaderRole === "Student")
    ) {
      return res.status(403).json({ message: "Faculty cannot delete student submissions" });
    }

    await doc.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
