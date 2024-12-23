import { Response } from "express";

export interface ResponseObject  {
        code: number,
        body: any
}

export const returnResult = function (response: Response, responseObject: ResponseObject): void {
    response.status(responseObject.code).json(responseObject.body);
};



export const createResponseObject = function(code: number, success: boolean, message: string): ResponseObject {
    return {"code": code, body: {"success": success, "message": message}};
}

