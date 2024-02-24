
// this error also handled by mongoose 'pre' hook ||  custom instance or static method: 


/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericErrorResponse } from "../interface/errors";




const handleDuplicateError = (error: any): TGenericErrorResponse => {

    const match = error.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    const errorSource: TErrorSource = [{
        path: '',
        message: `${extractedMessage} is already exists`
    }];
    
    const statusCode = 400;
    return {
        statusCode,
        message: `Duplicate value is detected`,
        errorSource
    }
}

export default handleDuplicateError;