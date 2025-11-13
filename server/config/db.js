// server/config/db.js
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// ✅ Use environment variable for security
const uri = process.env.MONGO_URI || "mongodb+srv://hero-a10-u01:LnbcvrnPHg9imLuI@cluster0.9busnhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = process.env.DB_NAME || "studymateDB";

// ✅ MongoDB Client Configuration
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: true, // helps with Windows or Render SSL
});

let db, partnerCollection, requestCollection;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);

    partnerCollection = db.collection("partners");
    requestCollection = db.collection("requests");

    console.log("✅ MongoDB Connected Successfully to:", dbName);

    // Optional health check
    await db.command({ ping: 1 });
    console.log("✅ MongoDB Ping Success — Connection Healthy!");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
}

function getCollections() {
  if (!db) throw new Error("❌ Database not initialized yet!");
  return { partnerCollection, requestCollection };
}

module.exports = { connectDB, getCollections, client };
