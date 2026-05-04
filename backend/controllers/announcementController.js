const Announcement = require("../models/Announcement");

// CREATE
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description, author, role } = req.body;

    const newAnnouncement = await Announcement.create({
      title,
      description,
      author,
      role
    });

    res.status(201).json({
      message: "Announcement created ✅",
      data: newAnnouncement
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL
exports.getAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.find().sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching" });
  }
};