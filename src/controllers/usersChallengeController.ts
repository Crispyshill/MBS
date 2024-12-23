import { NextFunction, Request, Response } from "express";
import { UsersChallenge } from "../models/usersChallengeModel";
import { updateUsersChallenge as updateUsersChallengeFromService, getAllUsersChallenges as getAllUsersChallengesFromService, getOneUsersChallenge as getOneUsersChallengeFromService, createUsersChallenge as createUsersChallengeFromService, deleteUsersChallenge as deleteUsersChallengeFromService } from "../services/usersChallengeService";
import { createResponseObject, ResponseObject, returnResult } from "../utils/controllerUtils";

export const getAllUsersChallenges = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId; // Get the userId from the URL parameter
      const usersChallenges: UsersChallenge[] = await getAllUsersChallengesFromService(userId);
      returnResult(res, {code: 200, body: usersChallenges});
    } catch (err) {
      console.error("Error fetching user's challenges:", err);
      next(err); // Pass the error to the global error handler
    }
  }

  export const getOneUsersChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      const usersChallengeId = req.params.usersChallengeId;
      const usersChallenge: UsersChallenge = await getOneUsersChallengeFromService(usersChallengeId);
      returnResult(res, {code: 200, body: usersChallenge});
    } catch(error) {
      next(error)
    }
  }

  export const createUsersChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      let responseObject: ResponseObject = createResponseObject(301, true, "Created usersChallenge");
      const usersChallenge: UsersChallenge = req.body;
      const createdUser = await createUsersChallengeFromService(usersChallenge);
      if(!createdUser){
        responseObject = createResponseObject(400, false, "Failed to create usersChallenge")
      }
      returnResult(res, responseObject);
    } catch(error) {
      next(error)
    }
  }

  export const deleteUsersChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      let responseObject: ResponseObject = createResponseObject(204, true, "Deleted usersChallenge");
      const usersChallengeId: string = req.params.usersChallengeId;
      const userDeleted = await deleteUsersChallengeFromService(usersChallengeId);
      if(!userDeleted){
        responseObject = createResponseObject(400, false, "UsersChallenge not deleted")
      }
      returnResult(res, responseObject);
    } catch(error) {
      console.error("");
      next(error)
    }
  }

  export const updateUsersChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      let responseObject: ResponseObject = createResponseObject(204, true, "Updated usersChallenge");
      const usersChallenge: UsersChallenge = req.body;
      const updatedUsersChallenge = await updateUsersChallengeFromService(usersChallenge);
      if(!updatedUsersChallenge){
        responseObject = createResponseObject(400, false, "Could not find usersChallenge");
      }
      returnResult(res, responseObject)
    } catch(err){
      next(err)
    }
  }