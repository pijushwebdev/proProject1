import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.schema";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.schema";
import { TUser } from "./user.interface";
import { User } from "./user.schema";
import { generateAdminId, generateFacultyId, generatedStudentId } from "./user.utils";
import AppError from "../../ErrorHandlers/AppError";
import { TFaculty } from "../faculties/faculty.interface";
import { Faculty } from "../faculties/faculty.schema";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.schema";




const createStudentIntoDB = async (password: string, payload: TStudent) => {  //payload ---> studentData

    const userData: Partial<TUser> = {};

    // if password not given, use default password
    userData.password = password || (config.student_password as string);
    userData.role = "student";
    userData.email = payload.email;

    const semesterInfo = await AcademicSemester.findById(payload.admissionSemester) as TAcademicSemester;
    if(!semesterInfo){
        throw new AppError(404, 'Admission semester not found');
    }
    //generate user id 
    userData.id = await generatedStudentId(semesterInfo);

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
        const existingStudent = await Student.isStudentExists(payload.id);
        if(existingStudent){
            throw new AppError(400, "Student already exist");
        }

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    const userData: Partial<TUser> = {};

    userData.password = password || config.faculty_password;
    userData.role = 'faculty';
    userData.id = await generateFacultyId();
    userData.email = payload.email;
    
    const session = await mongoose.startSession();
    try{
        session.startTransaction();

        const newUser = await User.create([userData], {session});
        if(!newUser){
            throw new AppError(400, 'Failed to create new user');
        }
        
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        // const existingFaculty = await Faculty.isFacultyExists()

        const newFaculty = await Faculty.create([payload], {session});
        if(!newFaculty){
            throw new AppError(400,'Failed to create new faculty');
        }
        session.commitTransaction();
        session.endSession();

        return newFaculty;

    }catch(error){
        session.abortTransaction();
        session.endSession();
        throw new AppError(400, `${error}`);
    }
}

const createAdminIntoDB = async (password: string ,payload: TAdmin) => {
    const userData: Partial<TUser> = {};

    userData.password = password || config.admin_password;
    userData.role = 'admin';
    userData.email = payload.email;
    userData.id = await generateAdminId();

    const session = await mongoose.startSession();
    try{
        session.startTransaction();

        const newUser = await User.create([userData], {session});
        if(!newUser){
            throw new AppError(400, 'Failed to create new user')
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        const newAdmin = await Admin.create([payload], {session});
        if(!newAdmin){
            throw new AppError(400, 'Failed to create admin');
        }

        session.commitTransaction();
        session.endSession();
        
        return newAdmin;

    }catch(error){
        session.abortTransaction();
        session.endSession();
        throw new AppError(400, 'Failed to create Admin');
    }
}

export const userServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
}