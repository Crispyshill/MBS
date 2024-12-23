import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number; // Optional HTTP status code
  code?: string;   // Custom error codes (e.g., "23505" for PostgreSQL unique constraint)
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error occurred:", err.message);

  // Default error response
  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  // Handle known/expected errors
  if (err.status) {
    statusCode = err.status; // Custom status code
    errorMessage = err.message;
  } else if (err.code === "23505") {
    // Handle PostgreSQL unique constraint violation
    statusCode = 409;
    errorMessage = "Duplicate entry: Resource already exists.";
  } else if (err.name === "ValidationError") {
    // Example: Handle validation errors (e.g., Joi, Yup, etc.)
    statusCode = 400;
    errorMessage = err.message;
  } else if (err.name === "JsonWebTokenError") {
    // Handle invalid JWT errors
    statusCode = 401;
    errorMessage = "Invalid authentication token.";
  } else if (err.name === "UnauthorizedError") {
    // Custom unauthorized error
    statusCode = 403;
    errorMessage = "You do not have permission to perform this action.";
  }

  if (err.code === "22P02") {
    statusCode = 400;
    errorMessage = "Invalid input syntax for UUID.";
  } else if (err.status) {
    statusCode = err.status; // Custom status code
    errorMessage = err.message;
  }


  // Send the response
  res.status(statusCode).json({
    success: false,
    error: errorMessage,
  });
};
