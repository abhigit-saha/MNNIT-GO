const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error("Async handler caught error:", error);

      const statusCode =
        typeof error.statusCode === "number" ? error.statusCode : 500;

      res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
};

export { asyncHandler };
