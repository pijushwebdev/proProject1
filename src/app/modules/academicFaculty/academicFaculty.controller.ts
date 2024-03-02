import asyncTryCatch from "../../utils/asyncTryCatch";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";



const createAcademicFaculty = asyncTryCatch( async(req, res) => {
    
    const data = await academicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res, {
        statusCode: 201,
        message: "Faculty is created successfully",
        success: true,
        data: data
    })
});

const getAllAcademicFaculty = asyncTryCatch( async(req, res) => {
    const data = await academicFacultyServices.getAcademicFacultyFromDB();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Faculty data received successfully",
        data: data
    })
})
const getSingleAcademicFaculty = asyncTryCatch( async(req, res) => {
    const data = await academicFacultyServices.getSingleAcademicFacultyFromDB(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Faculty data received successfully",
        data: data
    })
})

const updateAcademicFaculty = asyncTryCatch( async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await academicFacultyServices.updateAcademicFacultyFromDB(id, data);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Faculty updated",
        data: updatedData
    })
})





export const academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}