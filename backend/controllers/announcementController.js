const Announcement = require("../models/Announcement");
const User = require("../models/User");

// CREATE (caller must be Admin or Faculty — enforced in route)
exports.createAnnouncement = async (req, res) => {
  try {
    const dbUser = await User.findById(req.user.sub).select("role name email");
    if (!dbUser || (dbUser.role !== "Admin" && dbUser.role !== "Faculty")) {
      return res
        .status(403)
        .json({ message: "Only Admin or Faculty can post announcements" });
    }

    const { title, description, author, role } = req.body;

    const newAnnouncement = await Announcement.create({
      title,
      description,
      author: author || dbUser.name || dbUser.email,
      role: role || dbUser.role,
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

// DELETE (Admin only)
exports.deleteAnnouncement = async (req, res) => {
  try {
    const dbUser = await User.findById(req.user.sub).select("role");
    if (!dbUser || dbUser.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Only Admin can delete announcements" });
    }

    const { id } = req.params;
    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};