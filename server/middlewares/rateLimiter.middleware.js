const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // max 5 requests per IP
  message: "Too many login attempts. Try again later.",
});

module.exports = { loginLimiter };