import { Model, Types } from "mongoose";
import { TAddress, TBloodGroup, TGender, TName } from "../students/student.interface";


export type TAdmin = {
    id: string;
    user: Types.ObjectId;
    name: TName;
    designation: string;
    email: string;
    phone: string;
    avatar?: string;
    bloodGroup: TBloodGroup;
    gender: TGender;
    dateOfBirth: string;
    age: number;
    address: TAddress;
    nationality: string;
    isDeleted: boolean;
}

export interface AdminModel extends Model<TAdmin>{
    isAdminExists(id: string) : Promise<TAdmin | null>
}