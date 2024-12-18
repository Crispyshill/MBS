import { User } from "../models/userModel";
import db from "../utils/db";
import { throwDBErrors } from "../utils/repositoryUtils";

export const insertNewUser = async (
  email: string,
  hashedPassword: string
): Promise<{ externalid: string; email: string } | null> => {
  try {
    const result = await db.query(
      "INSERT INTO public.users (email, password_hash) VALUES ($1, $2) RETURNING externalid, email",
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
    throw throwDBErrors(error); // Rethrow the error for handling upstream
  }
};


export const getUserPasswordHashFromEmail = async (email: string): Promise<{password_hash: string}> => {
  try{
    const result = await db.query(
      "SELECT password_hash FROM users WHERE email = $1", 
      [email]
    );
    if(result.rowCount && result.rowCount > 0) {
      return result.rows[0]
    } else {
      const error = new Error("No such user");
      throw error; 
    }
  } catch (error){
    console.error("Error getting password hash from email");
    throw error;
  }
}


export const getAllUsers = async (): Promise<User[]> => {
  try{
    const result = await db.query("SELECT externalid, email, created_at, firstname, lastname FROM users");
    if(result.rowCount && result.rowCount > 0) {
      return result.rows
    } else {
      const error = new Error("No rows returned");
      throw error; 
    }
  } catch (err){
    console.error("Error getting all users");
    throw throwDBErrors(err); // Rethrow the error for handling upstream
  }
}



export const findUserByEmail = async (email: string): Promise<User> => {
  try{
  const result = await db.query(
    "SELECT externalid, email, created_at, firstname, lastname FROM users WHERE email = $1", 
    [email]
  );

  if(result.rowCount && result.rowCount > 0) {
    return result.rows[0]
  } else {
    const error = new Error("No such user");
    throw error; 
  }
} catch (error) {
  console.error("Error getting user:", error);
  throw throwDBErrors(error); // Rethrow the error for handling upstream
}
}

export const findUserById = async (userId: string): Promise<User> => {
  try{
  const result = await db.query(
    "SELECT externalid, password_hash FROM users WHERE externalid = $1", 
    [userId]
  );

  if(result.rowCount && result.rowCount > 0) {
    return result.rows[0]
  } else {
    const error = new Error("No such user");
    throw error; 
  }
} catch (error) {
  console.error("Error getting user:", error);
  throw throwDBErrors(error); // Rethrow the error for handling upstream
}
}


export const updateUser = async (user: User): Promise<void> => {
  try{
    const result = await db.query("UPDATE users SET externalid = $1, email = $2, created_at = $3, firstname = $4, lastname: $5 WHERE email = $6", [user.externalid, user.email, user.created_at, user.firstname, user.lastname, user.email] );
    if(result.rowCount && result.rowCount > 0) {
      return result.rows[0]
    } else {
      const error = new Error("No such user");
      throw error; 
    }
  } catch(error) {
    console.error("Error updating user");
    throw throwDBErrors(error);
  }
}

export const deleteUser = async (userId: string): Promise<void> => {
  try{
    const result = await db.query("DELETE FROM users WHERE externalid = $1", [userId]);
    if(result.rowCount && result.rowCount > 0) {
      return result.rows[0]
    } else {
      const error = new Error("No such user");
      throw error; 
    }
  } catch (error) {
    console.error("Error deleting user");
    throw throwDBErrors(error);
  }
}






