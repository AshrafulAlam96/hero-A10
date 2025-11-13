// server/index.js
const express = require("express");
const cors = require("cors");
const { connectDB, client } = require("./config/db");

const partnerRoutes = require("./routes/partnerRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

// 🧠 Base route
app.get("/", (req, res) => {
  res.send("📡 StudyMate API is running...");
});

// 🧩 Route mounting
app.use("/api/partners", partnerRoutes);
app.use("/api/requests", requestRoutes);

// 🚀 Start server and connect DB
app.listen(port, async () => {
  await connectDB();
  console.log(`🚀 StudyMate server running on port ${port}`);
});

// 🧹 Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await client.close();
  process.exit(0);
});
