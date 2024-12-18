import { NextFunction, Request, Response } from "express";
import { UsersChallenge } from "../models/usersChallengeModel";
import { updateUsersChallenge as updateUsersChallengeFromService, getAllUsersChallenges as getAllUsersChallengesFromService, getOneUsersChallenge as getOneUsersChallengeFromService, createUsersChallenge as createUsersChallengeFromService, deleteUsersChallenge as deleteUsersChallengeFromService } from "../services/usersChallengeService";
import { returnResult } from "../utils/controllerUtils";

export const getAllUsersChallenges = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId; // Get the userId from the URL parameter
      const usersChallenges: UsersChallenge[] = await getAllUsersChallengesFromService(userId);
      returnResult(res, 200, usersChallenges);
    } catch (err) {
      console.error("Error fetching user's challenges:", err);
      next(err); // Pass the error to the global error handler
    }
  }

  export const getOneUsersChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      const usersChallengeId = req.params.usersChallengeId;
      const usersChallenge: UsersChallenge = await getOneUsersChallengeFromService(usersChallengeId);
      returnResult(res, 200, usersChallenge);
    } catch(error) {
      console.error("");
      next(error)
    }
  }

  export const createUsersChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      const usersChallenge: UsersChallenge = req.body;
      await createUsersChallengeFromService(usersChallenge);
      returnResult(res, 301, {});
    } catch(error) {
      console.error("");
      next(error)
    }
  }

  export const deleteUsersChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      const usersChallengeId: string = req.params.usersChallengeId;
      await deleteUsersChallengeFromService(usersChallengeId);
    } catch(error) {
      console.error("");
      next(error)
    }
  }

  export const updateUsersChallenge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      const usersChallenge: UsersChallenge = req.body;
      await updateUsersChallengeFromService(usersChallenge);
      returnResult(res, 200, {message: "Success"})
    } catch(err){
      next(err)
    }
  }