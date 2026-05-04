const Document = require("../models/Document");

// 📤 Upload document
exports.uploadDocument = async (req, res) => {
  try {
    const { title, department, subject, category } = req.body;

    const newDoc = new Document({
      title,
      department,
      subject,
      category,
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
    res.status(500).json({ error: err.message });
  }
};

// 📥 Get all documents
exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};