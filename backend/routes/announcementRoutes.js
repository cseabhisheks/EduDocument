const express = require("express");
const router = express.Router();

const {
  createAnnouncement,
  getAnnouncements
} = require("../controllers/announcementController");

router.post("/", createAnnouncement);
router.get("/", getAnnouncements);

module.exports = router;