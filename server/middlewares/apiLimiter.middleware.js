const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 150, // max 5 requests per IP
  message: "Too many login attempts. Try again later.",
});

module.exports = { apiLimiter };