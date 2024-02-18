
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import asyncTryCatch from "../../utils/asyncTryCatch";
// import UserZodSchema from "./user.validation";

const createStudent = asyncTryCatch( async (req, res) => {

    const { password, students: studentData } = req.body;

    const result = await userServices.createStudentIntoDB(password, studentData); 


    // this will force to maintain the format
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "New Student is created",
        data: result
    })

})

export const usersController = {
    createStudent
}