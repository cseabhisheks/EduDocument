const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  uploadDocument,
  getDocuments,
} = require("../controllers/documentController");

// 🔥 Upload file
router.post("/upload", upload.single("file"), uploadDocument);

// 🔥 Get all documents
router.get("/", getDocuments);

module.exports = router;