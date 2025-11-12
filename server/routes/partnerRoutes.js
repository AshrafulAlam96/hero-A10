// server/routes/partnerRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const { getCollections } = require("../config/db");

const router = express.Router();

/* -----------------------------------------------
   🧩 POST — Create a new partner
------------------------------------------------ */
router.post("/", async (req, res) => {
  try {
    const { partnerCollection } = getCollections();
    const partner = req.body;

    const result = await partnerCollection.insertOne(partner);
    res.status(201).json({
      message: "Partner created successfully",
      id: result.insertedId,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create partner", error: err.message });
  }
});

/* -----------------------------------------------
   🧩 GET — Fetch partners (with search + pagination)
------------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const { partnerCollection } = getCollections();

    // Extract query parameters
    const search = req.query.search || "";
    const subject = req.query.subject || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Build filter
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    if (subject) {
      filter.subject = { $regex: subject, $options: "i" };
    }

    const skip = (page - 1) * limit;

    // Fetch paginated data
    const partners = await partnerCollection
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await partnerCollection.countDocuments(filter);

    res.status(200).json({
      data: partners,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch partners", error: err.message });
  }
});

/* -----------------------------------------------
   🧩 GET — Fetch a single partner by ID
------------------------------------------------ */
router.get("/:id", async (req, res) => {
  try {
    const { partnerCollection } = getCollections();
    const partner = await partnerCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!partner)
      return res.status(404).json({ message: "Partner not found" });

    res.json(partner);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch partner", error: err.message });
  }
});

/* -----------------------------------------------
   🧩 PUT — Update a partner
------------------------------------------------ */
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
    res
      .status(500)
      .json({ message: "Failed to update partner", error: err.message });
  }
});

/* -----------------------------------------------
   🧩 DELETE — Remove a partner
------------------------------------------------ */
router.delete("/:id", async (req, res) => {
  try {
    const { partnerCollection } = getCollections();

    const result = await partnerCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Partner not found" });

    res.json({ message: "Partner deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete partner", error: err.message });
  }
});

module.exports = router;
