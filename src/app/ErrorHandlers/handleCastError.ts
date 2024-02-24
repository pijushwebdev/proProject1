// Cast error provided by mongoose

import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/errors";

const handleCastError = (error: mongoose.Error.CastError): TGenericErrorResponse => {
    const statusCode = 400;

    const errorSource: TErrorSource = [{
        path: error?.path,
        message: error?.message
    }]

    return {
        statusCode,
        message: 'Invalid ID',
        errorSource
    }
}

export default handleCastError;