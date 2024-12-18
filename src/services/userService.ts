import { hashPassword } from "../utils/auth";
import { insertNewUser } from "../repositories/userRepository";
import { getUserPasswordHashFromEmail, getAllUsers as getAllUsersFromRepo, updateUser as updateUserFromRepo, deleteUser as deleteUserFromRepo, findUserById, findUserByEmail } from "../repositories/userRepository";
import { ensureResourceExists } from "../validation/authValidation";
import { comparePassword } from "../utils/auth";
import { User } from "../models/userModel";

export const createNewUser = async (email: string, password: string): Promise<{ externalid: string; email: string } | null> => {
  const hashedPassword = await hashPassword(password);
  const user = await insertNewUser(email, hashedPassword);
  return user;
};

export const checkUserCredentials = async (email: string, password: string): Promise<void> => {
      const passwordHash = (await getUserPasswordHashFromEmail(email)).password_hash;
        ensureResourceExists(passwordHash, "Invalid email or password")
        const isMatch = await comparePassword(password, passwordHash);

      if (!isMatch) {
        const error = new Error("Invalid email or password");
      (error as any).status = 403;
      throw error;
      }
}


export const getAllUsers = async (): Promise<User[]> => {
  try{
    const users: User[] = await getAllUsersFromRepo();
    return users;
  } catch (error) {
    throw error;
  }
}

export const getOneUser = async (userId: string): Promise<User> => {
  try{
    const user: User = await findUserById(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

export const getOneUserFromEmail = async (email: string): Promise<User> => {
  try{
    const user: User = await findUserByEmail(email);
    return user;
  } catch (error) {
    throw error;
  }
}


export const updateUser = async (user: User): Promise<void> => {
  try{
    updateUserFromRepo(user);
  } catch (error) {
    throw error;
  }
}

export const deleteUser = async (userId: string): Promise<void> => {
  try{
    deleteUserFromRepo(userId);
  } catch (error) {
    throw error;
  }
}

