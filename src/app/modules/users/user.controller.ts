
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import asyncTryCatch from "../../utils/asyncTryCatch";
// import UserZodSchema from "./user.validation";

const createStudent = asyncTryCatch( async (req, res) => {

    const { password, student: studentData } = req.body;

    const data = await userServices.createStudentIntoDB(password, studentData); 

    // this will force to maintain the format
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "New Student is created",
        data: data
    })

})

const createFaculty = asyncTryCatch( async (req, res) => {
    const {password, facultyData} = req.body;
    const data = await userServices.createFacultyIntoDB(password, facultyData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Faculty is created',
        data: data
    })
})

export const usersController = {
    createStudent,
    createFaculty,
}