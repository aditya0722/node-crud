const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 15000, // max 1500 requests per IP
  message: "Too many requests. Try again later.",
});

module.exports = { apiLimiter };