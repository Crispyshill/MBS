import { Router} from "express";
import * as dotenv from "dotenv";
import { getChallenges, getOneChallenge, addOneChallenge, updateChallenge, deleteChallenge } from "../controllers/challengeController"
import { errorHandler } from "../middleware/errorHandlerMiddleware";
dotenv.config();

const router = Router();

// Getting all challenges
router.get(
  "/",
  getChallenges
);

// Get one challenge
router.get(
  "/:challengeId",
  getOneChallenge
);

// Create one challenge
router.post("/", 
  addOneChallenge
);

// Update one challenge
router.put("/",
  updateChallenge
);

// Delete one challenge
router.delete("/:challengeId",
  deleteChallenge
);

router.use(errorHandler); // Error handler middleware must be at the end

export default router;
