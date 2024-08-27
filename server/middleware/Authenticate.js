const jwt = require("jsonwebtoken");
const User = require("../models/User");

const Authenticate = async (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("authtoken");
  
  // If token is not provided, respond early and return to avoid further execution
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token 26 " });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    console.log("Token authenticated");
    
    req.verifyId = data.userId;
    next(); // Move to the next middleware only after successful authentication
  } catch (error) {
    // Handle any errors during token verification
    console.error("Token verification failed:", error.message);
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = Authenticate;
