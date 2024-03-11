import AppError from "../ErrorHandlers/AppError";
import config from "../config";
import { TUser_Role } from "../modules/users/user.interface";
import asyncTryCatch from "../utils/asyncTryCatch";
import jwt, { JwtPayload } from 'jsonwebtoken';


const Auth = (...requiredRoles: TUser_Role[]) => {

    return asyncTryCatch(async (req, res, next) => {
        const token = req.headers.authorization;
        if(!token){
            throw new AppError(401, 'Unauthorized access!');
        }
        // token validation check
        jwt.verify(token, config.jwt_secret_key as string, (err, decoded) => {
            if(err){
                throw new AppError(403, 'Forbidden access!')
            }
            // console.log(decoded);
            const role = (decoded as JwtPayload).role;
            if(requiredRoles && !requiredRoles.includes(role)){
                throw new AppError(403, 'Forbidden access!')
            }
            req.user = decoded as JwtPayload;
            next();
        })
    });
}

export default Auth;