const mongoose = require("mongoose");
const dburl = process.env.DATABASE_URL;


mongoose
  .connect(dburl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log("connection failed", err));
