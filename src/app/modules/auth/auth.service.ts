import AppError from "../../ErrorHandlers/AppError";
import config from "../../config";
import { User } from "../users/user.schema"
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcrypt";

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
    const jwtPayload = {
        userId: userInfo?.id,
        role: userInfo?.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_secret_key as string, { expiresIn: '30d' });


    return {
        accessToken,
        needsPasswordChange: userInfo.needsPasswordChange,
    };
}

const changePassword = async (user: JwtPayload, payload: { oldPassword: string; newPassword: string }) => {

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
    return result?.id;
}

export const authServices = {
    loginUser,
    changePassword,
}