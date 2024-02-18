import { semesterNameCodeMapped } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.schema"


const createSemesterIntoDB = async (payload: TAcademicSemester) => {  //payload means data

    if (semesterNameCodeMapped[payload.semesterName] !== payload.code) {
        throw new Error('Semester name or code not match');
    }

    const result = await AcademicSemester.create(payload);
    return result;
}


const getAllSemesterFromDB =async () => {
    const result = AcademicSemester.find();
    return result;
}

const getSingleSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
}

const updateASemesterFromDB = async ( id:string, payload: Partial<TAcademicSemester> ) => {

    if(payload.semesterName && payload.code && 
        semesterNameCodeMapped[payload.semesterName] !== payload.code ){
            throw new Error("Please give valid code and semester name");
        }
    
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, { new: true } );
     return result;
}

export const academicSemesterServices = {
    createSemesterIntoDB,
    getAllSemesterFromDB,
    getSingleSemesterFromDB,
    updateASemesterFromDB,
}
