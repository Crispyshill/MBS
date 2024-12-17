import { hashPassword } from "../utils/auth";
import { insertNewUser, getUsersChallengesRepo } from "../repositories/userRepository";
import { getUser } from "../repositories/userRepository";
import { ensureResourceExists } from "../validation/authValidation";
import { comparePassword } from "../utils/auth";
import { UsersChallenge } from "../models/usersChallengeModel";

export const createNewUser = async (email: string, password: string): Promise<{ id: number; email: string } | null> => {
  const hashedPassword = await hashPassword(password);
  const user = await insertNewUser(email, hashedPassword);
  return user;
};

export const checkUserCredentials = async (email: string, password: string): Promise<{id: number, externalid: string, password_hash: string}> => {
    const user = await getUser(email);
        ensureResourceExists(user, "Invalid email or password")

        const isMatch = await comparePassword(password, user.password_hash);

      if (!isMatch) {
        const error = new Error("Invalid email or password");
      (error as any).status = status;
      throw error;
      }
      return user;
}

export const getUsersChallenges = async (userId: string): Promise<UsersChallenge[]> => {

  const challenges = getUsersChallengesRepo(userId);
  return challenges
  
}
