import { Router} from "express";
import * as dotenv from "dotenv";
import {registerUser, login} from "../controllers/authController";
import { validateLoginInput, validateRegisterInput } from "../middleware/validateInputMiddleware";
import {errorHandler} from "../middleware/errorHandlerMiddleware";
dotenv.config();

const router = Router();

// Register a new user
router.post(
  "/register", 
  validateRegisterInput, 
  registerUser
);

// Login a user
router.post(
  "/login", 
  validateLoginInput, 
  login
);

router.use(errorHandler); // Error handler middleware must be at the end

export default router;
