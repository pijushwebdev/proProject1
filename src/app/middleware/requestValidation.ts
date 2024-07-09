import { AnyZodObject } from "zod";
import asyncTryCatch from "../utils/asyncTryCatch";

const requestValidation = (schema: AnyZodObject) => {
    return asyncTryCatch( async (req, res, next) => {

        await schema.parseAsync(
            { 
                body: req.body,
                cookies: req.cookies,
            }
        )
        next();
    })
}

export default requestValidation;