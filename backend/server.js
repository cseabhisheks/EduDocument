const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔐 Hardcoded admin
const ADMIN = {
  email: "admin@gmail.com",
  password: "12345"
};

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required"
    });
  }

  if (email === ADMIN.email && password === ADMIN.password) {
    return res.status(200).json({
      message: "Login successful ✅",
      token: "admin-token", // 🔐 fake token
      user: {
        email: ADMIN.email,
        role: "admin"
      }
    });
  }

  return res.status(401).json({
    message: "Invalid credentials ❌"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});