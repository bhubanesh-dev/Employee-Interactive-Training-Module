const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // Corrected the typo

dotenv.config(); // Load environment variables from .env file

const cors = require("cors");

const app = express(); // Correctly invoked express

require("./dbconfig");

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser()); // Corrected typo
app.use(require("./router/videoRoute"));
app.use(require("./router/SeedDatabase"));
app.use(require("./router/loginRoute"));

app.get("/", (req, res) => {
  res.send(`Hello from Coder`);
});

const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
