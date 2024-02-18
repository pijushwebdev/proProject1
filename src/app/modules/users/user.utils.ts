import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.schema";



export const generatedStudentId = async (payload: TAcademicSemester) => {

    let currentId = (0).toString();

    const lastAdmittedStudentId = await findLastStudentId();

    const lastAdmittedStudentYear = lastAdmittedStudentId?.substring(0,4);
    const lastAdmittedStudentCode = lastAdmittedStudentId?.substring(4,6);

    if( lastAdmittedStudentId && 
        lastAdmittedStudentYear === payload.year && 
        lastAdmittedStudentCode === payload.code){
            currentId = lastAdmittedStudentId.substring(6);
        }
        
    let incrementedId = (Number(currentId) + 1).toString().padStart(4,'0');

    incrementedId = `${payload.year}${payload.code}${incrementedId}`// year+yearCode+4digit code

    return incrementedId;
}

const findLastStudentId = async () => {

    const lastAdmittedStudent = await User.findOne({role: 'student'},
        {id: 1, _id: 0}).sort({ createdAt: -1}).lean();

    return lastAdmittedStudent?.id;
}
