import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    console.warn(`Rate limit exceeded by IP: ${req.ip}`);

    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  },
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
