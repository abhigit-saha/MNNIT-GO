class ApiError extends Error {
  public statusCode: number;
  public data: any;
  public success: boolean;
  public errors: any;
  public stack?: string;

  constructor(statusCode: number, message: string, errors: any, stack: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
