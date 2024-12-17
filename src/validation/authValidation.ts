export const validateNewUser = (email: string | undefined | null, password: string | undefined | null): boolean => {
    return validateEmail(email) && validatePassword(password);
}
 

export const validateExistingUser = (email: string | undefined | null, password: string | undefined | null): boolean => {
    return validateEmail(email) && validatePassword(password);
}
 
 const validateEmail = (email: string | undefined | null): boolean => {
    // Check for undefined, null, or empty string
    if (!email || typeof email !== "string") {
      return false;
    }
  
    // Regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };


   const validatePassword = (password: string | undefined | null): boolean => {
    if (!password || typeof password !== "string" || password == "") {
        return false;
      }
      return true;
  }

  export function ensureResourceExists<T>(
    resource: T | null | undefined,
    errorMessage: string,
    status: number = 500
  ): asserts resource is T {
    if (!resource) {
      const error = new Error(errorMessage);
      (error as any).status = status;
      throw error;
    }
  }


  