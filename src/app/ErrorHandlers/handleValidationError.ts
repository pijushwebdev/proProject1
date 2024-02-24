// mongoose validation error handling

import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/errors";



const handleValidationError = (error: mongoose.Error.ValidationError): TGenericErrorResponse => {

    const errorSource: TErrorSource = Object.values(error.errors).map((err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: err?.path,
            message: err?.message
        }
    })

    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
        errorSource
    }
}

export default handleValidationError;