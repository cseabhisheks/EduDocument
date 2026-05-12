const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(
 cors({
  origin: '*',
  credentials: true
})
);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});
app.use("/uploads", express.static("uploads"));
app.use("/api/documents", require("./routes/documentRoutes"));

const announcementRoutes = require("./routes/announcementRoutes");

app.use("/api/announcements", announcementRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});