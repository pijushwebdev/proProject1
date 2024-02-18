import { NextFunction, Request, Response } from "express";


const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error){
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong (global error handler)",
            error: error
        })
    }else{
        next();
    }
}

export default globalErrorHandler;