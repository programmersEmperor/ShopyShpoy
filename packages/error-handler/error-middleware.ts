import { Request, Response } from "express";
import { AppError } from "./index";

export const errorMiddleware = (error: Error, request: Request, response: Response)=>{
    if(error instanceof AppError){
        console.log(`Error ${request.method} ${request.url} - ${error.message}`)

        response.status(error.statusCode)
        response.json({
            status: "error",
            message: error.message,
            ... (error.details && {details: error.details})
        })
        return response;
    }

    console.log('Unhandled error', error);
    response.status(500)
    response.json({
        error: 'Something went wrong, please try again',
    })
    return response;

}