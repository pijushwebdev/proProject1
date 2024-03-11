import asyncTryCatch from "../../utils/asyncTryCatch";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from "./faculty.service";


const getAllFaculty = asyncTryCatch( async (req, res) => {
    const query = req.query;
    const data = await facultyServices.getAllFacultyFromDB(query);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'All faculty data is arrived',
        data: data
    })
})

const getSingleFaculty = asyncTryCatch( async (req, res) => {
    const id = req.params.facultyId;
    const data = await facultyServices.getSingleFacultyFromDB(id);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty data is received',
        data: data
    })
})

const updateAFaculty = asyncTryCatch( async ( req, res) => {
    const id = req.params.facultyId;
    const facultyData = req.body.faculty;
    const updatedData = await facultyServices.updateAFacultyFromDB(id, facultyData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Faculty is updated',
        data: updatedData
    })
})

const deleteSingleFaculty = asyncTryCatch( async (req, res) => {
    const facultyId = req.params.facultyId;
    
    
    const deletedFaculty = await facultyServices.deleteSingleFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Successfully delete the faculty',
        data: deletedFaculty
    })
})

export const facultyControllers = {
    getAllFaculty,
    getSingleFaculty,
    updateAFaculty,
    deleteSingleFaculty
}