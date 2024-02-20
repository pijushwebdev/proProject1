import { TAcademicDepartment } from "./academicDepartment.interface"
import { AcademicDepartment } from "./academicDepartment.schema"



const createDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
}

const getAllDepartmentFromDB = async () => {
    const result = await AcademicDepartment.find();
    return result;
}

const getADepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartment.findById(id);
    return result;
}

export const departmentServices = {
    createDepartmentIntoDB,
    getAllDepartmentFromDB,
    getADepartmentFromDB,
}