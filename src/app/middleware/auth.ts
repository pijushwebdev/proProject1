import AppError from "../ErrorHandlers/AppError";
import config from "../config";
import { verifyToken } from "../modules/auth/auth.utils";
import { TUser_Role } from "../modules/users/user.interface";
import { User } from "../modules/users/user.schema";
import asyncTryCatch from "../utils/asyncTryCatch";
import { JwtPayload } from 'jsonwebtoken';

// Auth('admin')
const Auth = (...requiredRoles: TUser_Role[]) => {

    return asyncTryCatch(async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(401, 'Unauthorized access!');
        }
        // token validation check
        const decoded = verifyToken(token, config.jwt_secret_key as string);

        // console.log(decoded);
        const { role, userId, iat } = decoded;

        //prevent deleted or blocked user
        const userInfo = await User.isUserExists(userId);
        if (!userInfo) {
            throw new AppError(404, 'User not found');
        }

        const isDeleted = userInfo?.isDeleted;
        if (isDeleted) {
            throw new AppError(403, 'This user is deleted');
        }

        const status = userInfo?.status;
        if (status === 'blocked') {
            throw new AppError(403, 'Your account is blocked')
        }
        //prevent deleted or blocked user activity end

        if(userInfo.passwordChangeAt && 
            User.isJwtExpiredForChangePassword(userInfo.passwordChangeAt, iat as number)){
                
                throw new AppError(403, 'Forbidden access');
        }

        //check user role requirements
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(401, 'Unauthorized access!')
        }
        req.user = decoded as JwtPayload;
        next();

    });
}

export default Auth;