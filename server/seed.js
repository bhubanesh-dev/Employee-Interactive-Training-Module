const mongoose = require("mongoose");
const Video = require("./path/to/videoModel"); // Adjust the path to your model file

// Sample video data
const videoData = [
  {
    title: "Personal Protective Equipment (PPE)",
    url: "https://res.cloudinary.com/dhrewqkve/video/upload/v1724230791/lizmotors/tutorials/Video3_e2cngm.mp4",
    metadata:
      "Importance of PPE: Explain the significance of PPE in preventing injuries and illnesses in the workplace.",
    order: 1,
  },
  {
    title: "Fire Safety and Prevention",
    url: "https://res.cloudinary.com/dhrewqkve/video/upload/v1724230791/lizmotors/tutorials/Video2_whee5u.mp4",
    metadata:
      "Fire Hazards: Identify potential fire hazards in the workplace, such as electrical equipment, open flames,  and chemical reactions.",
    order: 2,
  },
  {
    title: "Slip, Trip, and Fall Prevention",
    url: "https://res.cloudinary.com/dhrewqkve/video/upload/v1724230790/lizmotors/tutorials/Video1_ra1no8.mp4",
    metadata:
      "Hazards: Identify potential hazards that can lead to slips,  trips, and falls, such as wet floors, uneven surfaces, loose  cords, and cluttered walkways.",
    order: 3,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data if needed
    await Video.deleteMany();

    // Insert the seed data
    await Video.insertMany(videoData);

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding the database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
