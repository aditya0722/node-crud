const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createAccessToken = (id) => {
    
  return jwt.sign(
    { userId: id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const createRefreshToken = (id) => {
 
  
  return jwt.sign(
    { userId: id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { createAccessToken, createRefreshToken };