import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.schema";


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {

    const result = await AcademicFaculty.create(payload)
    return result;
}

const getAcademicFacultyFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
}

const updateAcademicFacultyFromDB = async (id: string, payload: Partial<TAcademicFaculty>) => {
    const result = await AcademicFaculty.findOneAndUpdate({_id: id}, payload, {new: true});
    return result;
}





export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyFromDB,
}