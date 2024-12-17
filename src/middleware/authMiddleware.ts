import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const authenticate = (req: Request, res: Response, next: NextFunction): void  => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Add user info to the request object
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
