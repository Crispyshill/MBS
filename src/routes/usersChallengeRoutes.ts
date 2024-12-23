import { Router} from "express";
import * as dotenv from "dotenv";
import { errorHandler } from "../middleware/errorHandlerMiddleware";
import {getAllUsersChallenges, getOneUsersChallenge, createUsersChallenge, updateUsersChallenge, deleteUsersChallenge} from "../controllers/usersChallengeController";
dotenv.config();

const router = Router({mergeParams: true});

// Get all challenges for a specific user
router.get(
  "/",
  getAllUsersChallenges
);

router.get(
  "/:usersChallengeId",
  getOneUsersChallenge
)

router.post(
  "/",
  createUsersChallenge
)

router.put(
  "/",
  updateUsersChallenge
)

router.delete(
  "/:usersChallengeId",
  deleteUsersChallenge
)

router.use(errorHandler); // Error handler middleware must be at the end

export default router;
