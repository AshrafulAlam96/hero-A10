// index.js
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------
// Server & Database Configuration
// ------------------------------
const port = 5000;

// 👉 Your MongoDB connection string (edit username, password, cluster name, and db)
const uri =
  "mongodb+srv://hero-a10-u01:LnbcvrnPHg9imLuI@cluster0.9busnhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Database name
const dbName = "studymateDB";

// MongoDB client using official driver setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let partnerCollection;

// ------------------------------
// MongoDB Connection
// ------------------------------
async function connectDB() {
  try {
    await client.connect();
    const db = client.db(dbName);
    partnerCollection = db.collection("partners");
    console.log("✅ Connected to MongoDB Atlas successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}
connectDB();

// ------------------------------
// Base Route
// ------------------------------
app.get("/", (req, res) => {
  res.send("📡 StudyMate API is running...");
});

// ------------------------------
// CRUD Operations
// ------------------------------

// ➕ CREATE Partner (POST)
app.post("/api/partners", async (req, res) => {
  try {
    const partner = req.body;
    const result = await partnerCollection.insertOne(partner);
    res.status(201).json({ message: "Partner created", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Failed to create partner", error: err.message });
  }
});

// 📖 READ All Partners (GET)
app.get("/api/partners", async (req, res) => {
  try {
    const partners = await partnerCollection.find().toArray();
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch partners", error: err.message });
  }
});

// 📖 READ Partner by ID (GET)
app.get("/api/partners/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const partner = await partnerCollection.findOne({ _id: new ObjectId(id) });
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json(partner);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch partner", error: err.message });
  }
});

// ✏️ UPDATE Partner (PUT)
app.put("/api/partners/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await partnerCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Partner not found" });
    res.status(200).json({ message: "Partner updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update partner", error: err.message });
  }
});

// ❌ DELETE Partner (DELETE)
app.delete("/api/partners/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await partnerCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Partner not found" });
    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete partner", error: err.message });
  }
});

// ------------------------------
// Start Server
// ------------------------------
app.listen(port, () => {
  console.log(`🚀 StudyMate server running on port ${port}`);
});

// Optional: Close MongoDB client when server stops
process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await client.close();
  process.exit(0);
});
