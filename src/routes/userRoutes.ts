import { Router} from "express";
import * as dotenv from "dotenv";
import { errorHandler } from "../middleware/errorHandlerMiddleware";
dotenv.config();

const router = Router();

// Get all challenges for a specific user
router.get(
  "/:userId/challenge" 
);

router.use(errorHandler); // Error handler middleware must be at the end

export default router;
