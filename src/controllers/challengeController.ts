import { Request, Response, NextFunction} from "express";
import { getChallenges as getChallengesFromService, getOneChallenge as getOneChallengeFromService, addOneChallenge as addOneChallengeFromService, updateChallenge as updateChallengeFromService, deleteChallenge as deleteChallengeFromService } from "../services/challengeService";
import { returnResult } from "../utils/controllerUtils";
import { ensureResourceExists } from "../validation/authValidation";
import { Challenge } from "../models/challengeModel";

export const getChallenges = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const challenges = getChallengesFromService();
    returnResult(res, 200, challenges);
  } catch (err) {
    next(err);
  }
}


export const getOneChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const challengeId: string = req.params.challengeId; // Get the userId from the URL parameter
    const challenge = getOneChallengeFromService(challengeId);
    ensureResourceExists(challenge, "No resource with given id", 404);
    returnResult(res, 200, challenge);
  } catch (err){
    next(err);
  }
}


export const addOneChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const challenge: Challenge = req.body
    addOneChallengeFromService(challenge);
    returnResult(res, 301, {})
  } catch (err) {
    next(err)
  }
}

export const updateChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const challenge: Challenge = req.body
    updateChallengeFromService(challenge);
    returnResult(res, 204, {});
  } catch (err){
    next(err)
  }
}

export const deleteChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const challengeId: string = req.params.challengeId;
    deleteChallengeFromService(challengeId);
    returnResult(res, 204, {});
  } catch(err) {
    next(err)
  }
}
