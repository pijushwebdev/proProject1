import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/errors";
import config from "../config";
import handleZodError from "./handleZodError";
import AppError from "./AppError";
import handleValidationError from "./handleValidationError";
import handleCastError from "./handleCastError";
import handleDuplicateError from "./handleDuplicateError";





const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error) {
        let statusCode = error.statusCode || 500;
        let message = error.message || "Something went wrong";

        let errorSource: TErrorSource = [
            {
                path: '',
                message: ''
            }
        ];


        // will be good to maintain condition serial
        if (error instanceof ZodError) {
            const simplifiedError = handleZodError(error);

            statusCode = simplifiedError?.statusCode;
            message = simplifiedError?.message;
            errorSource = simplifiedError?.errorSource;

        } else if (error?.name === 'ValidationError') {
            const simplifiedError = handleValidationError(error);

            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorSource = simplifiedError.errorSource;

        } else if (error.name === 'CastError') {
            const simplifiedError = handleCastError(error);

            statusCode = simplifiedError?.statusCode;
            message = simplifiedError?.message;
            errorSource = simplifiedError?.errorSource;

        }else if(error?.code === 11000) {

            const simplifiedError = handleDuplicateError(error);

            statusCode = simplifiedError?.statusCode;
            message = simplifiedError?.message;
            errorSource = simplifiedError?.errorSource

            
        } else if (error instanceof AppError) {
            statusCode = error.statusCode;
            message = error.message;
            errorSource = [
                {
                    path: '',
                    message: error?.message
                }
            ];
        } else if (error instanceof Error) {
            message = error.message;
            errorSource = [
                {
                    path: '',
                    message: error?.message
                }
            ]
        }




        //send the error
        res.status(statusCode).json({
            success: false,
            message,
            errorSource,
            error,
            stack: config.NODE_ENV ? error?.stack : null
        })
    } else {
        next();
    }
}

export default globalErrorHandler;