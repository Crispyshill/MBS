import { Request, Response, NextFunction} from "express";
import { getChallenges as getChallengesFromService, getOneChallenge as getOneChallengeFromService, addOneChallenge as addOneChallengeFromService, updateChallenge as updateChallengeFromService, deleteChallenge as deleteChallengeFromService } from "../services/challengeService";
import { createResponseObject, ResponseObject, returnResult } from "../utils/controllerUtils";
import { ensureResourceExists } from "../validation/authValidation";
import { Challenge } from "../models/challengeModel";

export const getChallenges = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const challenges = getChallengesFromService();
    returnResult(res, {code: 200, body: challenges});
  } catch (err) {
    next(err);
  }
}


export const getOneChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const challengeId: string = req.params.challengeId; // Get the userId from the URL parameter
    const challenge = getOneChallengeFromService(challengeId);
    ensureResourceExists(challenge, "No resource with given id", 404);
    returnResult(res, {code: 200, body: challenge});
  } catch (err){
    next(err);
  }
}


export const addOneChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    let responseObject: ResponseObject = createResponseObject(301, true, "Challenge created.")
    const challenge: Challenge = req.body
    const challengeAdded: Boolean = await addOneChallengeFromService(challenge);
    if(!challengeAdded){
      responseObject = createResponseObject(400, false, "Could not add challenge");
    }
    returnResult(res, responseObject);
  } catch (err) {
    next(err)
  }
}

export const updateChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    let responseObject: ResponseObject = createResponseObject(204, true, "Challenge updated.")
    const challenge: Challenge = req.body
    const challengeUpdated: Boolean = await updateChallengeFromService(challenge);
    if(!challengeUpdated){
      responseObject = createResponseObject(400, false, "Challenge not found");
    }
    returnResult(res, responseObject);
  } catch (err){
    next(err)
  }
}

export const deleteChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    let responseObject: ResponseObject = createResponseObject(204, true, "Deleted Challenge");
    const challengeId: string = req.params.challengeId;
    const challengeDeleted = await deleteChallengeFromService(challengeId);
    if(!challengeDeleted){
      responseObject = createResponseObject(400, false, "Challeenge not found")
    }
    returnResult(res, responseObject);
  } catch(err) {
    next(err)
  }
}
