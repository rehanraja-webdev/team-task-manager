import crypto from "crypto";

const logger = (req, res, next) => {
  const start = Date.now(); //get the current date

  const userId = req.user?._id || "Guest";
  req.requestId = crypto.randomUUID();

  res.setHeader("X-Request-Id", req.requestId);
  res.on("finish", () => {
    const duration = Date.now() - start; //time taken to execute the request

    if (duration > 1000) {
      console.warn("Slow Request");
    }
    
    console.log(`[${req.requestId}]`);
    console.log(
      `[${new Date().toISOString()}] ` +
        `${req.method} ${req.originalUrl} ` +
        `IP: ${req.ip} ` +
        `User: ${userId} ` +
        `StatusCode: ${res.statusCode} - Response Time: ${duration}ms`,
    );

  });

  next();
};

export default logger;
