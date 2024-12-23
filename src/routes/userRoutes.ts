import { Router} from "express";
import * as dotenv from "dotenv";
import { errorHandler } from "../middleware/errorHandlerMiddleware";
import usersChallengeRoutes from "./usersChallengeRoutes";
import { getAllUsers, getOneUser, createUser, updateUser, deleteUser } from "../controllers/userController";
dotenv.config();

const router = Router();

router.use("/:userId/challenge", (req, res, next) => {
    req.params.userId = req.params.userId || ""; 
    next();
  }, usersChallengeRoutes);

router.get("/", 
    getAllUsers
);

router.get("/:userId", 
    getOneUser
);

router.post("/", 
    createUser
);

router.put("/", 
    updateUser
);

router.delete("/:userId", 
    deleteUser
);

router.use(errorHandler); // Error handler middleware must be at the end

export default router;
