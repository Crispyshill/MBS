import { Request, Response, NextFunction} from "express";
import { getAllChallenges, getChallenge } from "../services/challengeService";
import { returnResult } from "../utils/controllerUtils";
import { ensureResourceExists } from "../validation/authValidation";

export const getChallenges = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const challenges = getAllChallenges();
    returnResult(res, 200, challenges);
  } catch (err) {
    next(err);
  }
}


export const getOneChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const challengeId: string = req.params.challengeId; // Get the userId from the URL parameter
    const challenge = getChallenge(challengeId);
    ensureResourceExists(challenge, "No resource with given id", 404);
    returnResult(res, 200, challenge);
  } catch (err){
    next(err);
  }
}
