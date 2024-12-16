import { Router, Request, Response, NextFunction } from "express";
import db from "../utils/db";
import * as dotenv from "dotenv";
import { UsersChallenge } from "../models/usersChallengeModel"; // Ensure this matches your UsersChallenge model
dotenv.config();

const router = Router();

// Get all challenges for a specific user
router.get(
  "/:userId/challenge",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId; // Get the userId from the URL parameter

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      // Fetch challenges for the specified user
      const result = await db.query(
        "SELECT * FROM usersChallenges WHERE userId = $1;",
        [userId] // Use parameterized query to avoid SQL injection
      );

      const challenges: UsersChallenge[] = result.rows; // Properly type the result
      res.json(challenges); // Return the challenges as JSON
    } catch (err) {
      console.error("Error fetching user's challenges:", err);
      next(err); // Pass the error to the global error handler
    }
  }
);

export default router;
