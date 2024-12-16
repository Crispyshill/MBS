import { Router } from "express";
import exampleController from "../controllers/challengeController";


const router = Router();

router.get("/example", exampleController.getExample);

export default router;
