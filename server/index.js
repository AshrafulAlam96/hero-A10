const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const partnerRoutes = require("./routes/partnerRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("📡 StudyMate API (Vercel) is running..."));

app.use("/api/partners", partnerRoutes);
app.use("/api/requests", requestRoutes);

connectDB().catch((err) => console.error("DB init failed:", err.message));

module.exports = app;
