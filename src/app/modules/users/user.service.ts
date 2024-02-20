import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.schema";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.schema";
import { TUser } from "./user.interface";
import { User } from "./user.schema";
import { generatedStudentId } from "./user.utils";




const createStudentIntoDB = async (password: string, payload: TStudent) => {  //payload ---> studentData

    const userData: Partial<TUser> = {};

    // we can handle it using instance, static method in schema and also like this:
    // const existingUser = await Student.isUserExists(payload.email);
    //     if (existingUser) {
    //         throw new Error("User already exists");
    //     }

    // if password not given, use default password
    userData.password = password || (config.default_password as string);
    userData.role = "student";
    
    const semesterInfo = await AcademicSemester.findById(payload.admissionSemester) as TAcademicSemester;
    
    //generate user id 
    userData.id = await generatedStudentId(semesterInfo)

    const newUser = await User.create(userData);
    
    if(Object.keys(newUser).length){
        payload.id = newUser.id; // embed id
        payload.user = newUser._id; // reference _id


        const newStudent = await Student.create(payload);
        return newStudent;
    }
    
    
}

export const userServices = {
    createStudentIntoDB
}