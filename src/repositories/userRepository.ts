import { UsersChallenge } from "../models/usersChallengeModel";
import db from "../utils/db";

export const insertNewUser = async (
  email: string,
  hashedPassword: string
): Promise<{ id: number; email: string } | null> => {
  try {
    const result = await db.query(
      "INSERT INTO public.users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    // Ensure a valid row was inserted and returned
    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0]; // Return the user object { id, email }
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error inserting new user:", error);
    throw error; // Rethrow the error for handling upstream
  }
};



export const getUser = async (email: string): Promise<{id: number, externalid: string, password_hash: string} | null> => {
  try{
  const result = await db.query(
    "SELECT id, externalid, password_hash FROM users WHERE email = $1", 
    [email]
  );

  if(result.rowCount && result.rowCount > 0) {
    return result.rows[0]
  } else {
    return null;
  }
} catch (error) {
  console.error("Error getting user:", error);
  throw error;
}
}

export const getUsersChallengesRepo = async (userId: string): Promise<UsersChallenge[]> => {
  const result = await db.query(
    "SELECT * FROM usersChallenges WHERE userId = (SELECT Id FROM users WHERE externalId = $1);",
    [userId] // Use parameterized query to avoid SQL injection
  );

  const challenges: UsersChallenge[] = result.rows;
  return challenges;
}

