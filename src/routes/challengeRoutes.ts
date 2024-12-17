import { Router} from "express";
import * as dotenv from "dotenv";
import { getChallenges, getOneChallenge } from "../controllers/challengeController"
import { errorHandler } from "../middleware/errorHandlerMiddleware";
dotenv.config();

const router = Router();

// Getting all challenges
router.get(
  "/",
  getChallenges
);


router.get(
  "/:challengeId",
  getOneChallenge
);

router.use(errorHandler); // Error handler middleware must be at the end

export default router;
