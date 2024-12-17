import { Response } from "express";

export const returnResult = function (response: Response, statusNumber: number, json: any): void {
    response.status(statusNumber).json(json);
};