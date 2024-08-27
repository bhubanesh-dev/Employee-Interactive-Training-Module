const express = require("express");
const Video = require("../models/Video");
const videoData = require("../customData/videoData"); // Ensure this path and data are correct

const router = express.Router();

// Route: POST /api/seed/videos
router.post("/api/seed/videos", async (req, res) => {
  try {
    // Clear existing video data
    await Video.deleteMany();

    // Insert the seed data
    await Video.insertMany(videoData);

    console.log("Database seeded successfully!");
    res.status(200).json({ message: "Database seeded successfully!" }); // Send success response
  } catch (error) {
    console.error("Error seeding the database:", error);
    res.status(500).json({ message: "Error seeding the database", error }); // Send error response
  }
});

module.exports = router;
