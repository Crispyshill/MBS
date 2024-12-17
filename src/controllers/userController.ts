import { NextFunction, Request, Response } from "express";
import { UsersChallenge } from "../models/usersChallengeModel";
import db from "../utils/db";

export const getUsersChallenges = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId; // Get the userId from the URL parameter


      // Fetch challenges for the specified user
      const result = await db.query(
        "SELECT * FROM usersChallenges WHERE userId = (SELECT Id FROM users WHERE externalId = $1);",
        [userId] // Use parameterized query to avoid SQL injection
      );

      const challenges: UsersChallenge[] = result.rows; // Properly type the result
      res.json(challenges); // Return the challenges as JSON
    } catch (err) {
      console.error("Error fetching user's challenges:", err);
      next(err); // Pass the error to the global error handler
    }
  }