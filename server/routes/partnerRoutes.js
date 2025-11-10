// server/routes/partnerRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const { getCollections } = require("../config/db");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { partnerCollection } = getCollections();
    const partner = req.body;
    const result = await partnerCollection.insertOne(partner);
    res.status(201).json({ message: "Partner created", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Failed to create partner", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { partnerCollection } = getCollections();
    const partners = await partnerCollection.find().toArray();
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch partners", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { partnerCollection } = getCollections();
    const partner = await partnerCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.json(partner);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch partner", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { partnerCollection } = getCollections();
    const result = await partnerCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Partner not found" });
    res.json({ message: "Partner updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update partner", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { partnerCollection } = getCollections();
    const result = await partnerCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Partner not found" });
    res.json({ message: "Partner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete partner", error: err.message });
  }
});

module.exports = router;
