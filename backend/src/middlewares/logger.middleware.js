const logger = (req, res, next) => {
  const start = Date.now(); //get the current date

  const userId = req.user?._id || "Guest";
  res.on("finish", () => {
    const duration = Date.now() - start; //time taken to execute the request

    console.log(
      `[${new Date().toISOString()}] ` +
        `${req.method} ${req.originalUrl} ` +
        `User: ${userId} ` +
        `${res.statusCode} - ${duration}ms`,
    );
  });

  next();
};

export default logger;
