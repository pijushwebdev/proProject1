import asyncTryCatch from "../../utils/asyncTryCatch";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterServices } from "./academicSemester.service";


const createSemester = asyncTryCatch(async (req, res) => {

    // const sName = req.body.semesterName;
    // switch(sName){
    //     case 'Spring':
    //         req.body.code = '01'
    //         break;
    //     case 'Summer':
    //         req.body.code = '02'
    //         break;
    //     case 'Fall': 
    //     req.body.code = '03'
    //     break;
    // }  // do it differently in service file

    const data = await academicSemesterServices.createSemesterIntoDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        message: "New semester has been created",
        success: true,
        data: data
    })
})

const getAllSemester = asyncTryCatch( async (req, res) => {
    const data = await academicSemesterServices.getAllSemesterFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Semester Data received successfully",
        data: data
    })
});

const getSingleSemester = asyncTryCatch( async ( req, res) => {
    const data = await academicSemesterServices.getSingleSemesterFromDB(req.params.semesterId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Single Semester data received",
        data: data
    })
});

const updateASemester = asyncTryCatch ( async (req, res) => {
    const id = req.params.semesterId;
    const data = req.body;
    const updatedData = await academicSemesterServices.updateASemesterFromDB(id, data);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Semester info successfully updated",
        data: updatedData
    })
})




export const academicSemesterControllers = {
    createSemester,
    getAllSemester,
    getSingleSemester,
    updateASemester
}