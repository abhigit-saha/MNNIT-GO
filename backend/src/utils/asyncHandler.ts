import { NextFunction } from "express";

const asyncHandler = (fn: Function) => {
  return async (req, res, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export { asyncHandler };
