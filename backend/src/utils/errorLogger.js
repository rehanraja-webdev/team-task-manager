const errorLogger = (error) => {
  console.error(`[${new Date().toISOString()}]`, error.message);
};

export default errorLogger;
