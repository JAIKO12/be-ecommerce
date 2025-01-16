import { NextFunction, Request, Response } from "express";
import { HttpExpection } from "../exceptions/exceptions";

export const  errorMiddleware = (error:HttpExpection, req:Request, res:Response, next:NextFunction) =>{
    res.status(error.statusCode).json({
        message:error.message,
        errorCode:error.errorCode,
        errors:error.errors || null
    })
}