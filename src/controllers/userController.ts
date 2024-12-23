import { NextFunction, Request, Response } from "express";
import {createNewUser, getAllUsers as getAllUsersFromService, getOneUser as getOneUserFromService, updateUser as updateUserFromService, deleteUser as deleteUserFromService} from "../services/userService";
import { createResponseObject, ResponseObject, returnResult } from "../utils/controllerUtils";
import { User } from "../models/userModel";


export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const users: User[] = await getAllUsersFromService();
    returnResult(res, {code: 200, body: users});
  }
  catch (error) {
    next(error);
  }
}

export const getOneUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const userId = req.params.userId;
    const user: User = await getOneUserFromService(userId);

    returnResult(res, {code: 200, body: user});
  }
  catch (error) {
    next(error);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    let responseObject: ResponseObject = createResponseObject(204, true, "Updated user");
    const user: User = req.body;
    const userGotUpdated = await updateUserFromService(user);
    if(!userGotUpdated){
      responseObject = createResponseObject(400, false, "User not found");
    }
    returnResult(res, responseObject);
  }
  catch (error) {
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    let responseObject: ResponseObject = createResponseObject(204, true, "User Deleted");
    const userId = req.params.userId;
    const userGotDeleted = await deleteUserFromService(userId);
    if(!userGotDeleted){
      responseObject = createResponseObject(400, false, "User not Found");
    }
    returnResult(res, responseObject);
  }
  catch (error) {
    next(error);
  }
}


export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    let responseObject: ResponseObject = createResponseObject(301, true, "User created");
    const email = req.body.email;
    const password = req.body.password;
    const userCreated = await createNewUser(email, password);
    if(!userCreated){
      responseObject = createResponseObject(400, false, "User not found")
    }
    returnResult(res, responseObject);
  }
  catch (error) {
    next(error);
  }
}