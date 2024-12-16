import { Router, Request, Response, NextFunction } from "express";
import db from "../utils/db";
import * as dotenv from "dotenv";
import { Challenge } from "../models/challengeModel"; // Ensure this matches your Challenge model
dotenv.config();

const router = Router();

// Getting all challenges
router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await db.query("SELECT * FROM challenges;");
      const challenges: Challenge[] = result.rows; // Properly assign the rows to a typed variable
      res.json(challenges); // Return the challenges array as the response
    } catch (err) {
      next(err); // Pass unhandled errors to the global error handler
    }
  }
);

export default router;
