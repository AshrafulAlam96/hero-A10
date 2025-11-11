// seedPartners.js
const { MongoClient, ServerApiVersion } = require("mongodb");

// 🔧 Replace with your own MongoDB URI & DB name
const uri = "mongodb+srv://hero-a10-u01:LnbcvrnPHg9imLuI@cluster0.9busnhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "studymateDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// 🧩 Dummy partners data
const partners = [
  { name: "Ashraful Alam", subject: "Mathematics", email: "ashraf@gmail.com", experience: "2 years", location: "Dhaka" },
  { name: "Sumaia Binte Sadeque", subject: "Physics", email: "sumaia@gmail.com", experience: "1 year", location: "Chittagong" },
  { name: "Mahmud Hasan", subject: "Chemistry", email: "mahmud@gmail.com", experience: "3 years", location: "Rajshahi" },
  { name: "Tania Rahman", subject: "Biology", email: "tania@gmail.com", experience: "1.5 years", location: "Khulna" },
  { name: "Rakibul Islam", subject: "English", email: "rakib@gmail.com", experience: "4 years", location: "Sylhet" },
];

async function seedPartners() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const partnerCollection = db.collection("partners");

    await partnerCollection.deleteMany({});
    const result = await partnerCollection.insertMany(partners);

    console.log(`✅ Inserted ${result.insertedCount} partners successfully.`);
  } catch (error) {
    console.error("❌ Seeder failed:", error);
  } finally {
    await client.close();
  }
}

seedPartners();
