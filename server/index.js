const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const partnerRoutes = require("./routes/partnerRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Base route
app.get("/", (req, res) => {
  res.send("📡 StudyMate API is running successfully!");
});

// 🧩 Routes
app.use("/api/partners", partnerRoutes);
app.use("/api/requests", requestRoutes);

// 🧩 Connect MongoDB
connectDB();

// ✅ Export app (for Vercel handler)
module.exports = app;

// 🚀 Run locally (only when not in Vercel)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 StudyMate server running locally on port ${port}`);
  });
}
