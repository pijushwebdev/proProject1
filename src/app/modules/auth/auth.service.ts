import AppError from "../../ErrorHandlers/AppError";
import config from "../../config";
import { User } from "../users/user.schema"
import { TJwtPayload, TLoginUser } from "./auth.interface";
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
    // const userInfo = await User.findOne({id: payload?.id});
    const userInfo = await User.isUserExists(payload.id);
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

    const password = payload?.password;
    // const matchPassword = await bcrypt.compare(password, userInfo?.password);
    const matchPassword = await User.isPasswordMatched(password, userInfo?.password);
    if (!matchPassword) {
        throw new AppError(403, 'Password is incorrect');
    }

    //create jwt token and send to client
    const jwtPayload: TJwtPayload = {
        userId: userInfo?.id,
        role: userInfo?.role,
        email: userInfo?.email
    }
    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret_key as string,
        config.jwt_secret_expires_in as string
    );
    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_key as string,
        config.jwt_refresh_expires_in as string
    );


    return {
        accessToken,
        refreshToken,
        needsPasswordChange: userInfo?.needsPasswordChange,
    };
}

const changePassword = async (user: JwtPayload, payload: { oldPassword: string; newPassword: string }) => {
    // find user From User database through login user id
    const userInfo = await User.isUserExists(user?.userId);
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

    const password = payload?.oldPassword;
    // const matchPassword = await bcrypt.compare(password, userInfo?.password);
    const matchPassword = await User.isPasswordMatched(password, userInfo?.password);
    if (!matchPassword) {
        throw new AppError(403, 'Password is incorrect');
    }

    //hashed new password
    const hashedNewPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_round))

    const result = await User.findOneAndUpdate(
        { id: user.userId, role: user.role },
        {
            password: hashedNewPassword,
            needsPasswordChange: false,
            passwordChangeAt: new Date()
        },
    )
    return result?.email;
}

const refreshToken = async (refreshToken: string) => {
    // checking if the given token is valid
    const decoded = verifyToken(refreshToken, config.jwt_refresh_key as string);

    const { userId, iat } = decoded;

    ///prevent deleted or blocked user
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

    const jwtPayload: TJwtPayload = {
        userId: userInfo?.id,
        role: userInfo?.role,
        email: userInfo?.email
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret_key as string,
        config.jwt_secret_expires_in as string,
    );

    return {
        accessToken,
    };
}

export const authServices = {
    loginUser,
    changePassword,
    refreshToken,
}