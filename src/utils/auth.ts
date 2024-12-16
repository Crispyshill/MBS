import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = 10;

// Hash a plain text password
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

// Compare a plain text password with a hashed password
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Generate a JWT token
export const generateToken = (userId: number): string => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
};

// Verify a JWT token
export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.verify(token, secret);
};
