// routes/partnerRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// 🟢 GET all partners
router.get("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const partners = await db.collection("partners").find().toArray();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partners", error: error.message });
  }
});

// 🟢 GET partner by ID
router.get("/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { id } = req.params;
    const partner = await db.collection("partners").findOne({ _id: new ObjectId(id) });
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partner", error: error.message });
  }
});

// 🟢 POST create new partner
router.post("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const partner = req.body;

    if (!partner.name || !partner.subject || !partner.email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    partner.rating = partner.rating || 0;
    partner.partnerCount = partner.partnerCount || 0;

    const result = await db.collection("partners").insertOne(partner);
    res.status(201).json({ message: "Partner added successfully", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error adding partner", error: error.message });
  }
});

module.exports = router;
