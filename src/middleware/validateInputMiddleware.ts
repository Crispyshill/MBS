import { Request, Response, NextFunction } from "express";
import { validateNewUser } from "../validation/authValidation";

export const validateRegisterInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!validateNewUser) {
    res
      .status(400)
      .json({ success: false, error: "Invalid email format or password cannot be empty." });
      return 

  }

  next();
};


export const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
  
    if (!validateNewUser) {
      res
        .status(400)
        .json({ success: false, error: "Login input format is incorrect" });
        return 
  
    }
  
    next();
  };
