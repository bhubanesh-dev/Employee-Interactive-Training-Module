const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/Authenticate");

const router = express.Router();

// router : 1 --> Signup
router.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the user data
    return res.status(201).json({
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;

// router : 2 --> login
router.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Store the secret key in your environment variables
      { expiresIn: "6h" } // Token expiration time
    );

    // Respond with the token and user data
    res.status(200).json({
      authtoken: token,
      message:"Login successful"
      // user: {
      //   id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   completedVideo: user.completed, // Sending user progress for dashboard
      //   lastVideoTimeStamp: user.lastVideoTimeStamp,
      // },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error." });
  }
});

// ROUTE 3: Get logged in User Details using: GET "/auth/getuser". Login required
router.get("/api/auth/getuser", authenticate, async (req, res) => {
  try {
    userId = req.verifyId;
    const userData = await User.findById(userId)
      .select("-password")
      .select("-messages");

    res.send(userData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE 4: update the user progress
router.post("/api/user/updateProgress", authenticate, async (req, res) => {
  try {
    const userId = req.verifyId;
    const { completedVideo, lastVideoTimeStamp } = req.body;
    console.log(req.body);

    if (lastVideoTimeStamp === undefined || lastVideoTimeStamp === null) {
      return res.status(400).json({ message: "Invalid request: lastVideoTimeStamp is required" });
    }
    
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user progress fields
    user.completedVideo = completedVideo !== undefined && completedVideo !== null ? completedVideo : user.completedVideo;
    user.lastVideoTimeStamp = lastVideoTimeStamp;

    // Save the updated user document
    await user.save();

    res.json({ message: "Progress updated successfully" });
  } catch (error) {
    console.error("Error updating progress:", error); // Log error details for debugging
    res.status(500).json({ error: "Error updating progress" });
  }
});


module.exports = router;
