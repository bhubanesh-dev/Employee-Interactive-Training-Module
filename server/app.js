const express = require("express");
const dotenv = require("dotenv");
const cookiePraser = require("cookie-parser");

dotenv.config(); // Load environment variables from .env file

const cors = require("cors");

const app = express(); // Correctly invoked express

require("./dbconfig");

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookiePraser());
app.use(require("./router/videoRoute"));
app.use(require("./router/SeedDatabase"));
app.use(require("./router/loginRoute"));



app.get("/", (req, res) => {
  res.send(`Hello from Coder `);
});
app.listen(5000, () => {
  console.log("Server listening at port http://localhost:5000");
});
