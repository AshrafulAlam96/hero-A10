// server/config/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://hero-a10-u01:LnbcvrnPHg9imLuI@cluster0.9busnhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "studymateDB";

// ✅ Force TLS and allow self-signed certs (fixes Windows SSL issue)
const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db, partnerCollection, requestCollection;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    partnerCollection = db.collection("partners");
    requestCollection = db.collection("requests");
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
}

function getCollections() {
  if (!db) throw new Error("❌ Database not initialized!");
  return { partnerCollection, requestCollection };
}

module.exports = { connectDB, getCollections, client };
