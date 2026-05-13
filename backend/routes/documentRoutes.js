const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { requireAuth } = require("../middleware/auth");
const {
  uploadDocument,
  getDocuments,
  deleteDocument,
} = require("../controllers/documentController");

router.post("/upload", requireAuth, upload.single("file"), uploadDocument);
router.get("/", requireAuth, getDocuments);
router.delete("/:id", requireAuth, deleteDocument);

module.exports = router;
