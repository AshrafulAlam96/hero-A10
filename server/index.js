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

// 👉 Your MongoDB connection string (update username, password, cluster, db)
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
let requestCollection;

// ------------------------------
// MongoDB Connection
// ------------------------------
async function connectDB() {
  try {
    await client.connect();
    const db = client.db(dbName);
    partnerCollection = db.collection("partners");
    requestCollection = db.collection("requests");
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
// PARTNERS CRUD
// ------------------------------
app.post("/api/partners", async (req, res) => {
  try {
    const partner = req.body;
    const result = await partnerCollection.insertOne(partner);
    res.status(201).json({ message: "Partner created", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Failed to create partner", error: err.message });
  }
});

app.get("/api/partners", async (req, res) => {
  try {
    const partners = await partnerCollection.find().toArray();
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch partners", error: err.message });
  }
});

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
// REQUESTS CRUD + STATUS UPDATE
// ------------------------------

// ➕ Send Request (POST)
app.post("/api/requests", async (req, res) => {
  try {
    const { partnerId, requestedBy, message } = req.body;
    if (!partnerId || !requestedBy)
      return res.status(400).json({ message: "Missing partnerId or requestedBy" });

    // prevent duplicates
    const existing = await requestCollection.findOne({ partnerId, requestedBy });
    if (existing)
      return res.status(409).json({ message: "You already requested this partner" });

    const partner = await partnerCollection.findOne({ _id: new ObjectId(partnerId) });
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    const requestDoc = {
      partnerId,
      partnerName: partner.name,
      partnerImage: partner.profileimage,
      subject: partner.subject,
      studyMode: partner.studyMode,
      requestedBy,
      message: message || "",
      status: "pending",
      createdAt: new Date(),
    };

    await requestCollection.insertOne(requestDoc);
    await partnerCollection.updateOne(
      { _id: new ObjectId(partnerId) },
      { $inc: { partnerCount: 1 } }
    );

    res.status(201).json({ message: "Request sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send request", error: err.message });
  }
});

// 📋 Get All Requests by User (GET)
app.get("/api/requests", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email required" });

    const requests = await requestCollection
      .find({ requestedBy: email })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err.message });
  }
});

// ❌ Cancel Request (DELETE)
app.delete("/api/requests/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await requestCollection.findOne({ _id: new ObjectId(id) });
    if (!existing) return res.status(404).json({ message: "Request not found" });

    await requestCollection.deleteOne({ _id: new ObjectId(id) });
    await partnerCollection.updateOne(
      { _id: new ObjectId(existing.partnerId) },
      { $inc: { partnerCount: -1 } }
    );

    res.status(200).json({ message: "Request cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel request", error: err.message });
  }
});

// ✏️ Update Request Status (PATCH)
app.patch("/api/requests/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status value" });

    const result = await requestCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to update request status", error: err.message });
  }
});

// ------------------------------
// Start Server
// ------------------------------
app.listen(port, () => {
  console.log(`🚀 StudyMate server running on port ${port}`);
});

process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await client.close();
  process.exit(0);
});
