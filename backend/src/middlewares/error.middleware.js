import errorLogger from "../utils/errorLogger.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  errorLogger(err);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error!",
  });
};

export default errorHandler;
