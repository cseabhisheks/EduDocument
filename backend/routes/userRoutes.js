const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const {
  listUsers,
  listDepartmentStudents,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/department-students", requireAuth, listDepartmentStudents);
router.get("/", requireAuth, listUsers);
router.patch("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);

module.exports = router;
