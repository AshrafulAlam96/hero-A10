// server/seedPartners.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://hero-a10-u01:LnbcvrnPHg9imLuI@cluster0.9busnhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "studymateDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function seedPartners() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("partners");

    // Delete old data
    await collection.deleteMany({});

    // Dummy partner records (20)
    const partners = [
      {
        name: "Ashraful Alam",
        subject: "Data Science",
        university: "University of Dhaka",
        level: "Intermediate",
        location: "Dhaka",
        studyMode: "Online",
        description: "Looking for a study partner to practice Python and statistics.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        name: "Mim Rahman",
        subject: "English Literature",
        university: "Rajshahi University",
        level: "Advanced",
        location: "Rajshahi",
        studyMode: "Offline",
        description: "I enjoy literature discussions and want a study mate for analysis practice.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        name: "Tanvir Ahmed",
        subject: "Mathematics",
        university: "BUET",
        level: "Advanced",
        location: "Dhaka",
        studyMode: "Hybrid",
        description: "Passionate about calculus and linear algebra problem-solving sessions.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        name: "Nusrat Jahan",
        subject: "Economics",
        university: "Jahangirnagar University",
        level: "Intermediate",
        location: "Savar",
        studyMode: "Online",
        description: "Need a partner to discuss macroeconomic models and policy analysis.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      {
        name: "Rakibul Hasan",
        subject: "Computer Science",
        university: "AUST",
        level: "Beginner",
        location: "Dhaka",
        studyMode: "Online",
        description: "Learning MERN stack development; looking for practice buddies.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      {
        name: "Samia Hossain",
        subject: "Biology",
        university: "Chittagong University",
        level: "Intermediate",
        location: "Chittagong",
        studyMode: "Offline",
        description: "Preparing for MSc in Genetics; need someone for revision and group study.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
      },
      {
        name: "Mahmudul Islam",
        subject: "Physics",
        university: "Khulna University",
        level: "Advanced",
        location: "Khulna",
        studyMode: "Online",
        description: "Focused on quantum mechanics and thermodynamics. Collaboration welcome!",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
      },
      {
        name: "Afsana Akter",
        subject: "Chemistry",
        university: "RUET",
        level: "Intermediate",
        location: "Rajshahi",
        studyMode: "Offline",
        description: "Would love to review organic chemistry with another student.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/8.jpg",
      },
      {
        name: "Jahidul Karim",
        subject: "Statistics",
        university: "University of Dhaka",
        level: "Advanced",
        location: "Dhaka",
        studyMode: "Hybrid",
        description: "Need a data partner for probability and regression analysis projects.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/9.jpg",
      },
      {
        name: "Riya Sultana",
        subject: "Law",
        university: "North South University",
        level: "Beginner",
        location: "Dhaka",
        studyMode: "Online",
        description: "Looking for someone to study legal case summaries together.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/10.jpg",
      },
      {
        name: "Arif Chowdhury",
        subject: "Business Administration",
        university: "East West University",
        level: "Intermediate",
        location: "Dhaka",
        studyMode: "Offline",
        description: "Want to improve strategic management concepts via group discussions.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
      },
      {
        name: "Tanjila Islam",
        subject: "Psychology",
        university: "BRAC University",
        level: "Intermediate",
        location: "Dhaka",
        studyMode: "Online",
        description: "Interested in behavioral science and emotional intelligence studies.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
      },
      {
        name: "Fahim Reza",
        subject: "History",
        university: "National University",
        level: "Beginner",
        location: "Gazipur",
        studyMode: "Online",
        description: "Would love to discuss world history and ancient civilizations.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/13.jpg",
      },
      {
        name: "Jannatul Ferdous",
        subject: "Political Science",
        university: "Dhaka College",
        level: "Intermediate",
        location: "Dhaka",
        studyMode: "Offline",
        description: "Want to practice writing essays and analyze political systems.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/14.jpg",
      },
      {
        name: "Shakib Hasan",
        subject: "Finance",
        university: "IBA, University of Dhaka",
        level: "Advanced",
        location: "Dhaka",
        studyMode: "Hybrid",
        description: "Preparing for CFA exams; looking for discussion and problem-solving buddy.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
      },
      {
        name: "Ayesha Siddiqua",
        subject: "Sociology",
        university: "Jahangirnagar University",
        level: "Intermediate",
        location: "Savar",
        studyMode: "Offline",
        description: "Interested in cultural studies and social behavior analysis.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/16.jpg",
      },
      {
        name: "Rashid Hossain",
        subject: "Engineering Mechanics",
        university: "KUET",
        level: "Advanced",
        location: "Khulna",
        studyMode: "Online",
        description: "Focused on mechanical structures; want to collaborate on problem sets.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/17.jpg",
      },
      {
        name: "Mehjabin Alam",
        subject: "Philosophy",
        university: "Dhaka University",
        level: "Beginner",
        location: "Dhaka",
        studyMode: "Online",
        description: "Interested in logic and ethics discussions; want a thoughtful partner.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/18.jpg",
      },
      {
        name: "Sajid Rahman",
        subject: "Information Technology",
        university: "AIUB",
        level: "Intermediate",
        location: "Dhaka",
        studyMode: "Offline",
        description: "Exploring networking and database systems; open to collaboration.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/19.jpg",
      },
      {
        name: "Tania Akter",
        subject: "Environmental Science",
        university: "Sylhet Agricultural University",
        level: "Advanced",
        location: "Sylhet",
        studyMode: "Hybrid",
        description: "Working on environmental policy research; need someone for discussion.",
        partnerCount: 0,
        profileImage: "https://randomuser.me/api/portraits/women/20.jpg",
      },
    ];

    const result = await collection.insertMany(partners);
    console.log(`✅ Seeded ${result.insertedCount} partners successfully!`);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await client.close();
  }
}

seedPartners();
