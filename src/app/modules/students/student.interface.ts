import { Model, Types } from "mongoose";

export type TName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}
export type TAddress = {
    permanentAddress: {
        city: string;
        road: string;
        zip_code: string;
    }
    presentAddress: {
        city: string;
        road: string;
        zip_code: string;
    }
}
export type TGuardian = {
    name: {
        firstName: string,
        lastName: string
    },
    relation: string;
    email: string;
    phone: string;
}

export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type TGender = 'male' | 'female' | 'others';

//main
export type TStudent = {
    id: string;
    user: Types.ObjectId;
    name: TName;
    phone: string;
    email: string;
    gender: TGender;
    age: number;
    dateOfBirth: string;
    avatar?: string;
    bloodGroup?: TBloodGroup;
    nationality: string;
    address: TAddress;
    guardian: TGuardian;
    class: string;
    roll?: number;
    section?: string;
    admissionSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    isDeleted: boolean;
}

//custom static method
 export interface StudentModel extends Model<TStudent> {
    isUserExists(email: string) : Promise<TStudent | null>;
    isStudentExists(id: string): Promise<TStudent> | null;
  }


// custom instance method
// export type StudentExistsMethod = {
//     isUserExists(email: string) : Promise<TStudent | null>; 
// }

// export type StudentModel =Model<TStudent, Record<string, never>, StudentExistsMethod>;

//custom instance method end


// update


