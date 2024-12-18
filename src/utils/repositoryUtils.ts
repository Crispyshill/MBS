/**
 * Maps database errors to more user-friendly errors.
 * @param error - The database error object.
 * @param entityName - A friendly name for the entity causing the error (e.g., 'Challenge', 'User', etc.).
 * @returns {Error} - A standardized Error object.
 */
export const throwDBErrors = (error: any, entityName: string = "Item"): Error => {
    let message: string;
  
    switch (error.code) {
      case "23505": // Unique constraint violation
        message = `${entityName} already exists. Unique constraint violated.`;
        break;
  
      case "23502": // NOT NULL violation
        message = `Required fields are missing for the ${entityName}.`;
        break;
  
      case "23503": // Foreign key violation
        message = `Invalid reference. Ensure related ${entityName} exists.`;
        break;
  
      case "42601": // SQL syntax error
        message = `Database query syntax error occurred while processing ${entityName}.`;
        break;
  
      case "22001": // String data too long
        message = `One or more fields for ${entityName} exceeded allowed length.`;
        break;
  
      default:
        message = `An unexpected database error occurred while processing ${entityName}.`;
        console.error(`Database Error:`, error); // Log original error for debugging
    }
  
    // Return a new Error object with the custom message
    const customError = new Error(message);
    (customError as any).status = 500; // Attach status for the global error handler
    return customError;
  };
  