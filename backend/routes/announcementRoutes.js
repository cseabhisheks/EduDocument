const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");

const {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
} = require("../controllers/announcementController");

router.post("/", requireAuth, createAnnouncement);
router.get("/", getAnnouncements);
router.delete("/:id", requireAuth, deleteAnnouncement);

module.exports = router;