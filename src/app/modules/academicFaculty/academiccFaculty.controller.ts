import asyncTryCatch from "../../utils/asyncTryCatch";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from "./academicFaculty.service";



const createFaculty = asyncTryCatch( async(req, res) => {
    
    const data = await facultyServices.createFacultyIntoDB(req.body);

    sendResponse(res, {
        statusCode: 201,
        message: "Faculty is created successfully",
        success: true,
        data: data
    })
});

const getAllFaculty = asyncTryCatch( async(req, res) => {
    const data = await facultyServices.getFacultyFromDB();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Faculty data received successfully",
        data: data
    })
})
const getSingleFaculty = asyncTryCatch( async(req, res) => {
    const data = await facultyServices.getSingleFacultyFromDB(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Faculty data received successfully",
        data: data
    })
})

const updateAFaculty = asyncTryCatch( async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await facultyServices.updateFacultyFromDB(id, data);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Faculty updated",
        data: updatedData
    })
})





export const facultyController = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    updateAFaculty
}