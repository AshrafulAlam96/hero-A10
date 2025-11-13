// server/config/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://hero-a10-u01:LnbcvrnPHg9imLuI@cluster0.9busnhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = process.env.DB_NAME || "studymateDB";

let client;
let db;
let partnerCollection, requestCollection;

// ✅ Lazy connection for serverless environments (like Vercel)
async function connectDB() {
  if (db) return db; // already connected

  try {
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }

    await client.connect();
    db = client.db(dbName);
    partnerCollection = db.collection("partners");
    requestCollection = db.collection("requests");

    console.log("✅ MongoDB Connected Successfully (Vercel-safe)");
    return db;
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    throw err;
  }
}

// ✅ Always ensures connection before returning collections
async function getCollections() {
  if (!db) await connectDB();
  if (!db) throw new Error("Database not connected yet");

  return { partnerCollection, requestCollection };
}

module.exports = { connectDB, getCollections };
