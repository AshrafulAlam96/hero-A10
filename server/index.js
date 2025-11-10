// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const partnerRoutes = require("./routes/partnerRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
let db;
async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    app.locals.db = db;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
connectDB();

// Base route
app.get("/", (req, res) => {
  res.send("📡 StudyMate API is running...");
});

// Mount partner routes
app.use("/api/partners", partnerRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 StudyMate server running on port ${port}`);
});
