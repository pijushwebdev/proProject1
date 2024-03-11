import { Model, Types } from "mongoose";
import { TAddress, TBloodGroup, TGender, TName } from "../students/student.interface"

export type TFaculty = {
    id: string;
    user: Types.ObjectId;
    name: TName;
    designation: string;
    address: TAddress;
    email: string;
    phone: string;
    gender: TGender;
    age: number;
    dateOfBirth: string;
    avatar?: string;
    bloodGroup?: TBloodGroup;
    nationality: string;
    academicFaculty: Types.ObjectId;
    isDeleted: boolean;
}

export interface FacultyModel extends Model<TFaculty> {
    isFacultyExists(id: string): Promise<TFaculty | null>
}
// export type FacultyModel = Model<TFaculty, Record<string, unknown>, FacultyExistMethod>;