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

   return result.rows[0];
  } catch (error) {
    console.log("Error inserting new user:", error);
    throw throwDBErrors(error, "User"); // Rethrow the error for handling upstream
  }
};


export const getUserPasswordHashFromEmail = async (email: string): Promise<{password_hash: string}> => {
  try{
    const result = await db.query(
      "SELECT password_hash FROM users WHERE email = $1", 
      [email]
    );
    if(null == result.rowCount || result.rowCount < 1){
      throw throwDBErrors({"code": "00001"}, "User");
    }     
    return result.rows[0];
  } catch (error){
    console.log("Error getting password hash from email");
    throw error;
  }
}


export const getAllUsers = async (): Promise<User[]> => {
  try{
    const result = await db.query("SELECT externalid, email, created_at, firstname, lastname FROM users");
    if(null == result.rowCount || result.rowCount < 1){
      throw throwDBErrors({"code": "00002"}, "User");
    }   
    return result.rows;
  } catch (err){
    console.log("Error getting all users " + JSON.stringify(err));
    throw throwDBErrors(err, "User"); // Rethrow the error for handling upstream
  }
}



export const findUserByEmail = async (email: string): Promise<User> => {
  try{
  const result = await db.query(
    "SELECT externalid, email, created_at, firstname, lastname FROM users WHERE email = $1", 
    [email]
  );
  if(null == result.rowCount || result.rowCount < 1){
    throw throwDBErrors({"code": "00001"}, "User");
  }   
  return result.rows[0];
} catch (error) {
  console.log("Error getting user:", error);
  throw throwDBErrors(error, "User"); // Rethrow the error for handling upstream
}
}

export const findUserById = async (userId: string): Promise<User> => {
  try{
  const result = await db.query(
    "SELECT externalid, password_hash FROM users WHERE externalid = $1", 
    [userId]
  );
  if(null == result.rowCount || result.rowCount < 1){
    throw throwDBErrors({"code": "00001"}, "User");
  }   
  return result.rows[0];
} catch (error) {
  console.log("Error getting user:", error);
  throw throwDBErrors(error, "User"); // Rethrow the error for handling upstream
}
}


export const updateUser = async (user: User): Promise<boolean> => {
  try{
    const result = await db.query("UPDATE users SET externalid = $1, email = $2, created_at = $3, firstname = $4, lastname = $5 WHERE email = $6", [user.externalid, user.email, user.created_at, user.firstname, user.lastname, user.email] );
    return result.rowCount !== null && result.rowCount > 0;
  } catch(error) {
    console.log("Error updating user");
    throw throwDBErrors(error, "User");
  }
}

export const deleteUser = async (userId: string): Promise<boolean> => {
  try{
    const result = await db.query("DELETE FROM users WHERE externalid = $1", [userId]);
    return result.rowCount !== null && result.rowCount > 0;
  } catch (error) {
    console.log("Error deleting user");
    throw throwDBErrors(error, "User");
  }
}






