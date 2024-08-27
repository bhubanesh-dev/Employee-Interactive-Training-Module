const express = require("express");
const Video = require("../models/Video");


const router = express.Router();

// route:1 --> post the video url with module type
router.post("/api/videos", async (req, res) => {
  try {
    const { Url, title, moduleNumber, moduleName, order } = req.body;

    // Check if all required fields are present
    if (!Url || !title || !moduleNumber || !moduleName || !order) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new video document
    const newVideo = new Video({
      Url,
      title,
      moduleNumber,
      moduleName,
      order,
    });

    // Save the video to the database
    await newVideo.save();

    res.status(201).json(newVideo);
  } catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
  }
});



// Route: 2-->  Fetch all videos in sequence
router.get('/api/videos', async (req, res) => {
  try {
    // Fetch all videos and sort them by the 'order' field
    const videos = await Video.find().sort({ order: 1 });


    // Send the response with the videos
    res.json(videos);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching videos:', error);

    // Send error response
    res.status(500).json({ error: 'Error fetching videos' });
  }
});


module.exports = router;