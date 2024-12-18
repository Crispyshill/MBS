import { Request, Response, NextFunction } from "express";
import {generateToken } from "../utils/auth";
import { checkUserCredentials, createNewUser, getOneUserFromEmail } from "../services/userService";
import { ensureResourceExists } from "../validation/authValidation";
import { returnResult } from "../utils/controllerUtils"

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { email, password } = req.body;
        const user = await createNewUser(email, password);

        ensureResourceExists(user, "Failed to create a new user.");

        const token = generateToken(user.externalid);
        returnResult(res, 201, {token, user});


    } catch (err) {
      next(err);
    }
  };


  export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        checkUserCredentials(email, password);
        const user = await getOneUserFromEmail(email);

        const token = generateToken(user.externalid);
        returnResult(res, 200, {externalId: user.externalid, token });

    } catch (err) {
      next(err);
    }
  }
