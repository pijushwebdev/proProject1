import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.schema";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.schema";
import { TUser } from "./user.interface";
import { User } from "./user.schema";
import { generatedStudentId } from "./user.utils";
import AppError from "../../ErrorHandlers/AppError";




const createStudentIntoDB = async (password: string, payload: TStudent) => {  //payload ---> studentData

    const userData: Partial<TUser> = {};


    // if password not given, use default password
    userData.password = password || (config.default_password as string);
    userData.role = "student";

    const semesterInfo = await AcademicSemester.findById(payload.admissionSemester) as TAcademicSemester;

    //generate user id 
    userData.id = await generatedStudentId(semesterInfo)

    //start session
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(400, 'Failed to create user');
        }

        payload.id = newUser[0].id; // embed id
        payload.user = newUser[0]._id; // reference _id

        // we can handle it using instance, static method in schema and also like this: here, i use static
        // const existingStudent = await Student.isUserExists(payload.email);
        // if(existingStudent){
        //     throw new AppError(400, "User already exist");
        // }

        const newStudent = await Student.create([payload], {session});

        if(!newStudent.length){
            throw new AppError(400, 'Failed to create student')
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, `${error}`)
    }
}

export const userServices = {
    createStudentIntoDB
}