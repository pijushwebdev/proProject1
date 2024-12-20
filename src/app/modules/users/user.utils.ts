import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.schema";


//student id generator
export const generatedStudentId = async (payload: TAcademicSemester) => {

    let currentId = (0).toString();

    const lastAdmittedStudentId = await findLastStudentId();

    const lastAdmittedStudentYear = lastAdmittedStudentId?.substring(0, 4);
    const lastAdmittedStudentCode = lastAdmittedStudentId?.substring(4, 6);

    if (lastAdmittedStudentId &&
        lastAdmittedStudentYear === payload.year &&
        lastAdmittedStudentCode === payload.code) {
        currentId = lastAdmittedStudentId.substring(6);
    }
 
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementedId = `${payload.year}${payload.code}${incrementedId}`// year+semesterCode+4digit code

    return incrementedId;
}

const findLastStudentId = async () => {

    const lastAdmittedStudent = await User.findOne({ role: 'student' },
        { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();

    return lastAdmittedStudent?.id ? lastAdmittedStudent.id : undefined;
}
// student id generator end


//generate faculty id
export const generateFacultyId = async () => {
    let currentId = (0).toString();

    const lastFacultyId = await findLastFacultyId();

    if (lastFacultyId) {
        currentId = lastFacultyId.substring(2);
    }
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementedId = `F-${incrementedId}`;

    return incrementedId
}

const findLastFacultyId = async () => {
    const lastFaculty = await User.findOne({ role: 'faculty' },
        { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();

    return lastFaculty?.id ? lastFaculty.id : undefined;
}
//generate faculty id end 

const findLastAdminId = async () => {
    const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();

    return lastAdmin?.id ? lastAdmin.id : undefined;
}

export const generateAdminId = async () => {
    let currentId = (0).toString();

    const lastAdminId = await findLastAdminId();
    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementedId = `A-${incrementedId}`;

    return incrementedId;
}
