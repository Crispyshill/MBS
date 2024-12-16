import { Router, Request, Response, NextFunction } from "express";
import db from "../utils/db";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

// Register a new user
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const hashedPassword = await hashPassword(password);

      const result = await db.query(
        "INSERT INTO public.users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
        [email, hashedPassword]
      );

      const user = result.rows[0];
      const token = generateToken(user.id);

      res.status(201).json({ token, user });
    } catch (err) {
      if ((err as any).code === "23505") {
        res.status(409).json({ error: "Email already exists" });
        return;
      }
      next(err); // Pass unhandled errors to the global error handler
    }
  }
);

// Login a user
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const result = await db.query(
        "SELECT id, externalId, password_hash FROM public.users WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const user = result.rows[0];
      const isMatch = await comparePassword(password, user.password_hash);

      if (!isMatch) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const token = generateToken(user.id);
      console.log(user)
      res.json({externalId: user.externalid, token });
    } catch (err) {
      next(err); // Pass unhandled errors to the global error handler
    }
  }
);

export default router;
