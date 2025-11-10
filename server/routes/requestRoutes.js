// server/routes/requestRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const { getCollections } = require("../config/db");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { partnerCollection, requestCollection } = getCollections();
    const { partnerId, requestedBy, message } = req.body;

    if (!partnerId || !requestedBy)
      return res.status(400).json({ message: "Missing partnerId or requestedBy" });

    const existing = await requestCollection.findOne({ partnerId, requestedBy });
    if (existing) return res.status(409).json({ message: "Request already exists" });

    const partner = await partnerCollection.findOne({ _id: new ObjectId(partnerId) });
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    const requestDoc = {
      partnerId,
      partnerName: partner.name,
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

router.get("/", async (req, res) => {
  try {
    const { requestCollection } = getCollections();
    const { email } = req.query;
    const requests = await requestCollection.find({ requestedBy: email }).toArray();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { partnerCollection, requestCollection } = getCollections();
    const id = req.params.id;
    const existing = await requestCollection.findOne({ _id: new ObjectId(id) });
    if (!existing) return res.status(404).json({ message: "Request not found" });

    await requestCollection.deleteOne({ _id: new ObjectId(id) });
    await partnerCollection.updateOne(
      { _id: new ObjectId(existing.partnerId) },
      { $inc: { partnerCount: -1 } }
    );

    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete request", error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { requestCollection } = getCollections();
    const id = req.params.id;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const result = await requestCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Request not found" });

    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
});

module.exports = router;
