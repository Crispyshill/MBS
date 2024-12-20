import { NextFunction, Request, Response } from "express";
import {createNewUser, getAllUsers as getAllUsersFromService, getOneUser as getOneUserFromService, updateUser as updateUserFromService, deleteUser as deleteUserFromService} from "../services/userService";
import { returnResult } from "../utils/controllerUtils";
import { User } from "../models/userModel";


export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const users: User[] = await getAllUsersFromService();
    returnResult(res, 200, users);
  }
  catch (error) {
    next(error);
  }
}

export const getOneUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const userId = req.params.userId;
    const user: User = await getOneUserFromService(userId);
    returnResult(res, 200, user);
  }
  catch (error) {
    next(error);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const user: User = req.body;
    updateUserFromService(user);
    returnResult(res, 204, {});
  }
  catch (error) {
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const userId = req.params.userId;
    deleteUserFromService(userId);
    returnResult(res, 204, {});
  }
  catch (error) {
    next(error);
  }
}


export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const email = req.body.email;
    const password = req.body.password;
    createNewUser(email, password);
    returnResult(res, 301, {});
  }
  catch (error) {
    next(error);
  }
}