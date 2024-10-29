class ApiError extends Error {
  constructor(statusCode, message, errors, stack) {
    super(message);
    this.statusCode = statusCode; // Sets the status code
    this.data = null; // Initializes data to null
    this.success = false; // Indicates that the operation was unsuccessful
    this.errors = errors; // Sets the error details
    if (stack) {
      this.stack = stack; // Sets the stack trace if provided
    } else {
      Error.captureStackTrace(this, this.constructor); // Captures the stack trace
    }
  }
}

export {ApiError};
