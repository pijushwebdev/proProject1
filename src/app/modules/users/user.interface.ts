import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export type TUser = {
    id: string;
    email: string;
    password: string;
    needsPasswordChange?: boolean;
    passwordChangeAt?: Date;
    role: 'student' | 'admin' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted?: boolean;
}

export interface UserModel extends Model<TUser>{
    isUserExists(id: string): Promise<TUser | null>;
    isPasswordMatched(password: string, hashPassword: string): Promise<boolean>;
    isJwtExpiredForChangePassword(passwordChangeTime: Date, tokenIssueTime: number): boolean;
}

// export type NewUser = {
//     password: string;
//     role: string;
//     id: string
// }

export type TUser_Role = keyof typeof USER_ROLE