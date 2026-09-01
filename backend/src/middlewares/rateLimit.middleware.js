import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: (req) => {
    return req.user?.role === "admin" ? 500 : 100;
  },

  //no limit for admin
  // skip: (req) => {
  //   return req.user?.role === "admin";
  // },

  handler: (req, res, next, options) => {
    console.warn(`Rate limit exceeded by IP: ${req.ip}`);

    res.status(429).json({
      success: false,
      message: "Rate limit exceedeed",
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,
  skipSuccessfulRequests: true, //will not count for successfull request
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});

export default rateLimiter;
