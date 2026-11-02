// server/routes/requestRoutes.js

const express = require("express");
const { ObjectId } = require("mongodb");
const { connectDB, getCollections } = require("../config/db");

const router = express.Router();

/* -----------------------------------------------
   ✅ Ensure DB Connection (for Vercel)
------------------------------------------------ */
async function ensureDB() {
  try {
    await connectDB();
    return getCollections();
  } catch (err) {
    console.error("❌ Failed to ensure DB:", err.message);
    throw new Error("Database not connected yet");
  }
}

/* -----------------------------------------------
   🧩 POST — Send a new connection request
------------------------------------------------ */
router.post("/", async (req, res) => {
  try {
    const { partnerCollection, requestCollection } = await ensureDB();

    const { partnerId, requestedBy, message } = req.body;

    if (!partnerId || !requestedBy) {
      return res.status(400).json({
        message: "Missing partnerId or requestedBy",
      });
    }

    // ✅ Prevent duplicate request
    const existing = await requestCollection.findOne({
      partnerId,
      requestedBy,
    });

    if (existing) {
      return res.status(409).json({
        message: "Request already exists",
      });
    }

    // ✅ Find Partner
    const partner = await partnerCollection.findOne({
      _id: new ObjectId(partnerId),
    });

    if (!partner) {
      return res.status(404).json({
        message: "Partner not found",
      });
    }

    const requestDoc = {
      partnerId,
      partnerName: partner.name,
      requestedBy,
      message: message || "",
      status: "pending",
      createdAt: new Date(),
    };

    // ✅ Save Request
    await requestCollection.insertOne(requestDoc);

    // ✅ Assignment Requirement:
    // Increase Partner Count by 1 using $inc
    await partnerCollection.updateOne(
      {
        _id: new ObjectId(partnerId),
      },
      {
        $inc: {
          partnerCount: 1,
        },
      }
    );

    res.status(201).json({
      message: "Request sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to send request",
      error: err.message,
    });
  }
});

/* -----------------------------------------------
   🧩 GET — Fetch user requests
------------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const { requestCollection } = await ensureDB();

    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const requests = await requestCollection
      .find({
        requestedBy: email,
      })
      .toArray();

    res.json(requests);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch requests",
      error: err.message,
    });
  }
});

/* -----------------------------------------------
   🧩 DELETE — Delete a request
------------------------------------------------ */
router.delete("/:id", async (req, res) => {
  try {
    const { requestCollection } = await ensureDB();

    const id = req.params.id;

    const result = await requestCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    res.json({
      message: "Request deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete request",
      error: err.message,
    });
  }
});

/* -----------------------------------------------
   🧩 PATCH — Update request status
------------------------------------------------ */
router.patch("/:id", async (req, res) => {
  try {
    const { requestCollection } = await ensureDB();

    const id = req.params.id;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const result = await requestCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { status },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    res.json({
      message: `Request ${status}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update status",
      error: err.message,
    });
  }
});

module.exports = router;